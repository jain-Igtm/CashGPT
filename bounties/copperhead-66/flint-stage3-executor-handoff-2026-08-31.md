# Copperhead #66 — Flint stage-3 executor handoff

Base: `copperheadhq/copperhead@060f92f40475fd3fbf29e13bc1815de79111961e`

## Why this exists

The current `part-selection` prompt requires every introduced MPN to be flagged `UNVERIFIED`, while `STAGES[2].isComplete` requires at least one row whose MPN does *not* start with `UNVERIFIED`. A model that follows the prompt literally can therefore author a substantive BOM and still never satisfy the resume gate. This is a longstanding #133/#166-class contract mismatch, not a novel #66 finding until reproduced in the live medium run.

Do not apply this preemptively. The first executor with a real provider/KiCad run should use it only if `examples/medium/esp32-soil-sensor.md` actually wedges at stage 3 with a populated BOM whose candidate MPNs retain the required provenance marker.

## Minimal source change if reproduced

In `src/commands/create.ts`, replace the current `part-selection.isComplete` row predicate with a substantive-row predicate that preserves provenance:

```ts
      return rows.some((row) => {
        const cols = row.split('|').map((c) => c.trim());
        const refdes = cols[1] ?? '';
        const value = cols[2] ?? '';
        const footprint = cols[3] ?? '';
        const mpn = cols[4] ?? '';
        const rationale = cols[5] ?? '';

        if (!refdes || !value || !footprint || !mpn || !rationale) return false;
        if (mpn.toUpperCase() === 'UNVERIFIED') return false;
        return true;
      });
```

Rationale: a bare scaffold placeholder (`UNVERIFIED`) remains incomplete; `UNVERIFIED <candidate-MPN>` is accepted only when the rest of the row is substantively authored; a verified MPN also remains accepted. This avoids the bad workaround of deleting the honesty marker merely to satisfy the gate.

## Focused regression

Prefer adding focused `STAGES` completion coverage near existing create hardening tests rather than another mock-only whole-pipeline suite. Exact cases:

1. `| U1 | ESP32-C3 | QFN-32 | UNVERIFIED | |` => incomplete.
2. `| U1 | ESP32-C3 | QFN-32 | UNVERIFIED | candidate only |` => incomplete.
3. `| U1 | ESP32-C3 | QFN-32 | UNVERIFIED ESP32-C3FH4 | candidate chosen from installed-symbol-compatible part; datasheet verification pending |` => complete.
4. `| U1 | ESP32-C3 | QFN-32 | ESP32-C3FH4 | verified candidate with rationale |` => complete.
5. Missing refdes/value/footprint/rationale in any otherwise valid row => incomplete.

If convenient, export the predicate as a small pure helper so these tests stay offline and do not need KiCad/provider execution.

## Live-run evidence to capture before patching

- exact command/provider and base SHA;
- stage-3 transcript excerpt showing the prompt-required `UNVERIFIED` form;
- generated `docs/BOM.md` row(s);
- log showing stage 3 remains incomplete/repeats rather than advancing;
- `.copperhead/runs/*` summary for that attempt.

Then apply the smallest change above, run the focused regression, and resume the *same* real run. The bounty still requires all eight stages committed, exit 0, durable E2E coverage, and a grounded findings report; this patch alone does not satisfy #66.
