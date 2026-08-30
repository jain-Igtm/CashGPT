"use client";

import { useMemo, useState } from "react";
import {
  AUDIT_PRICE, MINIMUM_IMPLEMENTATION_FEE, calculateAudit, demoInputs,
  type AuditField, type AuditInput,
} from "../../lib/audit-model";

const INQUIRY_URL = "https://github.com/jain-Igtm/CashGPT/issues/new?template=audit-inquiry.yml";
const money = (value: number) => value.toLocaleString("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 2,
});
const ceilingMoney = (value: number) => money(Math.floor(value * 100) / 100);
const fieldLabels: Record<AuditField, string> = {
  inquiries: "Unique eligible inbound prospects / month",
  missedPercent: "Initially unanswered prospects (%)",
  currentBookingPercent: "Missed prospects that already become jobs (%)",
  jobRevenue: "Average revenue per booked job ($)",
  grossMarginPercent: "Gross margin on an added job (%)",
  monthlyOperatingCost: "Additional operating costs / month ($)",
  lowBookingPercent: "Low: missed prospects becoming jobs (%)",
  baseBookingPercent: "Base: missed prospects becoming jobs (%)",
  highBookingPercent: "High: missed prospects becoming jobs (%)",
};

export default function AuditPage() {
  const [inputs, setInputs] = useState<AuditInput>(demoInputs);
  const result = useMemo(() => calculateAudit(inputs), [inputs]);
  const low = result.scenarios[0];
  const field = (name: AuditField) => (
    <label key={name} className="audit-field">
      <span>{fieldLabels[name]}</span>
      <input type="number" min={0} max={name.endsWith("Percent") ? 100 : 1e12}
        step="any" value={inputs[name]} required
        onChange={event => setInputs(previous => ({ ...previous, [name]: event.target.value }))}
        aria-describedby="assumptions-note" />
    </label>
  );

  return (
    <main className="audit-shell">
      <nav className="audit-nav" aria-label="CashGPT navigation">
        <a href="/">CashGPT</a>
        <a href="https://github.com/jain-Igtm/CashGPT/issues/1">Agent room</a>
      </nav>
      <header className="audit-hero">
        <p className="section-kicker">For independent plumbing &amp; HVAC businesses</p>
        <h1>Find the gaps in your lead follow-up.</h1>
        <p className="audit-deck">A {money(AUDIT_PRICE)} diagnostic of missed calls and unconverted inquiries:
          your current process, conservative economics, and a practical recovery plan.</p>
        <div className="audit-actions">
          <a className="audit-cta" href="#request">Request a fit check</a>
          <a className="audit-text-link" href="#calculator">Explore the estimate</a>
        </div>
        <p className="audit-note">Inquiries are open. Checkout is not configured; no payment or booking is taken here.</p>
      </header>

      <section className="audit-section" aria-labelledby="deliverable-heading">
        <h2 id="deliverable-heading">One report. A clear next decision.</h2>
        <div className="audit-deliverables">
          <article><span>01</span><h3>Map the follow-up</h3><p>Review your existing inquiry, callback and booking process using aggregate information you provide.</p></article>
          <article><span>02</span><h3>Check the economics</h3><p>Separate existing bookings from possible additional jobs. Include software, messaging and other additional costs.</p></article>
          <article><span>03</span><h3>Choose the next step</h3><p>Receive a prioritized workflow recommendation. An implementation is quoted only when the conservative case justifies it.</p></article>
        </div>
        <p className="audit-note">The $149 audit is credited toward an agreed implementation.
          Installation, subscriptions and ongoing support are outside the diagnostic.
          A delivery window is confirmed only after scope, usable data and a real payment route are agreed.</p>
      </section>

      <section id="calculator" className="audit-section" aria-labelledby="calculator-heading">
        <p className="section-kicker">Scenario calculator</p>
        <h2 id="calculator-heading">What would improvement be worth?</h2>
        <p id="assumptions-note">These are hypothetical demo assumptions, not customer results.
          Count each eligible prospect once; exclude duplicate calls, spam and existing-job inquiries.
          Both current and proposed booking rates use that same initially unanswered group.</p>
        <div className="audit-fields">
          {(["inquiries", "missedPercent", "currentBookingPercent", "jobRevenue", "grossMarginPercent", "monthlyOperatingCost"] as AuditField[]).map(field)}
        </div>
        <h3 className="audit-assumption-heading">Your proposed booking rates</h3>
        <p className="audit-note">Enter independent low, base and high assumptions.
          Use the low case for the implementation decision. Unknown rates need evidence before a quote.</p>
        <div className="audit-fields audit-three">
          {(["lowBookingPercent", "baseBookingPercent", "highBookingPercent"] as AuditField[]).map(field)}
        </div>
        <div aria-live="polite" aria-atomic="true">
          {result.errors.length > 0 ? (
            <div className="audit-warning" role="status"><strong>Check the inputs before using the estimate.</strong>
              <ul>{result.errors.map(error => <li key={error}>{error}</li>)}</ul>
            </div>
          ) : (
            <>
              <p className="audit-note">Eligible initially unanswered prospects: {result.missedProspects?.toLocaleString("en-US", { maximumFractionDigits: 2 })} / month.
                Values below measure additional outcomes above the current callback process.</p>
              <div className="audit-results">
                {result.scenarios.map(scenario => (
                  <article key={scenario.name} className="audit-result">
                    <h3>{scenario.name} case</h3>
                    <strong className="audit-result-number">{money(scenario.grossProfit90)}</strong>
                    <p className="audit-note">Additional gross profit / 90 days</p>
                    <dl>
                      <div><dt>Additional bookings / month</dt><dd>{scenario.incrementalBookings.toFixed(2)}</dd></div>
                      <div><dt>90-day operating costs</dt><dd>{money(scenario.operatingCost90)}</dd></div>
                      <div><dt>Benefit after operating costs</dt><dd>{money(scenario.benefitAfterOperatingCosts90)}</dd></div>
                      <div><dt>Maximum total setup fee at 5×</dt><dd>{ceilingMoney(scenario.feeCeiling)}</dd></div>
                    </dl>
                  </article>
                ))}
              </div>
              <div className="audit-decision">
                <strong>{low?.meetsMinimum
                  ? "The low case clears the $500 minimum for further review."
                  : "The low case does not justify a $500 implementation."}</strong>
                <p>{low?.meetsMinimum
                  ? "This is a scenario screen, not a quote. The inputs, delivery scope and costs still need verification."
                  : "Keep the existing process, investigate a lower-cost change, or improve the evidence before considering implementation."}</p>
              </div>
            </>
          )}
        </div>
        <p className="audit-note">Rule: additional 90-day gross profit ÷ (total setup fee + additional 90-day operating costs) ≥ 5.
          This is a modeled benefit-to-cost ratio, not a guaranteed return.
          A {money(MINIMUM_IMPLEMENTATION_FEE)} total setup fee includes the {money(AUDIT_PRICE)} credit, leaving {money(MINIMUM_IMPLEMENTATION_FEE - AUDIT_PRICE)} after a paid audit.
          The model uses three comparable months, assumes capacity to fulfill extra jobs, and excludes taxes.
          Enter operating costs not already included in your gross margin.</p>
        <p className="audit-note">Calculator inputs are processed in this page only. They are not sent to the inquiry form, stored, or submitted to CashGPT.</p>
      </section>

      <section id="request" className="audit-section audit-request" aria-labelledby="request-heading">
        <p className="section-kicker">First, check the fit</p>
        <h2 id="request-heading">Tell us which process needs attention.</h2>
        <p>Open the inquiry form below, review the public information, then submit it on GitHub.
          A GitHub account is required. The CashGPT team can reply in that issue; an inquiry does not purchase or reserve an audit.</p>
        <div className="audit-warning">
          <strong>Your GitHub inquiry is public.</strong>
          <p>Share only your public business website, business type and a general workflow category.
            Do not include personal email or phone numbers, caller names, call logs, recordings,
            credentials, financial records or payment details. Private data must wait for an agreed private handoff.</p>
        </div>
        <a className="audit-cta" href={INQUIRY_URL} rel="noreferrer">Review public inquiry form on GitHub →</a>
        <p className="audit-note">No payment is collected. Scope, start time and a verified receiving account must be confirmed before a paid engagement can begin.</p>
      </section>
      <footer className="audit-footer"><span>CashGPT · Missed Revenue Recovery Audit</span><a href="/">View the agent room</a></footer>
    </main>
  );
}
