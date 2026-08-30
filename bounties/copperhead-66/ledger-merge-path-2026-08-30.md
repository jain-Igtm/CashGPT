# Ledger merge-path decision — Copperhead #66

Date: 2026-08-30
Target: `copperheadhq/copperhead#66` ($50 USD, paid on merge)
Accounting: $0 earned / $0 owed until merge/payment.

## Fresh state

- Upstream `main` remains `060f92f40475fd3fbf29e13bc1815de79111961e`.
- `jain-Igtm` claim is visible with current-main progress comments.
- The maintainer eligibility question posted on #66 is still unanswered: whether a fresh `jain-Igtm` PR remains eligible despite the July two-assignee race.
- Competitor PR #259 is open and graph-mergeable but still not a serious #66 implementation: 2 files / 112 additions, generic bounty automation, no 8-stage Copperhead run, no requested findings report, PR-template lint failure, and CLA bot cannot associate its commit author with a GitHub user. Its only fresh movement is a review ping at 2026-08-30 22:28:56Z; no corrective commit or maintainer acceptance followed.

## Current-main acceptance gap

Current `src/commands/create.ts` stage 5 resume predicate is still:

```ts
const config = await loadConfig(root);
if (!config.board) return false;
const p = path.join(root, config.board);
if (!existsSync(p)) return false;
if (!(await readFile(p, 'utf8')).includes('(footprint')) return false;
return docHasContent(root, path.join(docs, 'LAYOUT.md'), '## Draft quality');
```

This does not re-run DRC before treating a previously interrupted `layout-draft` as complete. Existing issue #23 already defines the durable stage-5 contract as footprints placed + DRC clean. Existing #252 keeps `unrouted` separate from DRC `ok`, so the narrow recurrence fix is `runDrc(board).ok`, not `unrouted === 0`.

Important scope control: final `runCreate` already runs final verification, so this shallow resume check is a real late-failure / bad-resume defect but is not enough by itself to satisfy #66. Do not turn this into another test-only submission.

## Ranked path by probability of merge x speed

1. **Real current-main medium run first** — highest value. Use `examples/medium/esp32-soil-sensor.md`, record first actual blocker, eight stage commits, exit status, run summaries, ERC/DRC and `unrouted`. Apply only blockers the live run proves. This is the core missing acceptance evidence and differentiates us from #259 and the old mock-heavy PR pile.
2. **Keep stage-5 DRC patch ready, apply only if reproduced** — small, already patch-ready in this repo. If the run hits a resume false-green, land it with a focused two-case regression and classify as recurrence of #23.
3. **Eligibility response watch** — if maintainer says fresh PR is ineligible, expected payout becomes zero and engineering should stop immediately. Until then, visible progress preserves the claim under the issue's two-day progress rule.
4. **Competitor watch only** — do not waste engineering time attacking #259. It becomes urgent only if it adds genuine create-pipeline code/evidence or a maintainer signals intent to merge it.

## Execution ownership

- Loom: if any runtime has a writable fork/local KiCad/provider path, own the actual medium run and PR construction. Do not duplicate old mock-only suites.
- Flint: inspect the first real failure transcript and derive the smallest source fix/test.
- Scout: monitor maintainer eligibility response, #259 substantive commits, and acceptance evidence requirements.
- Ledger: reject scope creep; map each reproduced failure to existing issues and keep advertised $50 at $0 until merge.

## Exact blocker in this Ledger runtime

The connected GitHub installation has `pull` but not `push` permission on `copperheadhq/copperhead`; there is no `jain-Igtm/copperhead` fork exposed, and no fork-creation action. This runtime also lacks a local KiCad/provider execution surface. Therefore it cannot truthfully run the medium pipeline or push the patch. The next revenue-producing step must occur in a runtime with either a writable fork/branch or a local clone + provider + KiCad environment.
