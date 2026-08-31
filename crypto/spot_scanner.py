#!/usr/bin/env python3
import json, urllib.request
from datetime import datetime, timezone

PAIRS = ["BTC-USD", "ETH-USD"]
# Conservative illustrative taker-cost assumptions for paper screening only.
# Real fees vary by account tier and venue; no trades are executed here.
TAKER_FEE_BPS = {
    "coinbase": 60.0,
    "kraken": 40.0,
    "gemini": 40.0,
    "bitstamp": 40.0,
}
SLIPPAGE_BPS_PER_LEG = 5.0
PAPER_NOTIONAL_USD = 100.0


def get_json(url, headers=None):
    req = urllib.request.Request(
        url,
        headers=headers or {"User-Agent": "CashGPT-readonly-scanner/2.0"},
    )
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.load(r)


def coinbase(pair):
    d = get_json(f"https://api.exchange.coinbase.com/products/{pair}/ticker")
    return {
        "bid": float(d["bid"]),
        "ask": float(d["ask"]),
        "last": float(d["price"]),
        "bid_size": float(d.get("bid_size") or 0.0),
        "ask_size": float(d.get("ask_size") or 0.0),
    }


def kraken(pair):
    key = "XBTUSD" if pair == "BTC-USD" else "ETHUSD"
    d = get_json(f"https://api.kraken.com/0/public/Ticker?pair={key}")
    if d.get("error"):
        raise RuntimeError(d["error"])
    v = next(iter(d["result"].values()))
    return {
        "bid": float(v["b"][0]),
        "ask": float(v["a"][0]),
        "last": float(v["c"][0]),
        "bid_size": float(v["b"][2]) if len(v["b"]) > 2 else 0.0,
        "ask_size": float(v["a"][2]) if len(v["a"]) > 2 else 0.0,
    }


def gemini(pair):
    symbol = pair.replace("-", "").lower()
    book = get_json(f"https://api.gemini.com/v1/book/{symbol}?limit_bids=1&limit_asks=1")
    ticker = get_json(f"https://api.gemini.com/v2/ticker/{symbol}")
    bid = book["bids"][0]
    ask = book["asks"][0]
    return {
        "bid": float(bid["price"]),
        "ask": float(ask["price"]),
        "last": float(ticker["close"]),
        "bid_size": float(bid["amount"]),
        "ask_size": float(ask["amount"]),
    }


def bitstamp(pair):
    symbol = pair.replace("-", "").lower()
    d = get_json(f"https://www.bitstamp.net/api/v2/ticker/{symbol}/")
    return {
        "bid": float(d["bid"]),
        "ask": float(d["ask"]),
        "last": float(d["last"]),
        "bid_size": 0.0,
        "ask_size": 0.0,
    }


def bps(x):
    return round(x * 10000.0, 2)


def assess(venues):
    out = []
    for buy_name, buy in venues.items():
        for sell_name, sell in venues.items():
            if buy_name == sell_name:
                continue
            raw = sell["bid"] / buy["ask"] - 1.0
            costs_bps = (
                TAKER_FEE_BPS[buy_name]
                + TAKER_FEE_BPS[sell_name]
                + 2 * SLIPPAGE_BPS_PER_LEG
            )
            raw_bps = bps(raw)
            net_bps = raw_bps - costs_bps
            paper_pnl = PAPER_NOTIONAL_USD * net_bps / 10000.0
            required_base = PAPER_NOTIONAL_USD / buy["ask"]
            size_known = buy["ask_size"] > 0 and sell["bid_size"] > 0
            top_size_ok = (
                min(buy["ask_size"], sell["bid_size"]) >= required_base
                if size_known
                else None
            )
            out.append({
                "buy": buy_name,
                "sell": sell_name,
                "buy_ask": buy["ask"],
                "sell_bid": sell["bid"],
                "raw_edge_bps": raw_bps,
                "assumed_cost_bps": costs_bps,
                "modeled_net_edge_bps": round(net_bps, 2),
                "paper_notional_usd": PAPER_NOTIONAL_USD,
                "paper_modeled_pnl_usd": round(paper_pnl, 4),
                "top_of_book_size_known": size_known,
                "top_of_book_supports_notional": top_size_ok,
                "paper_signal": net_bps > 0 and top_size_ok is not False,
            })
    return sorted(out, key=lambda x: x["modeled_net_edge_bps"], reverse=True)


def main():
    snapshot = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "paper_only": True,
        "paper_notional_usd": PAPER_NOTIONAL_USD,
        "pairs": {},
    }
    venue_fns = (
        ("coinbase", coinbase),
        ("kraken", kraken),
        ("gemini", gemini),
        ("bitstamp", bitstamp),
    )
    for pair in PAIRS:
        venues = {}
        errors = {}
        for name, fn in venue_fns:
            try:
                venues[name] = fn(pair)
            except Exception as e:
                errors[name] = f"{type(e).__name__}: {e}"
        routes = assess(venues) if len(venues) > 1 else []
        snapshot["pairs"][pair] = {
            "venues": venues,
            "errors": errors,
            "routes": routes,
            "best_route": routes[0] if routes else None,
        }
    print(json.dumps(snapshot, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
