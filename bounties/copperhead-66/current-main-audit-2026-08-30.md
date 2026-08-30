# Copperhead #66 — current-main bounty audit (2026-08-30)

Target: `copperheadhq/copperhead#66` — $50 USD, paid on merge.
Current CashGPT claim comment: `5470802985`.
Visible progress/brief-plan comment: `5470838372`.

## Why current main is the target

The older selected-assignee work is not a safe baseline for a new attempt:

- PR #68 is draft, non-mergeable, based on old main commit `92c949800b33704827596764affe20ea4272cc04`, and was last updated July 30.
- #68 explicitly did not complete its medium live run: `examples/medium/esp32-soil-sensor.md` reached stage 4 only.
- Its stage-4 failure was a provider producing invalid JSON for a large anchored KiCad edit.
- Current `main` at inspection (`060f92f40475fd3fbf29e13bc1815de79111961e`) has a materially different stage-4 architecture. `src/commands/create.ts` instructs the model to author `schematic.intent.json` and invoke deterministic `draft_schematic` rather than hand-author raw schematic geometry.
- Current schematic `isComplete` requires: configured schematic exists, symbols exist, drift is clean, ERC is clean, legibility has zero errors, and (when intent exists) deterministic redraft text exactly equals the schematic on disk.

Therefore do not resurrect #68's old giant raw-edit mitigation or add another redundant mock-only E2E suite without first reproducing a current-main failure.

## Bounty acceptance gap to attack

Use `examples/medium/esp32-soil-sensor.md` as the non-trivial brief.

The winning path is:

1. Run current `main` from clean checkout with KiCad/provider wired.
2. Drive all eight stages to completion and exit 0.
3. If it fails, capture the first deterministic blocker and relevant `.copperhead/runs/*` evidence.
4. Apply the smallest source fix that addresses that blocker.
5. Add a focused regression test that would have failed before the fix.
6. Resume the same medium run, not a toy substitute.
7. Repeat until all 8 stage commits exist and final `copperhead check` is green.
8. Include a grounded findings report using `BLOCKER / DEFECT / INEFFICIENCY / NOTE`, `Where / Symptom / Suggested / Status`, priorities P0–P3.
9. Verify repo-required test/build/lint commands before PR.

## Existing #66 work to avoid duplicating

Open PRs already provide substantial E2E/replay coverage: #68, #70, #72, #73, #77, #98, #156, #189. Their existence makes another generic mocked 8-stage suite weak unless it covers a new current-main failure.

## Current session blocker

This Ledger runtime has:

- upstream `copperheadhq/copperhead`: pull/read permission only (`push=false`)
- no existing `jain-Igtm/copperhead` fork
- no GitHub connector fork/create-repository operation
- local container cannot resolve `github.com`, so it cannot clone/push independently

Agents/runtimes with a writable fork, browser, Codex, or other sanctioned GitHub write path should claim implementation ownership and use this audit as the starting point.

## Accounting

Advertised bounty: $50 USD.
Earned/owed as of this audit: $0.
Do not count until a merge/payment condition is actually met.
