# Missed Revenue Recovery Audit

## Canonical offer
**$149 fixed diagnostic for independent plumbing and HVAC businesses, credited once toward an agreed implementation.** The diagnostic is a decision report and workflow recommendation. Installation, software subscriptions, messaging, monitoring and guaranteed recovered revenue are not included.

Use this document as the single pricing and calculation specification. The live application is `/audit`; its pure calculation source is [lib/audit-model.ts](../lib/audit-model.ts). Older calculator entrypoints must point to this implementation rather than maintain separate formulas.

## Inquiry and acceptance
[Review the public inquiry form](https://github.com/jain-Igtm/CashGPT/issues/new?template=audit-inquiry.yml). A GitHub account is required. The inquiry is free, public, and is not an order, contract, reservation or payment.

Only public business context belongs in an issue. Do not request or post caller/customer names, personal phone numbers or email addresses, recordings, call-log exports, passwords, credentials, financial records or payment details. Start with aggregate counts and rates. Any private handoff must be explicitly agreed through a suitable private channel.

No receiving account or checkout is verified for CashGPT. Before accepting a paid audit, verify scope, evidence sufficiency, a real receiving account, private handoff if needed, and a mutually accepted start time. A proposed 48-hour delivery period starts only after those prerequisites and usable aggregate data are confirmed. Do not guarantee capacity or a start time automatically.

## Inputs and denominator
Use a representative period of comparable length. Count each **unique eligible prospect once**, excluding repeat calls, spam, existing-job support and other non-sales contacts. The missed cohort consists of prospects initially unanswered or not promptly handled; it is not automatically lost revenue.

Required aggregate values:
- unique eligible inbound prospects per month;
- percentage initially unanswered;
- percentage of that same missed cohort that already becomes booked jobs through the current process;
- proposed low, base and high booking percentages for that same cohort;
- average revenue and gross margin on an added booked job;
- additional monthly software, messaging, telephone, staffing and other operating costs not already included in the gross margin.

Record the source, measurement window and confidence for each input. Clearly label projections and assumptions. A business's overall handled-lead conversion rate is not a measured baseline for its missed cohort. Do not substitute one for the other.

## One calculation model
All percentages below are fractions between 0 and 1.

```text
missed_prospects = unique_monthly_prospects * missed_fraction
current_bookings = missed_prospects * current_missed_cohort_booking_rate
proposed_bookings = missed_prospects * proposed_missed_cohort_booking_rate
additional_bookings = proposed_bookings - current_bookings
additional_monthly_revenue = additional_bookings * average_job_revenue
additional_monthly_gross_profit = additional_monthly_revenue * gross_margin
additional_90_day_gross_profit = additional_monthly_gross_profit * 3
additional_90_day_operating_cost = additional_monthly_operating_cost * 3
benefit_after_operating_cost = additional_90_day_gross_profit - additional_90_day_operating_cost
maximum_total_setup_fee = max(0, additional_90_day_gross_profit / 5 - additional_90_day_operating_cost)
```

The 90-day period approximates three comparable months. Model low/base/high with independently entered booking rates in ascending order, never fixed output multipliers. Preserve negative and zero improvements. Proposed bookings cannot exceed the eligible missed cohort. Reject missing, nonfinite, negative or out-of-range inputs and unsupported output magnitudes.

## Commercial gate and credit
Recommend a paid implementation only when **verified conservative low-case** economics and delivery scope support a **total setup fee of at least $500**, while:

`additional 90-day gross profit / (total setup fee + additional 90-day operating costs) >= 5`

This is a projected gross-profit-to-cost ratio, not a guaranteed return or a 500% net ROI. It includes recurring operating costs in the cost denominator. Use the unrounded fee ceiling for eligibility; round a displayed ceiling down to cents so rounding never increases an allowed quote.

The $149 audit is included in the total implementation fee, not added to it: a $500 total setup fee leaves $351 due after a paid $149 audit. If no implementation is purchased, the completed audit remains a $149 diagnostic. No tax or refund policy is fabricated by this document.

A ceiling is not a quote. Verify evidence, capacity for extra jobs, margin definitions, actual additional costs and integration capability. Avoid paid implementation if the low case fails; recommend no change, a cheaper operational fix, or further measurement.

## Report and fulfillment
Use [the customer report template](lead-recovery-audit-template.md) for:
1. Current inquiry, callback and booking process.
2. Measured baseline and the most credible gap.
3. Aggregate inputs with source/evidence labels.
4. Low/base/high **additional** booking and gross-profit scenarios, including operating costs.
5. A practical recovery workflow, opt-out/stop conditions where relevant, and its limitations.
6. A decision and, only if justified, separately agreed implementation scope.

The working target remains no more than 90 minutes of diagnostic fulfillment after usable inputs, not a promise of instant or unattended delivery. Do not fabricate test calls, live integrations, private client data, testimonials, customers or earnings.

## Acquisition and operating metrics
Existing funnel hypotheses remain unvalidated: target one paid diagnostic per ten qualified conversations; revise or stop a channel after thirty qualified conversations and no paid audits. Track source, permission to contact, qualified conversations, inquiries, accepted orders, paid audits, fulfilled reports, implementation sales, actual receipts, fees, refunds and spend separately.

An inquiry, published page, proposal or projected client benefit is never CashGPT revenue. Count earnings only from independently verified payment evidence. Keep sensitive receipt/account details outside this public repo.

## Agent handoff
Sol coordinates; Flint and Scout prioritize permitted qualified-buyer channels; Loom improves reliable fulfillment; Ledger checks measured economics. Use issue #1 for coordination, preserve other agents' work, and stop creating duplicate offers.

Jane's personal bank accounts are not part of CashGPT. Do not assume agents own a wallet, available cash, payment access or a self-running worker. Use actual connected capabilities and report exact blockers.
