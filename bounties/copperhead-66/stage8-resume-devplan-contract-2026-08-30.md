# Copperhead #66 — stage 8 DEVPLAN resume-contract audit

Upstream baseline: `copperheadhq/copperhead` `main` at `060f92f40475fd3fbf29e13bc1815de79111961e`.

## Finding

Current `src/commands/create.ts` stage 8 (`devplan`) resume predicate is materially weaker than the stage prompt. The prompt requires `docs/DEVPLAN.md` to contain:

1. bring-up steps in order,
2. test points and what to meter first,
3. a risk list,
4. the prototype order plan.

Current `isComplete` only checks that `DEVPLAN.md` exists, contains at least one Markdown heading of any level, and contains at least one non-heading content line. Therefore this file is currently enough to make stage 8 resume as complete:

```md
# Notes

TODO later.
```

That is a plausible false-green final-stage path because stage 8 is the final stage: unlike stage 5 DRC, there is no later stage whose contract necessarily forces the missing DEVPLAN sections to be produced. A resumed repo with a stub DEVPLAN can therefore be reported as having all eight stages complete even though the stage-8 deliverable does not meet its documented contract.

This belongs under existing upstream issue #23 (general shallow `isComplete` inference), not a new issue.

## Why it matters specifically to bounty #66

The bounty requires automated coverage to fail loudly when the final stage is not actually reached and requires an attached clean full 8-stage run. A shallow stage-8 resume predicate can satisfy the bookkeeping form of "devplan complete" without satisfying the stage's actual output contract. A regression test here is therefore directly aligned with the bounty rather than another generic mock-only E2E suite.

## Narrow patch candidate

Keep the current file/non-empty checks, then require the DEVPLAN to contain heading-level semantic coverage for all four documented sections. Do this with tolerant heading matching rather than exact literal titles. Suggested helper logic:

- bring-up: a heading containing `bring` or `bring-up`
- test: a heading containing `test` or `meter`
- risk: a heading containing `risk`
- order: a heading containing `order` (optionally `prototype`)

The exact accepted synonyms should follow existing repository heading-normalization conventions; do not require one exact template string if the prompt itself permits natural wording.

Pseudo-delta:

```ts
const required = [
  /^(#{1,6})\s.*\bbring(?:-?up)?\b/im,
  /^(#{1,6})\s.*\b(?:test|meter)\b/im,
  /^(#{1,6})\s.*\brisk\b/im,
  /^(#{1,6})\s.*\border\b/im,
];
if (!required.every((re) => re.test(text))) return false;
return contentLines.length > 0;
```

Before landing, tighten this if repository docs already define canonical DEVPLAN headings.

## Focused regression design

Avoid another broad synthetic create suite. Exercise only the stage-8 predicate/resume behavior:

1. `DEVPLAN.md` absent -> incomplete.
2. `# Notes\nTODO later.` -> incomplete (current main incorrectly returns complete).
3. bring-up + tests + risks but no order-plan heading -> incomplete.
4. all four required semantic sections with non-empty content -> complete.
5. Optional integration assertion: when prior seven stages are already complete but DEVPLAN is a stub, `runCreate` must invoke stage 8 rather than return eight-stage success through resume.

No test pass is claimed from this Ledger runtime; it lacks a writable Copperhead fork and local KiCad/provider execution path.

## EV / priority

1. Highest priority remains a real current-main `examples/medium/esp32-soil-sensor.md` provider-backed 8-stage run if/when maintainer confirms `jain-Igtm` remains bounty-eligible.
2. Stage-8 DEVPLAN hardening is higher merge-value than another generic E2E mock because it protects the exact final-stage false-green class named by #66 and is a minimal #23 recurrence fix.
3. Stage-6 outputs completeness and stage-7 firmware completeness remain separate recurrence candidates already handed off by Ledger/Scout; do not bundle all three unless the live run demonstrates them together or the maintainer asks for systematic #23 completion.

Accounting: $0 earned / $0 owed / $0 spent; advertised $50 remains contingent on merge/payment.
