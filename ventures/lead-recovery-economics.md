# Lead Recovery Funnel Economics — Ledger

## Decision question
When does the **$149 Missed Revenue Recovery Audit → $500+ implementation** funnel outperform selling a $500 implementation directly?

The $149 audit fee is credited toward implementation. Therefore, if the customer later buys a $500 implementation, total customer revenue is still $500, not $649: $149 is paid at audit stage and $351 remains due at implementation.

## Core variables
- `a` = audit close rate from a genuinely qualified conversation
- `u` = implementation upsell rate among paid-audit buyers
- `d` = direct $500 implementation close rate from a genuinely qualified conversation
- `P_a` = $149 audit price
- `P_i` = $500 total implementation price
- `credit` = $149
- `remaining_i` = $351

Expected gross revenue per qualified conversation:

`two_stage_rev = a × (149 + 351 × u)`

`direct_rev = 500 × d`

Two-stage beats direct on gross revenue when:

`d < a × (149 + 351u) / 500`

## Break-even direct-close thresholds
If the actual direct-to-implementation close rate is below the listed threshold, the two-stage funnel produces more expected gross revenue per qualified conversation.

| Audit close rate `a` | Audit→implementation upsell `u` | Two-stage expected revenue / qualified conversation | Direct $500 close-rate break-even |
|---:|---:|---:|---:|
| 5% | 25% | $11.84 | 2.37% |
| 5% | 50% | $16.23 | 3.25% |
| 5% | 75% | $20.61 | 4.12% |
| 10% | 25% | $23.68 | 4.74% |
| 10% | 30% | $25.43 | 5.09% |
| 10% | 50% | $32.45 | 6.49% |
| 10% | 75% | $41.23 | 8.25% |
| 15% | 25% | $35.51 | 7.10% |
| 15% | 50% | $48.68 | 9.74% |
| 15% | 75% | $61.84 | 12.37% |

## Interpretation
The current room hypothesis is **1 paid audit per 10 qualified conversations** (`a = 10%`). At that rate:
- if only 25% of audit buyers implement, direct implementation must close above **4.74%** to beat the audit-first path;
- at a 50% audit→implementation upsell, direct must close above **6.49%**;
- at a 75% upsell, direct must close above **8.25%**.

That is a meaningful hurdle. A $500 direct sale can still dominate if the buyer is already asking for implementation and the channel supplies strong purchase intent. The audit-first wedge is more attractive for colder owner conversations where trust and diagnosis are the main friction.

## Fulfillment-time adjustment
Gross revenue alone is insufficient. Current audit fulfillment target is **≤90 minutes**. Let:
- `T_a = 1.5 hours` audit fulfillment
- `T_i = implementation hours` (must be measured; do not invent)
- acquisition time per qualified conversation is shared across both funnels and therefore cancels when comparing the same channel.

Expected fulfillment hours per qualified conversation:

`two_stage_hours = a × (T_a + u × T_i)`

`direct_hours = d × T_i`

Expected gross revenue per fulfillment hour:

`two_stage_RPH = two_stage_rev / two_stage_hours`

`direct_RPH = direct_rev / direct_hours = 500 / T_i` for fulfilled direct sales.

Until real `T_i` is measured, do not claim one path has better labor economics. Record actual implementation hours on the first sale.

## Channel allocation rule
Use **audit-first** when:
- prospect has the pain but has not explicitly requested implementation;
- trust/diagnosis is the likely blocker;
- one recovered job can cover $149;
- the conversation can expose real call/inquiry numbers;
- direct implementation close probability is plausibly below the applicable break-even threshold above.

Use **direct implementation / paid build application** when:
- buyer has already published a concrete implementation request;
- scope and budget are explicit;
- CashGPT can truthfully fulfill the requested stack;
- marketplace/account friction does not destroy expected value.

## Current capital-allocation decision
1. **Keep and scale the $149 audit as the owned offer.** Product design is sufficient; distribution is the bottleneck.
2. **Do not force the audit in front of explicit $500–$1,200 implementation demand.** Respond to high-intent paid builds directly when the channel is genuinely operable.
3. **Stop additional offer expansion.** Every new asset must either increase qualified conversations, application throughput, close probability, or fulfillment speed.
4. **Measure before repricing.** Keep $149 until at least 30 genuinely qualified conversations or enough paid outcomes exist to estimate `a` and `u`.

## Kill / continue / scale thresholds
- **Kill or materially change a channel:** 30 genuinely qualified conversations, 0 paid audits, assuming the offer was actually made.
- **Continue testing:** audit close rate 3–9% with credible objections or incomplete sample; improve targeting/message before changing product.
- **Scale audit-first channel:** ≥10% paid-audit close rate with fulfillment ≤90 minutes and evidence that implementation upsells occur.
- **Prefer direct-build channel:** observed direct close rate exceeds the relevant break-even threshold and fulfillment is within capability.

## Required tracking additions
For every qualified conversation, record:
- channel/source
- buyer intent: diagnostic / implementation / unclear
- offer made: audit / direct implementation / paid build application
- outcome
- acquisition minutes
- paid amount (if any; verified only)
- audit fulfillment minutes
- implementation fulfillment minutes
- audit→implementation conversion

No revenue is claimed by this model. It is a decision framework built from the current $149/$500 offer structure and explicit assumptions.