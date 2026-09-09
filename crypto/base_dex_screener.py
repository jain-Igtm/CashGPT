#!/usr/bin/env python3
import json
import urllib.request
from datetime import datetime, timezone

WETH_BASE = "0x4200000000000000000000000000000000000006"
USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
PAPER_NOTIONAL_USD = 100.0
MIN_LIQUIDITY_USD = 250_000.0
MIN_VOLUME_24H_USD = 100_000.0
# Screening assumptions only. Actual pool fee, CEX fee, gas and slippage vary.
ASSUMED_CEX_TAKER_BPS = 60.0
ASSUMED_DEX_SWAP_BPS = 30.0
ASSUMED_SLIPPAGE_BPS = 10.0
ASSUMED_GAS_USD = 0.05
SAFETY_MARGIN_BPS = 20.0


def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "CashGPT-readonly-base-screener/1.0"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.load(r)


def coinbase_eth():
    d = get_json("https://api.exchange.coinbase.com/products/ETH-USD/ticker")
    return {"bid": float(d["bid"]), "ask": float(d["ask"]), "last": float(d["price"])}


def base_weth_usdc_pools():
    rows = get_json(f"https://api.dexscreener.com/token-pairs/v1/base/{WETH_BASE}")
    pools = []
    for p in rows:
        base = (p.get("baseToken") or {}).get("address", "").lower()
        quote = (p.get("quoteToken") or {}).get("address", "").lower()
        if base != WETH_BASE.lower() or quote != USDC_BASE.lower():
            continue
        liq = float((p.get("liquidity") or {}).get("usd") or 0)
        vol = float((p.get("volume") or {}).get("h24") or 0)
        price = float(p.get("priceUsd") or 0)
        if not price or liq < MIN_LIQUIDITY_USD or vol < MIN_VOLUME_24H_USD:
            continue
        pools.append({
            "dex": p.get("dexId"),
            "pair_address": p.get("pairAddress"),
            "price_usd": price,
            "liquidity_usd": liq,
            "volume_24h_usd": vol,
            "url": p.get("url"),
        })
    return sorted(pools, key=lambda x: x["liquidity_usd"], reverse=True)


def route(pool, cex):
    dex_px = pool["price_usd"]
    gas_bps = ASSUMED_GAS_USD / PAPER_NOTIONAL_USD * 10000.0
    common_cost = ASSUMED_CEX_TAKER_BPS + ASSUMED_DEX_SWAP_BPS + ASSUMED_SLIPPAGE_BPS + gas_bps

    # Buy DEX at indicative pool price, sell CEX at bid.
    raw_dex_to_cex = (cex["bid"] / dex_px - 1.0) * 10000.0
    net_dex_to_cex = raw_dex_to_cex - common_cost

    # Buy CEX at ask, sell DEX at indicative pool price.
    raw_cex_to_dex = (dex_px / cex["ask"] - 1.0) * 10000.0
    net_cex_to_dex = raw_cex_to_dex - common_cost

    candidates = [
        ("buy_base_dex_sell_coinbase", raw_dex_to_cex, net_dex_to_cex),
        ("buy_coinbase_sell_base_dex", raw_cex_to_dex, net_cex_to_dex),
    ]
    direction, raw_bps, net_bps = max(candidates, key=lambda x: x[2])
    return {
        **pool,
        "coinbase_bid": cex["bid"],
        "coinbase_ask": cex["ask"],
        "direction": direction,
        "raw_edge_bps": round(raw_bps, 2),
        "assumed_cost_bps": round(common_cost, 2),
        "modeled_net_edge_bps": round(net_bps, 2),
        "paper_notional_usd": PAPER_NOTIONAL_USD,
        "paper_modeled_pnl_usd": round(PAPER_NOTIONAL_USD * net_bps / 10000.0, 4),
        "paper_signal": net_bps >= SAFETY_MARGIN_BPS,
    }


def main():
    out = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "paper_only": True,
        "chain": "base",
        "asset": "WETH/USDC vs ETH-USD",
        "filters": {
            "min_liquidity_usd": MIN_LIQUIDITY_USD,
            "min_volume_24h_usd": MIN_VOLUME_24H_USD,
            "safety_margin_bps": SAFETY_MARGIN_BPS,
        },
        "assumptions": {
            "cex_taker_bps": ASSUMED_CEX_TAKER_BPS,
            "dex_swap_bps": ASSUMED_DEX_SWAP_BPS,
            "slippage_bps_total": ASSUMED_SLIPPAGE_BPS,
            "gas_usd": ASSUMED_GAS_USD,
        },
        "errors": {},
        "coinbase": None,
        "pools": [],
        "best_route": None,
    }
    try:
        out["coinbase"] = coinbase_eth()
    except Exception as e:
        out["errors"]["coinbase"] = f"{type(e).__name__}: {e}"
    try:
        pools = base_weth_usdc_pools()
        if out["coinbase"]:
            out["pools"] = sorted((route(p, out["coinbase"]) for p in pools), key=lambda x: x["modeled_net_edge_bps"], reverse=True)
            out["best_route"] = out["pools"][0] if out["pools"] else None
        else:
            out["pools"] = pools
    except Exception as e:
        out["errors"]["dexscreener"] = f"{type(e).__name__}: {e}"
    print(json.dumps(out, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
