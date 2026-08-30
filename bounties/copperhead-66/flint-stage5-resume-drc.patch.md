# Copperhead #66 — Flint stage-5 resume DRC patch handoff

Base audited: `copperheadhq/copperhead@060f92f40475fd3fbf29e13bc1815de79111961e`.

Status: **static-analysis patch candidate, not runtime-verified**. Upstream branch creation from this connector was attempted and failed with GitHub 403 `Resource not accessible by integration`, so this file is a copy/paste handoff for any runtime with a writable fork.

## Why this is narrow and current-main specific

`STAGES[4]` (`layout-draft`) currently declares resume completion from three markers only: configured board path exists, board text contains `(footprint`, and `docs/LAYOUT.md` contains `## Draft quality`. `runCreate()` treats any `stage.isComplete()` result as authoritative on resume, calls `commitResumedStage()`, records the stage complete, and continues without running the normal agent finish gate. A hard stop after placement/doc edits but before a DRC-clean finish can therefore plausibly resume past stage 5.

Stage 4 already demonstrates the intended pattern: its resume predicate re-runs ERC before returning true.

## Minimal source change

```diff
diff --git a/src/commands/create.ts b/src/commands/create.ts
--- a/src/commands/create.ts
+++ b/src/commands/create.ts
@@
-import { exportSvg, runErc } from '../kicad/cli.js';
+import { exportSvg, runDrc, runErc } from '../kicad/cli.js';
@@
     name: 'layout-draft',
     isComplete: async (root, docs) => {
@@
       const p = path.join(root, config.board);
       if (!existsSync(p)) return false;
       if (!(await readFile(p, 'utf8')).includes('(footprint')) return false;
-      return docHasContent(root, path.join(docs, 'LAYOUT.md'), '## Draft quality');
+      if (!(await docHasContent(root, path.join(docs, 'LAYOUT.md'), '## Draft quality'))) return false;
+      if (!(await runDrc(p)).ok) return false;
+      return true;
     },
```

Do **not** add `unrouted === 0` to this patch without reproducing that requirement against current project semantics. Existing upstream issue #252 separately documents that nominal DRC-clean boards can still have unrouted connections; #66 live evidence should capture that count, but conflating #252 with this resume-gate regression would expand scope unnecessarily.

## Focused regression

Add a focused test around the exported `STAGES` array rather than another mock-only full-pipeline suite:

1. Build a temp repo/config whose configured board file contains at least one `(footprint` marker.
2. Add `docs/LAYOUT.md` containing `## Draft quality`.
3. Mock `runDrc(boardPath)` to return a report with `ok: false`.
4. Resolve `STAGES.find(s => s.name === 'layout-draft')` and assert `await stage.isComplete(root, 'docs') === false`.
5. Flip mocked DRC to `ok: true` and assert the same fully-populated/documented fixture becomes complete.
6. Keep a separate assertion that missing board, missing footprint, or missing Draft quality marker remains incomplete, preserving current behavior.

If direct ESM mocking of `../kicad/cli.js` is awkward in the existing Vitest setup, use a real minimal `.kicad_pcb` fixture that produces a deterministic DRC violation; do not weaken the test into checking only that `runDrc` was called.

## Additional resume-path observation for later validation

Stage 6 (`outputs`) currently treats the stage complete when `outputs/` contains **any one** Gerber-like file even though its stage contract says every export must succeed. Because the same resume fast-path auto-commits and advances, an interrupted partial export can plausibly false-green stage 6. Do not patch this speculatively for #66; first reproduce it in the required live 8-stage run and record it in findings if observed.
