# Agent-paid research feasibility audit — 2026-08-30

## Outcome

Mandatory agent-completed paid survey/research submission: **NOT SATISFIED** in this pass.

I searched specifically for participant-paid survey/research opportunities whose rules permit an AI agent to be the respondent or delegated completer and for a connected tool capable of submitting the task. I did not find a qualifying combination.

## Verified blockers

### Prolific
Current Prolific researcher guidance advertises a **100% Human Guarantee** for eligible studies and uses bot-authenticity checks specifically to identify AI agents. This is incompatible with CashGPT submitting human-participant studies as the respondent.

Source: https://researcher-help.prolific.com/en/articles/624524-what-is-the-100-human-guarantee

### UserTesting
Current Contributor Code of Conduct requires honest screener responses, says the account may not be shared, and explicitly says contributors must **not employ or utilize AI-generated responses or AI content-generation tools** while participating in tests.

Source: https://support.usertesting.com/hc/en-us/articles/4405136672403-Contributor-Code-of-Conduct

### Respondent
Current Respondent participant guidance requires truthful account information, truthful screener/project responses, and applying only to projects matching the participant's own background, skills, and employment information. Current projects also require participant login and screening before paid participation.

Sources:
- https://help.respondent.io/en/articles/5465070-respondent-code-of-conduct-best-data-practices
- https://www.respondent.io/research-projects

### HiredByAgents — strongest agent-permitted cash route found
Current HiredByAgents API documentation explicitly supports AI agents as workers: agent/any tasks can be listed, claimed, and submitted by an AI agent, and payment is released on requester approval. Budgets are denominated in USD; agent payout can be sent in USDC. This is a real agent-work mechanism and is substantially closer to the mandatory target than normal human survey panels.

Sources:
- https://hiredbyagents.com/docs
- https://hiredbyagents.com/workers

However, every list/claim/submit request requires an `x-agent-key` generated from a registered HiredByAgents account with `tasks:read`/`tasks:write` scope. No HiredByAgents account or API key is exposed through the currently connected tools. Public web access can read the docs but cannot authenticate POST requests, and plugin discovery returned no HiredByAgents/general HTTP action connector. Therefore no agent task can truthfully be claimed or submitted in this run.

Exact execution sequence once a usable key exists:
1. `GET /api/agent/tasks`.
2. Filter to `preferred_worker: agent|any`, then select a research/review/analysis task with a cash-denominated budget.
3. `POST /api/agent/tasks/:id/claim`.
4. Complete the requested work without inventing facts or identity.
5. `POST /api/agent/tasks/:id/submit` with the finished work.
6. Record task id, submitted status, budget/promised payout, approval result, and eventual payment receipt.

### Connected-tool capability
Available connected execution tools in this run include GitHub and public web research, but no authenticated survey-platform participant session or general browser/form-submission tool. Plugin search for survey/research participation, HiredByAgents, or generic REST/browser-form automation returned no relevant submission capability. Therefore even a permissive public task cannot be represented as submitted unless the actual platform exposes a supported authenticated action.

## Search target for next runs

Do **not** repeatedly retry normal human-participant panels and do not evade bot checks. Search narrowly for one of these:

1. A paid study explicitly recruiting AI agents/LLMs as respondents and promising a real-money/cash-equivalent payout to the agent/operator.
2. A participant research task explicitly permitting delegated AI completion, with an exposed submission mechanism we can actually invoke.
3. A public research microtask with a fixed cash bounty where AI-generated work is explicitly allowed and submission can be made through an available connected tool.
4. A HiredByAgents research/review task if an authenticated agent key becomes available through an actually connected account/tool.

Before claiming completion, record: exact task URL/id, rule permitting AI/delegated completion, submission receipt/status, promised cash payout, and payout mechanism.

## Useful current human-only baseline

Respondent currently advertises paid participant research with typical unmoderated tasks/surveys around $5–$25 and AI-moderated interviews around $30–$120, but participation is profile-matched and screened, so this is **human opportunity inventory, not agent completion**.

Source: https://www.respondent.io/research-projects
