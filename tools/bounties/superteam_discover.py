#!/usr/bin/env python3
"""Read-only Superteam agent discovery. A candidate is not a funded/earned reward."""

import argparse
from collections import Counter
from datetime import datetime, timezone
import json
import math
import os
from pathlib import Path
import sys
import urllib.error
import urllib.parse
import urllib.request

BASE_URL = "https://superteam.fun"
LISTING_LIMIT = 50


def parse_time(value):
    if not isinstance(value, str):
        raise ValueError("Expected an ISO timestamp with a timezone")
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        raise ValueError("A timestamp must include its timezone")
    return parsed.astimezone(timezone.utc)


def assess_listing(row, now):
    """Fail closed on missing eligibility data and stale OPEN records."""
    reasons = []
    if not isinstance(row, dict):
        return {"candidate": False, "reasons": ["invalid_record"]}
    if not isinstance(row.get("id"), str) or not row["id"].strip():
        reasons.append("missing_id")
    if not isinstance(row.get("slug"), str) or not row["slug"].strip():
        reasons.append("missing_slug")
    if row.get("agentAccess") not in {"AGENT_ALLOWED", "AGENT_ONLY"}:
        reasons.append("agent_access_not_confirmed")
    if row.get("status") != "OPEN":
        reasons.append("not_open")
    if row.get("isWinnersAnnounced") is not False:
        reasons.append("winners_announced_or_unknown")
    try:
        if parse_time(row.get("deadline")) <= now:
            reasons.append("deadline_passed")
    except (ValueError, TypeError):
        reasons.append("deadline_unknown")
    reward = row.get("rewardAmount")
    if (isinstance(reward, bool) or not isinstance(reward, (int, float))
            or not math.isfinite(reward) or reward <= 0):
        reasons.append("positive_reward_not_confirmed")
    if not isinstance(row.get("token"), str) or not row["token"].strip():
        reasons.append("reward_currency_unknown")
    if row.get("type") not in {"bounty", "hackathon", "project"}:
        reasons.append("listing_type_unknown")
    slug = row.get("slug")
    return {
        "id": row.get("id"), "title": row.get("title"),
        "url": BASE_URL + "/earn/listing/" + urllib.parse.quote(slug, safe="")
        if isinstance(slug, str) else None,
        "type": row.get("type"), "deadline": row.get("deadline"),
        "advertised_reward": reward, "currency": row.get("token"),
        "candidate": not reasons, "reasons": reasons,
    }


def make_report(rows, now):
    if not isinstance(rows, list):
        raise ValueError("The discovery response must be a JSON array")
    if now.tzinfo is None:
        raise ValueError("The review time must have a timezone")
    reviewed = [assess_listing(row, now) for row in rows]
    candidates = [row for row in reviewed if row["candidate"]]
    return {
        "reviewed_at": now.astimezone(timezone.utc).isoformat(),
        "source": BASE_URL + "/api/agents/listings/live?take=50",
        "returned": len(rows), "candidate_count": len(candidates),
        "feed_may_be_truncated": len(rows) >= LISTING_LIMIT,
        "rejection_counts": dict(Counter(r for row in reviewed for r in row["reasons"])),
        "candidates": candidates, "reviewed": reviewed,
        "next_gate": "Review full brief, region, funding, submission access, and payout prerequisites before working.",
        "submissions_created_in_this_check": 0,
        "financial_actions_in_this_check": 0,
        "earnings_checked": False,
    }


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        # Never forward the task API key to a redirected host.
        return None


def fetch_listings(key):
    if not key or "\n" in key or "\r" in key:
        raise ValueError("A valid Superteam agent API key is required")
    request = urllib.request.Request(
        BASE_URL + "/api/agents/listings/live?take=50",
        headers={"Authorization": "Bearer " + key, "Accept": "application/json"},
        method="GET",
    )
    with urllib.request.build_opener(NoRedirect()).open(request, timeout=20) as response:
        return json.load(response)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group()
    source.add_argument("--input", type=Path, help="Review a saved listing array offline")
    source.add_argument("--credentials-file", type=Path, help="Private registration JSON; never commit it")
    parser.add_argument("--now", help="ISO timestamp for reproducible offline reviews only")
    args = parser.parse_args(argv)
    if args.now and not args.input:
        parser.error("--now is only allowed with --input; live checks use the current time")
    try:
        now = parse_time(args.now) if args.now else datetime.now(timezone.utc)
        if args.input:
            rows = json.loads(args.input.read_text())
        else:
            key = (json.loads(args.credentials_file.read_text()).get("apiKey")
                   if args.credentials_file else os.environ.get("SUPERTEAM_API_KEY"))
            rows = fetch_listings(key)
        print(json.dumps(make_report(rows, now), indent=2, allow_nan=False))
        return 0
    except urllib.error.HTTPError as exc:
        print(f"Superteam returned HTTP {exc.code}; no action submitted.", file=sys.stderr)
    except (urllib.error.URLError, TimeoutError, OSError):
        print("Could not read the source; no action submitted.", file=sys.stderr)
    except (ValueError, TypeError, AttributeError, OverflowError):
        print("Invalid data or credentials; no action submitted.", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
