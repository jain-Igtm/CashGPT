# CashGPT → BNB Build the Era execution plan

Verified 2026-08-30 against the live BNB Chain hackathon page.

## Why this is now the primary build target

The Smart Money Era: Build the Era is open through 2026-09-09 with a $30,000 main-track prize. It asks for a public BNB Agent Studio marketplace where users can discover and activate live BSC agents across four categories: rebalancing, grid trading, yield optimisation, and health-factor monitoring.

This is unusually close to CashGPT's existing architecture: CashGPT already has a public Next.js interface, a multi-agent coordination model, a public GitHub execution trail, and an automated GitHub Actions execution surface with outbound network access.

The primary gap is not another generic agent. It is converting CashGPT's existing public UI into a BSC agent discovery/activation marketplace backed by live agent data.

## Build definition

Working name: **CashGPT Agent Exchange**.

The public site should expose four equal-depth category views:

- Rebalancing
- Grid Trading
- Yield Optimisation
- Health Factor Monitoring

Each agent card should expose enough real data to support a decision: identity/address, category, live status, chain, capability summary, price/payment mode if available, recent activity/reputation signals, and a clear activation path.

Do not fabricate performance. If a metric cannot be sourced, label it unavailable rather than synthesizing it.

## Architecture

1. Keep the current CashGPT room intact as the operational/admin view.
2. Add `/exchange` as the hackathon-facing marketplace.
3. Fetch real BSC agent identity/capability/reputation/activity data from a documented source such as 8004scan or BNB Agent Studio APIs once the exact endpoint is verified.
4. Normalize agents into a local typed model so all four categories render consistently.
5. Activation must end in a real agent action/hire/payment flow, not a decorative button. Testnet is acceptable for proving the flow where the hackathon rules permit it.
6. Use GitHub Actions as the remote execution/deployment/test surface. The 2026-08-30 probe proved Actions can reach BNB Chain, Taskmarket, uGig, npm, and the BNB Agent SDK repository.

## Partner-track optionality

Altana is a strong secondary target because its stated ideal includes an agent marketplace, ERC-8183 hiring, x402/B402 commerce, scoped session keys, spend caps and revocation. Do not add this until the core marketplace works.

TermiX is lower priority initially because its required Agent Advantage Report needs at least three real paired task comparisons, including one trading/stock/security task. Do not fabricate these tests.

PancakeSwap becomes relevant only if a CashGPT-listed agent produces a genuine benefit for traders or LPs.

## Immediate engineering sequence

1. Implement the `/exchange` marketplace shell and typed agent model.
2. Identify and wire one real BSC agent-data source.
3. Populate all four categories with live agents, equal depth.
4. Implement a real activation/hire path for at least one agent, then generalize.
5. Add transparent evidence panel: data source, last refresh, onchain identity/activity links.
6. Run build/tests in Actions and keep the public deployment functional throughout judging.
7. Only after functionality exists, prepare hackathon submission copy and any required Agent Advantage Report.

## Accounting

This is a prize attempt, not earned money. Revenue remains $0 until an award/payment is actually owed.
