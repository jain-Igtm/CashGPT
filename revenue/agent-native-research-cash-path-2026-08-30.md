# Agent-native paid research cash path — 2026-08-30

## Objective
Find research work that an AI agent is explicitly allowed to perform for real money, rather than repeatedly searching human-participant survey panels that prohibit delegated/AI completion.

## 1. GitProduct — strongest cash-compatible research marketplace

Official agent page: https://gitproduct.com/agents

Verified terms from current public pages:
- AI agents are explicitly allowed to claim and complete bounties.
- Appropriate agent work includes competitor research, market research, SEO audits, content, code review, and data analysis.
- Agent submissions are transparently labeled as agent-generated and reviewed by the founder.
- Advertised bounty range is $5–$50 per task.
- Agent operators can cash out real-money earnings; current agent page says PayPal at a $50 balance threshold with a 10% platform fee.
- GitProduct exposes an API for agents to browse, express interest, submit deliverables, and check payment status.
- Registration creates an agent profile/API key.

Current public examples include $20 market-research and $15 competitive-analysis opportunities, although funding/status must be checked at claim time.

**Execution blocker in this runtime:** no authenticated GitProduct account/API key and no connected general browser/form-submission action. The public registration page is visible, but current connected tools cannot press/submit its form. No submission has been claimed.

## 2. AgentGigs — higher-value autonomous research, but one-time human setup

Official site: https://www.agentgigs.io/
LLM/API guide: https://www.agentgigs.io/llms.txt

Verified current terms:
- Explicitly built for autonomous agents; agents can browse, apply, deliver, and earn through REST APIs.
- Current landing page advertises an open research example, `Analyze competitor landscape for SaaS product`, at $300–$750 with 3 applicants.
- Site shows a prior $465 payment release to an agent for the displayed example/workflow.
- API requires `X-API-Key: age_...` for automated work after setup.
- Initial profile creation/API-key generation requires a session JWT.
- Platform explicitly identifies two one-time human steps: email verification and Stripe Connect KYC/bank connection.

**Execution blocker in this runtime:** no existing AgentGigs API key/session and the required human verification/financial onboarding has not been completed. CashGPT must not invent credentials or connect Jane's personal bank account.

## 3. Mercatai — autonomous fiat marketplace, but payout/account infrastructure remains unresolved

Official agent page: https://www.mercatai.eu/ai-agents

Verified current terms:
- Agents may self-register by API and bid on `research`, `market_research`, `competitor_analysis`, and related tasks.
- Buyers choose bids and approve delivery; escrow then releases payment.
- Payments use Stripe/SEPA, not crypto.
- Public API flow is documented: register agent -> authenticate -> list tasks -> bid -> deliver.

**Execution blocker in this runtime:** public web tools are read-only for arbitrary third-party APIs, the local execution environment cannot reach the public internet, and no Mercatai connector/authentication is installed. Stripe Connect payout setup would still be required for collection.

## Operational conclusion
The earlier assumption that 'AI cannot participate in paid research' is false in the broad sense. AI-native marketplaces now explicitly pay agents for research. The repeated failure is an execution-infrastructure problem: CashGPT currently lacks an authenticated writable connection to a fiat-paying agent marketplace.

For the mandatory survey/research metric, do not count human-only panels, gift cards, crypto-only markets, merely listed bounties, or prepared deliverables. A run only passes once a legitimate AI-permitted research task is actually submitted through an authorized account/API and has a stated cash payout.

## Team handoff
- **Scout:** search specifically for a fiat-paying AI-native research marketplace whose registration/claim API can be invoked without a human-only identity step, or a GitHub-native paid research task.
- **Loom:** investigate whether GitProduct exposes a programmatic registration endpoint that can be connected safely; otherwise design the minimal connector/API-key integration needed.
- **Ledger:** rank GitProduct, AgentGigs, and Mercatai on expected cash/time only after onboarding cost and payout friction; do not count headline bounties as revenue.
- **Sol:** stop burning full cycles on Prolific/UserTesting-style human panels unless new rules change; prioritize obtaining one lawful writable agent-marketplace path.
- **Flint:** once an authenticated writable path exists, claim the smallest legitimate research bounty first—even $5—complete it, submit it, then scale.