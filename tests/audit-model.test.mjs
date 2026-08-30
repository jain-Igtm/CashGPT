import test from "node:test";
import assert from "node:assert/strict";
import { calculateAudit, demoInputs } from "../lib/audit-model.ts";

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8, actual + " != " + expected);
const withRates = (current, proposed, extras = {}) => ({
  ...demoInputs, currentBookingPercent: current,
  lowBookingPercent: proposed, baseBookingPercent: proposed,
  highBookingPercent: proposed, ...extras,
});

test("demo scenarios subtract existing callback bookings and all operating costs", () => {
  const result = calculateAudit(demoInputs);
  assert.deepEqual(result.errors, []);
  close(result.missedProspects, 40);
  for (const [index, expected] of [[0, [1.2, 720, 54]], [1, [2.8, 1680, 246]], [2, [5.2, 3120, 534]]]) {
    const s = result.scenarios[index];
    close(s.incrementalBookings, expected[0]);
    close(s.grossProfit90, expected[1]);
    close(s.feeCeiling, expected[2]);
  }
  assert.equal(result.scenarios[0].meetsMinimum, false);
});

test("unchanged callbacks create zero benefit, not fictitious additional bookings", () => {
  const s = calculateAudit(withRates(20, 20)).scenarios[0];
  assert.equal(s.incrementalBookings, 0);
  assert.equal(s.grossProfit90, 0);
  assert.equal(s.benefitAfterOperatingCosts90, -90);
  assert.equal(s.meetsMinimum, false);
});

test("a worse workflow retains negative incremental outcomes", () => {
  const s = calculateAudit(withRates(30, 10)).scenarios[0];
  close(s.incrementalBookings, -8);
  close(s.grossProfit90, -4800);
  assert.equal(s.feeCeiling, 0);
});

test("saturation never books more unique missed prospects than exist", () => {
  const s = calculateAudit(withRates(0, 100, {
    inquiries: 10, missedPercent: 100, jobRevenue: 100,
    grossMarginPercent: 100, monthlyOperatingCost: 0,
  })).scenarios[2];
  assert.equal(s.proposedBookings, 10);
  assert.equal(s.monthlyGrossProfit, 1000);
  assert.equal(s.grossProfit90, 3000);
});

test("all-in 5x cost ceiling includes recurring costs outside the fee", () => {
  const s = calculateAudit(withRates(0, 25, { monthlyOperatingCost: 100 })).scenarios[0];
  // 10 additional jobs * $500 * 40% * 3 = $6,000 GP.
  assert.equal(s.grossProfit90, 6000);
  assert.equal(s.feeCeiling, 900);
  assert.equal(s.grossProfit90 / (s.feeCeiling + s.operatingCost90), 5);
});

test("unrounded threshold does not approve a fee above the ceiling", () => {
  const s = calculateAudit(withRates(0, 25, { monthlyOperatingCost: 233.40 })).scenarios[0];
  close(s.feeCeiling, 499.8);
  assert.equal(s.meetsMinimum, false);
});

test("zero cohort has no recovery and still incurs chosen operating costs", () => {
  const s = calculateAudit(withRates(0, 100, { inquiries: 0 })).scenarios[0];
  assert.equal(s.incrementalBookings, 0);
  assert.equal(s.benefitAfterOperatingCosts90, -90);
  assert.equal(s.meetsMinimum, false);
});

test("invalid, missing, nonfinite and unordered assumptions produce no results", () => {
  for (const override of [
    { inquiries: "" }, { inquiries: -1 }, { jobRevenue: NaN },
    { jobRevenue: Infinity }, { missedPercent: 101 }, { lowBookingPercent: 200 },
    { grossMarginPercent: -1 }, { monthlyOperatingCost: -1 },
    { lowBookingPercent: 30, baseBookingPercent: 20 }, { inquiries: 1e308 },
    { inquiries: 1e12, jobRevenue: 1e12 },
  ]) {
    const r = calculateAudit({ ...demoInputs, ...override });
    assert.ok(r.errors.length > 0);
    assert.deepEqual(r.scenarios, []);
  }
});
