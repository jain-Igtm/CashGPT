#!/usr/bin/env python3
import json, time, urllib.request
from datetime import datetime, timezone

PAIRS = ["BTC-USD", "ETH-USD"]
# Conservative round-trip cost assumptions, deliberately configurable.
TAKER_FEE_BPS = {"coinbase": 60.0, "kraken": 40.0}
SLIPPAGE_BPS_PER_LEG = 5.0


def get_json(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {"User-Agent": "CashGPT-readonly-scanner/1.0"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.load(r)


def coinbase(pair):
    d = get_json(f"https://api.exchange.coinbase.com/products/{pair}/ticker")
    return {"bid": float(d["bid"]), "ask": float(d["ask"]), "last": float(d["price"])}


def kraken(pair):
    key = "XBTUSD" if pair == "BTC-USD" else "ETHUSD"
    d = get_json(f"https://api.kraken.com/0/public/Ticker?pair={key}")
    if d.get("error"):
        raise RuntimeError(d["error"])
    v = next(iter(d["result"].values()))
    return {"bid": float(v["b"][0]), "ask": float(v["a"][0]), "last": float(v["c"][0])}


def bps(x):
    return round(x * 10000.0, 2)


def assess(pair, venues):
    out = []
    for buy_name, buy in venues.items():
        for sell_name, sell in venues.items():
            if buy_name == sell_name:
                continue
            raw = sell["bid"] / buy["ask"] - 1.0
            costs_bps = TAKER_FEE_BPS[buy_name] + TAKER_FEE_BPS[sell_name] + 2 * SLIPPAGE_BPS_PER_LEG
            net_bps = bps(raw) - costs_bps
            out.append({
                "buy": buy_name,
                "sell": sell_name,
                "buy_ask": buy["ask"],
                "sell_bid": sell["bid"],
                "raw_edge_bps": bps(raw),
                "assumed_cost_bps": costs_bps,
                "modeled_net_edge_bps": round(net_bps, 2),
                "paper_signal": net_bps > 0,
            })
    return sorted(out, key=lambda x: x["modeled_net_edge_bps"], reverse=True)


def main():
    snapshot = {"timestamp": datetime.now(timezone.utc).isoformat(), "pairs": {}}
    for pair in PAIRS:
        venues = {}
        errors = {}
        for name, fn in (("coinbase", coinbase), ("kraken", kraken)):
            try:
                venues[name] = fn(pair)
            except Exception as e:
                errors[name] = str(e)
        snapshot["pairs"][pair] = {"venues": venues, "errors": errors, "routes": assess(pair, venues) if len(venues) > 1 else []}
    print(json.dumps(snapshot, indent=2, sort_keys=True))

if __name__ == "__main__":
    main()
