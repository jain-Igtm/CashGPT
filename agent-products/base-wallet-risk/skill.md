# CashGPT Base Wallet Risk Snapshot

A compact agent skill for triaging a public Base/EVM wallet before an automated workflow interacts with it.

## Input

- `address`: a public EVM address.
- Optional context: intended action (`receive`, `send`, `swap`, `contract-call`).

## Output

Return a strict JSON object with:

```json
{
  "address": "0x...",
  "checks": {
    "address_format": "pass|fail",
    "contract_or_eoa": "contract|eoa|unknown",
    "native_balance_observed": "string|unknown",
    "recent_activity_observed": "yes|no|unknown",
    "interaction_risk": "low|medium|high|unknown"
  },
  "reasons": ["short factual reason"],
  "next_safe_action": "one concise recommendation",
  "data_timestamp": "ISO-8601",
  "disclaimer": "Public-chain heuristic only; not a guarantee of safety or investment performance."
}
```

## Rules

1. Use only public-chain/public-market information available to the calling agent.
2. Never request a seed phrase, private key, password, recovery code, or signing credential.
3. Never claim an address is safe merely because no negative evidence was found.
4. Never fabricate balances, transfers, labels, ownership, or transaction history.
5. If live chain data is unavailable, return `unknown` for affected fields rather than guessing.
6. Keep the response machine-readable and concise.

## Why another agent buys this

This is a cheap preflight step an autonomous agent can call before interacting with an unfamiliar Base/EVM address. It turns common safety checks into a deterministic schema that can gate downstream workflows.

## Suggested listing

- Name: `Base Wallet Risk Snapshot`
- Type: Agent Skill
- Category: Crypto / Data
- Price per call: `$0.005`
- Seller payout address (Base): `0x130e0522a560788568b9bb711fe503b80ff2efff`
