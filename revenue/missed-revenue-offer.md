# Missed Revenue Recovery Audit

## Offer

**$149 fixed audit. Credited in full toward implementation if the business proceeds.**

Target customer: independent plumbing, HVAC, electrical, roofing, garage-door, restoration, and similar high-ticket local service businesses where a missed phone inquiry can represent hundreds or thousands of dollars in lost gross revenue.

The product is a diagnosis and recovery plan, not a generic software subscription.

## Promise

Within 48 hours of receiving the minimum data, deliver a conservative estimate of how much booked-job revenue is leaking from missed calls, slow response, stale estimates, and weak follow-up, plus the exact workflow needed to recover it.

Do **not** promise a revenue amount before seeing the data. Do **not** claim that every missed call is a lost customer.

## What the buyer receives

1. **Lead leak map** — where inquiries enter, who responds, and where they die.
2. **Response-time snapshot** — missed calls, after-hours calls, form inquiries, and follow-up timing based on business-provided records and publicly observable customer-contact paths.
3. **Conservative revenue-loss model** — low/base/high scenarios using the business's own average ticket, lead counts, and close rate when available.
4. **Recovery workflow** — a concrete sequence for missed-call text-back, callback queue, estimate follow-up, stale-lead reactivation, and review/referral follow-up as appropriate.
5. **Implementation recommendation** — build/buy recommendation with specific tools and costs. Avoid selling custom software when a cheap commodity tool solves the problem.
6. **Implementation quote** — offered only when projected incremental gross profit reasonably supports the cost.

## Data request

Minimum useful inputs:

- Approximate inbound phone leads per month
- Approximate missed/unanswered calls per month (or call log export)
- Average job ticket
- Estimated lead-to-booked-job close rate
- Gross margin if known
- Current CRM / phone / scheduling tools
- Current after-hours process
- Typical estimate follow-up process

If the business cannot provide all inputs, build an explicit range and label assumptions.

## Calculator

Use `/missed-revenue-calculator.html` in this repo/site for a fast scenario model.

Core model:

`recoverable gross revenue = missed opportunities × reachable fraction × booking rate × average ticket`

`recoverable gross profit = recoverable gross revenue × gross margin`

The audit should show a **low / base / high** case, never one falsely precise number.

## Qualification gate

Prioritize businesses with:

- high average job value;
- meaningful paid lead volume or strong phone dependence;
- limited office coverage or no obvious 24/7 live call center;
- owner-operated or small/midsize structure where the buyer is reachable;
- no obvious sophisticated call-center/CRM stack;
- enough monthly lead volume that one recovered job can cover the audit fee.

Deprioritize large regional chains with mature call centers, businesses with low average ticket, and firms already advertising mature missed-call automation.

## Pricing ladder

### Audit — $149

48-hour diagnostic and recovery plan. Fully credited toward implementation.

### Implementation Lite — $399–$750

Configure an existing low-cost tool, templates, routing rules, callback queue, and follow-up sequence. Exact scope depends on the client's existing stack.

### Implementation Custom — $900–$2,500+

Only when multiple systems, data cleanup, CRM integration, custom automation, reporting, or staff workflow redesign is required.

### Ongoing optimization — $99–$350/mo

Monthly leak check, response metrics, workflow tuning, stale-lead campaigns, and reporting when justified.

## Sales framing

Lead with lost jobs, not AI.

> I help local service companies find phone and follow-up leaks that are already costing them booked work. The first engagement is a $149 fixed audit. If there isn't a credible path to recover materially more than the audit costs, I tell you that and don't pitch an implementation.

## Decision rule

Only recommend paid implementation when the conservative expected incremental **gross profit** is at least 3× implementation cost over a reasonable payback period. Aim for 5× when assumptions are weak.

## Fulfillment constraint

Never fabricate call data, conversion rates, customer identities, test calls, or revenue. Mystery-shop/test-call work must be lawful, non-deceptive in purpose, and should not waste emergency resources or impersonate a real customer with a fabricated emergency. Prefer business-provided logs and public contact-path analysis.
