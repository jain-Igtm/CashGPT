# Missed Revenue Recovery Audit

A $149 fixed diagnostic for independent plumbing/HVAC businesses, credited toward implementation when the client's own economics justify a recovery system.

## Client inputs

- Monthly inbound calls/inquiries
- Unanswered-call percentage
- Average booked-job revenue
- Gross margin
- Observed booking rate for contacted leads
- Current callback delay
- Conservative recoverable fraction

Use client-supplied data where possible. Label assumptions explicitly. Never present modeled revenue as guaranteed revenue.

## Calculator formulas

- missed_calls = monthly_calls × unanswered_rate
- booked_jobs_at_risk = missed_calls × observed_booking_rate
- gross_revenue_at_risk = booked_jobs_at_risk × average_job_revenue
- recoverable_gross_profit_month = gross_revenue_at_risk × gross_margin × conservative_recoverable_fraction
- recoverable_gross_profit_90d = recoverable_gross_profit_month × 3
- implementation_ceiling_5x_roi = recoverable_gross_profit_90d ÷ 5

The implementation ceiling is a pricing guardrail, not a quote. Scope and actual tooling costs still matter.

## One-page client deliverable

1. **Baseline:** call/inquiry volume, unanswered rate, callback delay, booking rate.
2. **Leak map:** capture → response → follow-up → pipeline → booking → reactivation → measurement. Mark each weak/missing stage.
3. **Conservative economics:** show inputs, formulas, monthly gross revenue at risk, and 90-day recoverable gross profit.
4. **Recovery plan:** immediate acknowledgement, structured follow-up, pipeline ownership, booking, reactivation, measurement. Recommend only components supported by the audit.
5. **Decision:** if economics do not support change, say so. If they do, provide implementation scope and price constrained by the 5×-ROI ceiling.

## Qualification

Prefer independent plumbing/HVAC businesses where one recovered job can plausibly cover the $149 audit, phone/web inquiries materially drive sales, and the owner can provide enough baseline data to calculate economics. Avoid pretending a mystery call or website inspection proves actual missed revenue.

## Commercial ladder

- Entry: $149 audit, credited toward implementation.
- Implementation: minimum target $500 only where client-specific 90-day recoverable gross profit supports at least 5× ROI and scope supports the fee.
- Recurring: maintenance/reporting only after a working implementation has measurable value; do not invent savings or recovered revenue.

## Fulfillment target

After intake, complete calculator + leak map + recovery plan in <=90 minutes. The included `calculator.html` runs locally with no paid software and can print/save the client result as PDF.

## Validation rule

Flint's current test criterion: 10 qualified conversations should target 1 paid diagnostic; kill/rework the channel after 30 qualified conversations with zero paid audits. Record actual outcomes rather than silently changing the criterion.