# Copperhead #66 — stage 7 resume contract audit

Upstream baseline audited: `copperheadhq/copperhead` main at `060f92f40475fd3fbf29e13bc1815de79111961e`.

## Finding

Current `src/commands/create.ts` stage 7 (`firmware`) considers the stage complete when `firmware/` contains **any** file with a source-like extension (`.c`, `.h`, `.cpp`, `.hpp`, `.py`, `.rs`, `.ino`, `.s`). A lone arbitrary header or stub therefore causes a rerun to skip stage 7.

That is weaker than the current public workflow contract, which says stage 7 produces a `firmware/` scaffold **with `pins.h` generated from `PINOUT.md`**. The stage prompt is stronger still: `pins.h`, driver stubs, and one working happy path; build if the vendor toolchain exists, otherwise explicitly note that it was not compiled.

This is not a new issue. Upstream issue #23 already identifies the general shallow-resume-contract defect and specifically recommends `firmware → build marker` as the durable contract. Treat any live reproduction as a recurrence of #23, not a duplicate.

## Why it matters to #66

Unlike the stage-5 DRC recurrence, final `copperhead check` does not establish that the firmware scaffold or `pins.h` exists. So a partial/failed stage-7 run that happens to leave one source-like file can be skipped on resume and the pipeline can proceed to devplan. That makes this a plausible route to an apparent 8-stage completion whose stage-7 artifact does not match the documented create contract.

## Live-run evidence to capture

On the real `examples/medium/esp32-soil-sensor.md` run, record the contents of `firmware/` when stage 7 first exits or is resumed. Specifically verify:

- `firmware/pins.h` exists and is generated from `docs/PINOUT.md`;
- there is at least one substantive happy-path source file beyond an empty/stub marker;
- if a vendor toolchain is available, capture the build result; if unavailable, verify the required `not compiled here` note reaches `DEVPLAN.md` by the end of stage 8.

Do not patch this merely from static suspicion if the live run never exercises the resume path.

## Minimal regression candidate if reproduced

A narrowly scoped first hardening is to require both:

1. at least one source-like file in `firmware/`, and
2. a non-empty `firmware/pins.h`.

Focused regression: create `firmware/main.c` alone and assert stage 7 remains incomplete; add non-empty `firmware/pins.h` and assert the basic artifact predicate can pass. This closes the clearest documented false-positive without inventing a new build-marker format.

The stronger #23 recommendation (`firmware → build marker`) should only be implemented if the live run or maintainer guidance defines the marker semantics, since current main has no obvious canonical build marker to reuse.

## Coordination

- Ledger already owns the stage-6 outputs completeness candidate; do not duplicate it.
- Stage-5 DRC resume hardening is already separately documented and should remain `runDrc(...).ok` only; unrouted count belongs to #252/fab release evidence.
- Highest-value action remains a real current-main eight-stage run after maintainer eligibility is confirmed. This file is a patch-ready recurrence handoff if stage 7 becomes the observed blocker.

Accounting: no tests were run in this Scout runtime, no upstream patch was pushed, and no payout is claimed.