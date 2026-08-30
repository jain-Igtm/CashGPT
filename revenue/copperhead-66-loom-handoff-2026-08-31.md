# Copperhead #66 — Loom current-main handoff

Upstream target: `copperheadhq/copperhead#66`
Current upstream `main`: `060f92f40475fd3fbf29e13bc1815de79111961e`

## Verified current-main state

`src/commands/create.ts` still imports `exportSvg, runErc` from `../kicad/cli.js`; stage 5 (`layout-draft`) currently returns complete when the configured board exists, contains a footprint, and `docs/LAYOUT.md` contains `## Draft quality`. Its resume predicate does not call DRC. This is the unfinished #23 durable-resume contract, not a new issue.

Stage 4 on current main is already hardened around symbols, drift, ERC, legibility, and deterministic intent re-draft equivalence. Do not revive obsolete July raw-schematic-edit fixes.

## Minimal patch candidate — only apply after reproduction/evidence

```diff
diff --git a/src/commands/create.ts b/src/commands/create.ts
--- a/src/commands/create.ts
+++ b/src/commands/create.ts
@@
-import { exportSvg, runErc } from '../kicad/cli.js';
+import { exportSvg, runDrc, runErc } from '../kicad/cli.js';
@@
       const p = path.join(root, config.board);
       if (!existsSync(p)) return false;
       if (!(await readFile(p, 'utf8')).includes('(footprint')) return false;
-      return docHasContent(root, path.join(docs, 'LAYOUT.md'), '## Draft quality');
+      if (!(await docHasContent(root, path.join(docs, 'LAYOUT.md'), '## Draft quality'))) return false;
+      return (await runDrc(p)).ok;
     },
```

Semantics: require DRC `ok`; do **not** require `unrouted === 0` at stage 5. Issue #252 intentionally separates `unconnected_items` into the `unrouted` bucket for draft layout; zero-unrouted belongs at the later fab-release/export gate.

## Focused regression design

Do not add another broad mock-only #66 suite. Add the narrowest test in the existing create/resume test surface that can exercise `STAGES.find(s => s.name === 'layout-draft').isComplete`:

1. Build a temp repo with `.copperhead/config.json` pointing at a board, a board text containing at least one `(footprint`, and `docs/LAYOUT.md` containing `## Draft quality`.
2. Mock `runDrc(boardPath)` to return `{ ok: false, ... }`; assert stage 5 `isComplete(...) === false`.
3. Same repo, mock DRC clean; assert stage 5 `isComplete(...) === true`.
4. If the project test harness makes module mocking brittle, test the resume behavior one level higher instead: seed an apparently complete stage-5 tree, make DRC fail through the existing KiCad test fixture, and assert the create pipeline does not auto-commit/advance past layout-draft.

## Acceptance run still required

The bounty is not won by this patch alone. Highest-priority unmet acceptance evidence remains a genuine current-main non-trivial 8-stage run using `examples/medium/esp32-soil-sensor.md`, process exit 0, all eight stage commits, and `.copperhead/runs/*` evidence. Record DRC `unrouted` separately. If outputs are generated while unrouted remains nonzero, reference #252 rather than inventing a new issue.

For every actual live-run blocker: reproduce -> minimal fix -> focused regression -> resume same run. Do not preemptively broaden scope.

## Runtime/eligibility blockers observed by Loom

The connected GitHub installation reports `pull:true`, `push:false` for `copperheadhq/copperhead`. Jane's account currently has no installed `jain-Igtm/copperhead` fork and this GitHub connector exposes no fork-creation action. The local container also cannot resolve `github.com`, so it cannot clone/run the repo from the shell. A runtime with a writable fork plus KiCad/provider access is therefore needed for implementation/live-run evidence.

The maintainer has not yet answered `jain-Igtm`'s current eligibility question. A July comment narrowed the then-active race to two named users, while the issue body still says first mergeable PR wins. Do not claim payout eligibility until the maintainer answers.
