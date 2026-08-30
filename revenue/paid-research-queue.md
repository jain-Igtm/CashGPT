# Paid Research Queue — 2026-08-30

Priority: participant-paid research first. Product sales are a fallback.

All eligibility answers must be truthful. Do not fabricate demographics, employment, health status, experience, or device access. `Effective rate` is simple incentive / stated session time and does not include screening/application time.

## Mandatory agent-completable cash track

The current Scout instruction only counts a run as satisfied when an agent itself **submits** a legitimate paid survey/research task whose rules permit AI/delegated participation and whose payout is real money or cash-equivalent. Gift cards, coupons, samples, sweepstakes, and non-cash points do not satisfy that rule.

### Strongest verified platform: HiredByAgents

- Worker page: https://hiredbyagents.com/workers
- API docs: https://hiredbyagents.com/docs
- Platform explicitly permits AI agents to claim tasks marked `preferred_worker: agent` or `any`.
- Agent API supports listing open tasks, claiming one, and submitting completed work.
- Budgets are denominated in USD; platform advertises PayPal, USDC, and Stripe payout paths, with USDC specifically supported for agents.
- **Current blocker:** every task-list/claim/submit endpoint requires an `x-agent-key` generated from a registered HiredByAgents account. No HiredByAgents account/API key is exposed to the current connected tools. The public web/research tool can read pages but cannot authenticate, claim, or submit tasks. Therefore no paid task was submitted in the current Scout pass.
- Status: **MANDATORY COMPLETION REQUIREMENT UNSATISFIED** until an authorized HiredByAgents agent account/API key is connected or another platform exposes an authenticated agent-permitted submission tool.

### Other agent marketplaces checked

- Human4Hire / HumanPing / requesthuman are primarily agent-to-human dispatch systems, not current sources of agent-completable paid survey tasks.
- WURK API offers agents the ability to *purchase* human opinions/polls, which is the opposite side of the transaction and does not create income for CashGPT.
- Conventional survey panels (PaidViewpoint, Respondent, User Interviews, Prolific, etc.) are human-participant systems; their screeners or terms require real participant identity/opinion and therefore must not be completed by Scout as Jane.

## Human-participant queue (does not satisfy agent-completion rule)

These may still be useful for Jane personally, but they are tracked separately because many pay by gift card and/or require Jane's own subjective/personal answers.

| Priority | Opportunity | Incentive | Stated time | Effective rate | Timing | Eligibility / notes | Payout | Apply |
|---|---|---:|---:|---:|---|---|---|---|
| 1 | Give Feedback, Get $100 | $100 | 25 min | ~$240/hr | Live listing | Online self-paced AI-moderated interview; camera required; researcher describes business-needs feedback. Screener determines fit. | Choice of digital gift cards | https://www.userinterviews.com/projects/ONjYEghqIg/apply |
| 2 | Financial Study | $250–$350 | ~90 min | ~$167–$233/hr | Sep 2–10 | Adults 18+; online financial research; exact group/compensation varies by qualification. | Tremendous gift card | https://www.userinterviews.com/projects/bxzIsslTkg/apply |
| 3 | When AI Agents Go Off-Script | $150 | 60 min | $150/hr | Interviews through Sep 4 | People with real experience working with AI agents, diagnosing unexpected behavior/performance and related workflows. Remote Webex. | Choice of digital gift cards | https://www.userinterviews.com/projects/rkvpxeSR-A/apply |
| 4 | New to AI? | $100 | 60 min | $100/hr | Live listing | Broad range of AI experience explicitly welcome. Online; computer + webcam required. | Visa e-gift card | https://www.userinterviews.com/projects/heiS_6gQXg/apply |
| 5 | Inside AI Workflows | $100 | 45–60 min | ~$100–$133/hr | Live listing | People who work with AI prompts/configuration, evaluation/testing, or agentic/multi-step workflows; may screen-share non-sensitive workflow/tooling. | Choice of digital gift cards | https://www.userinterviews.com/projects/cQhH_19suA/apply |
| 6 | Share opinions about payment options | $150 | 105 min | ~$85.71/hr | Sep 1 | Online focus group on payment apps/platforms; computer + webcam required; recorded. Screener determines fit. | Choice of digital gift cards | https://www.userinterviews.com/projects/R3l0-Caqpg/apply |
| 7 | Request for Technology Product Feedback | $100 | 70 min | ~$85.71/hr | Sep 1 or 2 | Online technology feedback; MacOS or Windows computer + webcam; recorded. Screener determines fit. | Choice of digital gift cards | https://www.userinterviews.com/projects/NfGxdr634g/apply |
| 8 | Focus groups about current events | $140 | 150 min | $56/hr | Aug 31–Sep 10 | Members of the public; online Zoom; laptop/desktop + webcam required; many sessions/times. | Virtual gift card incl. Visa/Amazon/etc. | https://www.userinterviews.com/projects/rQF3tGNmQg/apply |

## Cash-paying human research worth monitoring

- Prolific participant page: https://www.prolific.com/participants — real-money participant payouts; studies require the actual participant and therefore Scout cannot answer them as Jane.
- uTest AI Agent Capabilities Study [USA]: https://www.utest.com/projects/AI-Agent-UX-USA — advertised $180 for about 5.5–6 hours, requiring a U.S. tester with specified devices and personal evaluation of AI agents. Human-only for our purposes.
- Respondent research marketplace: https://www.respondent.io/research-projects — paid research, including AI-moderated interviews, but profile/screener participation is tied to the real participant.

## Execution order

1. If a HiredByAgents API key becomes connected, immediately list `preferred_worker: agent|any` tasks, filter for research/survey/analysis tasks with USD budgets, claim the best legitimate task, complete it, submit it, and record the promised payout and status.
2. Until then, continue searching for another agent-permitted cash-paid research platform with a callable authenticated submission route.
3. Keep human-only opportunities available for Jane, but never count them as an agent completion and never fabricate screener answers.

## Status

- Verified revenue from research opportunities: $0 as of this update.
- Paid research tasks submitted by Scout: **0**.
- Mandatory agent-completion requirement: **UNSATISFIED**.
- Exact missing capability: an authenticated submission channel for a platform that both permits AI/delegated participation and pays guaranteed cash/cash-equivalent for the completed research task.