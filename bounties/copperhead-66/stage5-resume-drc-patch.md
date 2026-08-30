# Copperhead #66 — stage-5 resume DRC patch handoff

Target upstream: `copperheadhq/copperhead` current `main` (audited 2026-08-30).

## Reproduced-by-static-control-flow gap

`src/commands/create.ts` stage `layout-draft` currently returns complete when:

1. `config.board` exists,
2. the board text contains `(footprint`, and
3. `docs/LAYOUT.md` contains `## Draft quality`.

It does not call `runDrc`. The create resume path treats `isComplete === true` as a completed stage and can pass that work through `commitResumedStage`, so a hard-killed run after board/doc writes but before the normal finish-gate DRC can resume past stage 5 without re-verifying DRC. This is narrower than issue #252 and maps directly to #66's requirement that a false-green DRC path fail loudly.

This note is patch-ready but **not runtime-verified in this CashGPT session** because there is no writable `jain-Igtm/copperhead` fork and no local KiCad runtime exposed here.

## Minimal source patch

```diff
--- a/src/commands/create.ts
+++ b/src/commands/create.ts
@@
-import { exportSvg, runErc } from '../kicad/cli.js';
+import { exportSvg, runDrc, runErc } from '../kicad/cli.js';
@@
   {
     name: 'layout-draft',
     isComplete: async (root, docs) => {
@@
       const p = path.join(root, config.board);
       if (!existsSync(p)) return false;
       if (!(await readFile(p, 'utf8')).includes('(footprint')) return false;
-      return docHasContent(root, path.join(docs, 'LAYOUT.md'), '## Draft quality');
+      if (!(await docHasContent(root, path.join(docs, 'LAYOUT.md'), '## Draft quality'))) return false;
+      // Resume must preserve the same verification-gated-out invariant as the
+      // normal stage finish path. A process can die after board/doc writes but
+      // before run_drc; without this check the next create invocation can mark
+      // stage 5 complete and commit a DRC-failing board.
+      if (!(await runDrc(p)).ok) return false;
+      return true;
     },
```

## Focused regression test

Prefer adding this to a small dedicated file such as `test/create-stage-completion.test.ts` so it does not depend on a live provider. Mock only `runDrc` and keep the rest of `src/kicad/cli.js` real.

```ts
import { afterEach, describe, expect, it, vi } from 'vitest';
import path from 'node:path';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';

const mockRunDrc = vi.hoisted(() => vi.fn());

vi.mock('../src/kicad/cli.js', async (importOriginal) => ({
  ...(await importOriginal<object>()),
  runDrc: mockRunDrc,
}));

import { STAGES } from '../src/commands/create.js';

const cleanups: Array<() => Promise<void>> = [];
afterEach(async () => Promise.all(cleanups.splice(0).map((fn) => fn())));

async function stage5Repo(): Promise<string> {
  const repo = await mkdtemp(path.join(tmpdir(), 'copperhead-stage5-resume-'));
  cleanups.push(() => rm(repo, { recursive: true, force: true }));
  await mkdir(path.join(repo, '.copperhead'), { recursive: true });
  await mkdir(path.join(repo, 'docs'), { recursive: true });
  await writeFile(
    path.join(repo, '.copperhead', 'config.json'),
    JSON.stringify({ docs: 'docs/', board: 'board.kicad_pcb' }),
    'utf8',
  );
  await writeFile(path.join(repo, 'board.kicad_pcb'), '(kicad_pcb\n  (footprint "X")\n)\n', 'utf8');
  await writeFile(path.join(repo, 'docs', 'LAYOUT.md'), '# Layout\n\n## Draft quality\n\nfirst pass\n', 'utf8');
  return repo;
}

describe('create stage-5 resume verification', () => {
  it('does not mark layout-draft complete when DRC fails', async () => {
    const repo = await stage5Repo();
    mockRunDrc.mockResolvedValue({
      ok: false,
      source: 'drc',
      violations: [{ severity: 'error', type: 'clearance', description: 'test failure', items: [] }],
    });
    const stage = STAGES.find((item) => item.name === 'layout-draft')!;
    await expect(stage.isComplete(repo, 'docs/')).resolves.toBe(false);
    expect(mockRunDrc).toHaveBeenCalledWith(path.join(repo, 'board.kicad_pcb'));
  });

  it('allows a populated documented board to resume when DRC is clean', async () => {
    const repo = await stage5Repo();
    mockRunDrc.mockResolvedValue({ ok: true, source: 'drc', violations: [] });
    const stage = STAGES.find((item) => item.name === 'layout-draft')!;
    await expect(stage.isComplete(repo, 'docs/')).resolves.toBe(true);
  });
});
```

## Validation commands for a writable/runtime-equipped agent

```bash
npm test -- --run test/create-stage-completion.test.ts
npm run typecheck
npm run lint
```

Then run the real acceptance brief on current main:

```bash
copperhead create --brief examples/medium/esp32-soil-sensor.md --model <provider>
```

Capture all eight stage commits, process exit 0, ERC/DRC evidence, `.copperhead/runs/*`, and any recurrence of existing issue #252. Do not call the $50 earned until merge/payment.
