# Copperhead #66 — Ledger stage-5 semantics review

Audited against `copperheadhq/copperhead@060f92f40475fd3fbf29e13bc1815de79111961e` and upstream issues #23 and #252.

Status: **source/acceptance review only; not runtime-tested in this Ledger session.**

## Decision

The prepared stage-5 resume patch should gate on `runDrc(boardPath).ok` only. It should **not** add `unrouted === 0` to `layout-draft.isComplete`.

Why:

1. Issue #23 explicitly names the durable resume contract for stage 5 as `layout-draft → footprints placed + DRC clean`. That supports adding the missing DRC predicate to the current footprint + `## Draft quality` markers.
2. Issue #252 explicitly documents that `normalizeReport` keeps `unconnected_items` in a separate `unrouted` bucket that does not count against `ok`, and says this is **correct for a draft**. Stage 5 is the draft-layout stage.
3. The same #252 issue says the unrouted-zero requirement belongs at the **fab release/export gate**, with an explicit override for deliberately unrouted drafts. Folding it into stage 5 would change the intended draft semantics and broaden #66 beyond the resume false-green fix.

Therefore the minimal stage-5 patch remains:

```diff
-import { exportSvg, runErc } from '../kicad/cli.js';
+import { exportSvg, runDrc, runErc } from '../kicad/cli.js';
@@
       const p = path.join(root, config.board);
       if (!existsSync(p)) return false;
       if (!(await readFile(p, 'utf8')).includes('(footprint')) return false;
-      return docHasContent(root, path.join(docs, 'LAYOUT.md'), '## Draft quality');
+      if (!(await docHasContent(root, path.join(docs, 'LAYOUT.md'), '## Draft quality'))) return false;
+      if (!(await runDrc(p)).ok) return false;
+      return true;
```

## Test-placement review

`test/create-hardening.test.ts` is the best existing home for a focused regression: its header already covers create-pipeline hardening for #19/#21/#23/#25, it uses `tempFixtureRepo()`, and it runs real KiCad checks where necessary. The current test corpus does not appear to use `vi.mock(...)`, so introducing module-level ESM mocking solely for this case is a less compatible first choice than extending the existing hardening style.

Recommended regression shape for a writable/KiCad-capable runtime:

- use `tempFixtureRepo()` and create the minimal current-main stage-5 state (`config.board`, populated `.kicad_pcb`, `docs/LAYOUT.md` with `## Draft quality`);
- ensure the board produces a deterministic DRC failure, then assert exported `STAGES` reports `layout-draft` incomplete;
- repair/replace with a DRC-clean board and assert the same markers may resume complete;
- keep `unrouted` assertions out of this test because #252 deliberately separates that condition from DRC `ok` at draft stage.

If constructing a compact deterministic DRC-failing board from existing fixtures is awkward, a very small helper seam around the DRC completion check is preferable to a broad mock-only end-to-end harness. Do not weaken the test to merely assert that `runDrc` was invoked.

## Merge-path consequence

This patch is still secondary to the bounty's main acceptance target: a genuine current-main `examples/medium/esp32-soil-sensor.md` run through all eight stages with exit 0 and evidence. If that run reproduces stage-5 false resume, cite #23 and land this minimal regression/fix. Separately record `unrouted` in the live evidence; if nonzero outputs are produced, cite #252 as the routing/fab-gate recurrence rather than expanding this stage-5 patch.

Accounting: advertised $50 remains $0 earned / $0 owed until merge/payment.
