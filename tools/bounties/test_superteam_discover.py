import copy
from datetime import datetime, timezone
import json
from pathlib import Path
import unittest

from superteam_discover import assess_listing, make_report, parse_time, NoRedirect


NOW = datetime(2026, 8, 30, 18, 0, tzinfo=timezone.utc)
LIVE = {
    "id": "fixture-id", "slug": "fixture-only", "title": "Fixture only",
    "type": "bounty", "status": "OPEN", "agentAccess": "AGENT_ALLOWED",
    "isWinnersAnnounced": False, "deadline": "2026-09-01T00:00:00Z",
    "rewardAmount": 30, "token": "USDC",
}


class ListingEligibilityTests(unittest.TestCase):
    def test_completed_real_feed_is_rejected_even_though_open(self):
        fixture = Path(__file__).resolve().parents[2] / "revenue/evidence/superteam-listings-2026-08-30.json"
        rows = json.loads(fixture.read_text())
        self.assertEqual(len(rows), 9)
        self.assertTrue(all(row["status"] == "OPEN" for row in rows))
        report = make_report(rows, NOW)
        self.assertEqual(report["candidate_count"], 0)
        self.assertEqual(report["rejection_counts"]["deadline_passed"], 9)
        self.assertEqual(report["rejection_counts"]["winners_announced_or_unknown"], 9)

    def test_valid_future_listing_is_only_a_candidate(self):
        report = make_report([LIVE], NOW)
        self.assertEqual(report["candidate_count"], 1)
        self.assertEqual(report["submissions_created_in_this_check"], 0)
        self.assertEqual(report["financial_actions_in_this_check"], 0)
        self.assertFalse(report["earnings_checked"])
        self.assertIn("funding", report["next_gate"])

    def test_winner_flag_overrides_a_future_deadline(self):
        row = dict(LIVE, isWinnersAnnounced=True)
        self.assertFalse(assess_listing(row, NOW)["candidate"])

    def test_missing_or_nonboolean_winner_flag_is_not_assumed_false(self):
        for flag in (None, 0, "false", "False"):
            with self.subTest(flag=flag):
                self.assertFalse(assess_listing(dict(LIVE, isWinnersAnnounced=flag), NOW)["candidate"])

    def test_deadline_boundary_and_offset(self):
        for deadline in ("2026-08-30T18:00:00Z", "2026-08-30T20:00:00+02:00"):
            with self.subTest(deadline=deadline):
                self.assertIn("deadline_passed", assess_listing(dict(LIVE, deadline=deadline), NOW)["reasons"])
        self.assertTrue(assess_listing(dict(LIVE, deadline="2026-08-30T18:00:01Z"), NOW)["candidate"])

    def test_unknown_deadline_fails_closed(self):
        for deadline in (None, "2026-09-01", "invalid", 123):
            with self.subTest(deadline=deadline):
                self.assertIn("deadline_unknown", assess_listing(dict(LIVE, deadline=deadline), NOW)["reasons"])

    def test_human_only_zero_reward_and_closed_are_rejected(self):
        cases = ({"agentAccess": "HUMAN_ONLY"}, {"status": "CLOSED"},
                 {"rewardAmount": 0}, {"rewardAmount": -1}, {"rewardAmount": True},
                 {"rewardAmount": "50"}, {"rewardAmount": float("nan")},
                 {"token": None}, {"slug": None}, {"id": None}, {"type": "unknown"})
        for change in cases:
            with self.subTest(change=change):
                self.assertFalse(assess_listing(dict(LIVE, **change), NOW)["candidate"])

    def test_api_error_object_is_not_an_empty_success(self):
        with self.assertRaises(ValueError):
            make_report({"error": "upstream unavailable"}, NOW)

    def test_full_page_is_not_claimed_as_exhaustive(self):
        report = make_report([copy.deepcopy(LIVE) for _ in range(50)], NOW)
        self.assertTrue(report["feed_may_be_truncated"])

    def test_authenticated_redirect_is_blocked(self):
        self.assertIsNone(NoRedirect().redirect_request(None, None, 302, "redirect", {}, "https://example.com"))

    def test_time_without_timezone_is_rejected(self):
        with self.assertRaises(ValueError):
            parse_time("2026-08-30T18:00:00")


if __name__ == "__main__":
    unittest.main()
