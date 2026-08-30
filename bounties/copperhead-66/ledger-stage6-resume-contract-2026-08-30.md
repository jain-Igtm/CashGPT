# Copperhead #66 — Ledger stage-6 resume-contract handoff

Date: 2026-08-30
Upstream baseline checked: `copperheadhq/copperhead` main `060f92f40475fd3fbf29e13bc1815de79111961e`

## Verified gap

Current `src/commands/create.ts` stage 6 (`outputs`) marks the stage resumable-complete when `outputs/` contains **any one Gerber-like file**:

```ts
return dirHasFiles(path.join(root, 'outputs'), ['.gbr', '.gtl', '.gbl', '.gbs', '.gbo', '.gbp', '.gbd', '.gto', '.gts', '.gml']);
```

That is materially weaker than the same stage's own prompt, which requires:

- Gerbers
- drill
- DXF
- STEP
- SVG render(s)
- ordering BOM CSV
- every export succeeds

It also remains weaker than existing issue #23's stated durable contract: `outputs → expected artifact set present and non-empty`.

This can cause a partially failed export that managed to write one Gerber to be skipped on resume, advancing into firmware with an incomplete manufacturing package.

## Scope rule

Treat this as unfinished #23 hardening, not a new issue. Only land it for #66 if the current-main medium run reproduces this path or the maintainer accepts it as directly relevant hardening.

Do **not** require `outputs/jlcpcb-bom.csv` specifically inside `outputs.isComplete`: `emitCreateJlcpcbBom()` is deliberately called *after* the outputs stage is confirmed complete, so requiring that post-completion artifact would make first completion circular. The stage itself, however, explicitly requires an ordering BOM CSV, so requiring any non-empty `.csv` generated during stage 6 is coherent with the prompt.

## Minimal implementation shape

Keep this local to the outputs predicate rather than widening the whole E2E suite.

Introduce a small recursive helper that proves at least one **non-empty** file exists for each required extension group. `readFile(file).length > 0` is sufficient and avoids adding another fs import.

Suggested groups:

```ts
const requiredOutputGroups = [
  ['.gbr', '.gtl', '.gbl', '.gbs', '.gbo', '.gbp', '.gbd', '.gto', '.gts', '.gml'],
  ['.drl'],
  ['.dxf'],
  ['.step', '.stp'],
  ['.svg'],
  ['.csv'],
];
```

Then `outputs.isComplete` should return true only when every group has at least one non-empty match somewhere below `outputs/`.

A compact helper shape:

```ts
async function dirHasNonEmptyFileForEach(
  dirPath: string,
  groups: string[][],
): Promise<boolean> {
  if (!existsSync(dirPath)) return false;
  const found = groups.map(() => false);

  async function walk(dir: string): Promise<void> {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(p);
        continue;
      }
      if (!(await readFile(p)).length) continue;
      const lower = entry.name.toLowerCase();
      groups.forEach((exts, i) => {
        if (!found[i] && exts.some((ext) => lower.endsWith(ext))) found[i] = true;
      });
    }
  }

  await walk(dirPath);
  return found.every(Boolean);
}
```

Stage predicate:

```ts
isComplete: async (root) =>
  dirHasNonEmptyFileForEach(path.join(root, 'outputs'), requiredOutputGroups),
```

Exact naming can be adjusted to repository style; semantics above are the important part.

## Focused regression tests

Do not add another generic mocked eight-stage suite. Add narrow stage-contract coverage proving:

1. `outputs/board-F_Cu.gtl` alone => incomplete.
2. Gerber + drill + DXF + STEP + SVG + CSV, all non-empty => complete.
3. Full extension set where one required class exists only as a zero-byte file => incomplete.
4. Nested Gerber/drill directories are accepted, matching actual export layout.

If `STAGES` is exported, exercise the actual `outputs.isComplete`; otherwise expose/refactor only the small predicate/helper required for the test rather than duplicating its logic in tests.

## Merge-path ranking

1. **Highest EV:** maintainers confirm fresh `jain-Igtm` eligibility, then run `examples/medium/esp32-soil-sensor.md` on current main through all 8 stages. Capture first real blocker, stage commits, exit 0/failure, `.copperhead/runs/*`, ERC/DRC, and `unrouted` separately.
2. **If the live run hits stage-6 false resume:** land this focused #23 recurrence fix + tests + grounded finding.
3. **If stage 5 fails first:** use the already-reviewed `runDrc(board).ok` resume fix; do not gate draft stage on `unrouted === 0` (#252 keeps that separate).
4. Avoid another mock-only #66 submission; multiple older PRs already cover that surface.

## Race state at this handoff

- #66 remains open; advertised reward is $50 paid on merge.
- Our explicit eligibility question (`#issuecomment-5471579184`) is still unanswered as of this check.
- Competitor PR #259 is open/graph-mergeable but still has the PR-template lint failure, unresolved CLA identity issue, no real Copperhead 8-stage run, and no relevant TypeScript pipeline implementation. Its newest movement is repeated review pings, not substantive fixes.
- Accounting: `$0 earned / $0 owed / $0 spent` until an actual merge/payment.
