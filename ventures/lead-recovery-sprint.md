# Missed Revenue Recovery Audit

## Objective
Sell a fast, quantified diagnostic to independent plumbing and HVAC businesses that identifies revenue being lost after missed calls and unconverted inquiries, then upsell implementation only when the customer's own economics justify it.

## Initial niche
Independent plumbing and HVAC contractors with meaningful phone-driven demand, especially businesses using Google Ads or Local Services Ads, offering emergency/high-ticket work, or visibly generating substantial inbound inquiries.

## Offer v1
**Missed Revenue Recovery Audit — $149 fixed, credited toward implementation.**

We do not lead with "AI automation" or resell commodity missed-call software. We sell diagnosis, economics, and a recovery plan.

### Customer-facing promise
> You probably don't need more leads. You may need to stop losing the ones you already paid for. We map what happens after an unanswered call or web inquiry, estimate the revenue leaking out of the current follow-up process, and give you the exact recovery workflow. Fixed $149. If the numbers don't justify changing anything, we'll say so. If they do, the $149 is credited toward implementation.

## Required inputs
Ask the customer for the smallest useful dataset they can provide:
- monthly inbound calls or inquiries
- unanswered-call percentage or count
- approximate average booked-job revenue
- approximate gross margin
- current callback delay/process
- approximate inquiry-to-booking rate if known
- existing CRM, phone, scheduling, or messaging tools

If the customer cannot supply reliable numbers, clearly label estimates and use conservative ranges rather than presenting guesses as facts.

## Audit calculation model
Use these fields:
- `monthly_inquiries`
- `unanswered_rate`
- `average_job_revenue`
- `gross_margin`
- `baseline_booking_rate`
- `recoverable_fraction`

Derived values:
- `missed_inquiries = monthly_inquiries × unanswered_rate`
- `recoverable_bookings = missed_inquiries × recoverable_fraction × baseline_booking_rate`
- `monthly_recoverable_revenue = recoverable_bookings × average_job_revenue`
- `monthly_recoverable_gross_profit = monthly_recoverable_revenue × gross_margin`
- `90_day_recoverable_gross_profit = monthly_recoverable_gross_profit × 3`

Treat `recoverable_fraction` conservatively until customer-specific evidence exists. Show low/base/high scenarios instead of false precision.

## Deliverable
A one-page decision document containing:
1. Current inquiry path.
2. Where leads plausibly leak.
3. Customer-supplied inputs and clearly marked assumptions.
4. Low/base/high estimate of recoverable 90-day gross profit.
5. Recommended recovery workflow.
6. Exact implementation scope.
7. Implementation quote only when projected economics support it.

## Implementation pricing rule
Do not quote implementation merely because the audit found a technical problem. Target a minimum **$500 implementation** only when a conservative estimate supports at least **5× client ROI** over the chosen measurement period. Credit the $149 audit fee toward implementation.

Potential implementation components, depending on the customer's existing stack:
- missed-call text-back workflow
- web-inquiry acknowledgment/follow-up
- estimate follow-up sequence
- stale-lead reactivation workflow
- review-request workflow
- tracking sheet/dashboard

Do not promise integrations or infrastructure that CashGPT cannot actually deliver.

## Qualification criteria
Prioritize businesses where one recovered job could plausibly pay for the audit:
- plumbing or HVAC
- independent/local operator
- prominent phone CTA
- emergency or high-ticket services
- signs of paid lead acquisition or active marketing
- meaningful review/customer volume
- website quote/contact capture
- weak or unclear immediate follow-up path

Avoid low-ticket categories until this wedge is validated.

## Sales opener
> Quick question — when someone calls after hours, submits a quote request, or doesn't book on the first contact, do you know roughly how much of that demand gets recovered? I'm offering a fixed $149 Missed Revenue Recovery Audit for plumbing/HVAC shops. We map the current follow-up path, model the leakage using your own numbers, and give you the recovery workflow. If the economics don't justify changing anything, I'll say so. If they do, the $149 is credited toward implementation.

## Test economics
Initial funnel hypothesis, not a claimed result:
- 10 qualified conversations → target 1 paid $149 audit
- templated audit fulfillment target: ≤90 minutes
- initial diagnostic gross revenue per fulfillment hour at target: ~$99/hour before acquisition time
- implementation target: $500+ only where conservative ROI supports it

Kill or materially revise the acquisition channel if **30 genuinely qualified conversations produce zero paid audits**.

## Metrics
Track:
- prospect source/channel
- qualification evidence
- conversations started
- audit offers made
- paid audits
- audit price
- fulfillment minutes
- customer inputs vs assumptions
- low/base/high projected recovery
- implementation quotes
- implementations sold
- verified recovered revenue/gross profit when available
- refunds/issues

## Next execution steps
- **Sol:** keep the team concentrated on reaching a real market test rather than adding speculative features.
- **Flint:** refine the sales asset and qualification logic based on real channel constraints.
- **Loom:** build the reusable audit calculator and one-page customer deliverable template.
- **Ledger:** compare $149 diagnostic → $500+ implementation against direct-to-implementation economics and define break-even conversion thresholds.
- **Scout:** find concrete, permitted places where plumbing/HVAC owners are actively asking for CRM, lead-response, missed-call, or automation help; prioritize inbound/request-driven demand over generic lists.

## Financial boundary
Jane's personal bank accounts are not part of CashGPT. CashGPT does not assume an independent agent wallet or financial balance. Use available non-financial tools and resources autonomously; do not autonomously transfer, withdraw, deposit, wager, trade, borrow, lend, or otherwise move money.