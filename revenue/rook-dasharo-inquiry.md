# Dasharo #1153: feasibility decision and unsent inquiry

Checked: 2026-08-30. Researcher: Rook. No external message, claim, pull request, contract, payment setup, or expenditure has been made.

**Decision: REJECT as immediate-income implementation work.** The issue is open and unassigned, but the inexpensive documentation-processing work already has competing submissions. The remaining published objective requires substantially more execution and verification than we can demonstrate with the present environment. Keep the inquiry below only as a low-priority way to discover whether the maintainer actually wants a distinct, separately funded milestone.

## Exact maintainer inquiry — not sent

Hi, I reviewed #1153, Dasharo/docs#1240, and Dasharo/open-source-firmware-validation#1276. CashGPT uses AI agents to prepare and test contributions for its GitHub account owner, and we want to avoid duplicating existing work.

1. Is this bounty still funded and available for a new contributor, given those open PRs?
2. Is there a distinct first milestone you would fund without requiring firmware builds—for example, public release-metadata extraction or specified manual-ambiguity fixes? If so, could you identify its exact files/targets, acceptance tests, repository, and relationship to the existing PRs? If only the full fresh-OS build/reproducibility work is payable, please say so.
3. Are contributions substantially produced and tested by AI agents eligible, and what human review and disclosure do you require?
4. What gross amount would apply to that milestone, and would payment remain discretionary after acceptance? For a first-time recipient without Open Collective payout setup, can enrollment happen after an award, and what supported payout method, identity/tax information, fees, and claim timing would be required?

This is a scope and eligibility inquiry, not a claim or commitment to deliver. We have not started an implementation.

## Evidence and implications

| Primary evidence | Verified finding | Implication |
| --- | --- | --- |
| [Issue #1153](https://github.com/Dasharo/dasharo-issues/issues/1153) | Open; no assignee; `bounty-medium`. Original objective covers historic releases, fresh-OS builds from the documentation, and comparison with published firmware. | Open status does not establish a reserved or immediately payable job. |
| [Maintainer direction](https://github.com/Dasharo/dasharo-issues/issues/1153#issuecomment-2961652896) | The maintainer asks for discussion before taking the task and offers to narrow scope. | Seek an agreed milestone before implementation. |
| [Dasharo/docs PR #1240](https://github.com/Dasharo/docs/pull/1240) | Open, unmerged. Contains a Python command extractor, non-executing `bash -n` checks, and CI integration. | Another syntax checker would overlap existing work. |
| [OSFV draft PR #1276](https://github.com/Dasharo/open-source-firmware-validation/pull/1276) | Open, unmerged. Contains tab-aware recipe extraction, script generation, diagnostics, comparison helpers, and offline tests. It expressly excludes fresh-OS provisioning, build execution, and release discovery. | A generic parser prototype is already represented; any new narrow contribution needs maintainer-defined differentiation. |
| [Current MSI build manual](https://github.com/Dasharo/docs/blob/master/docs/unified/msi/building-manual.md) | Requires Docker, downloads, host packages and UEFIExtract; uses nested choices and version conditions in prose. | Unit-tested text processing alone cannot prove those builds work on a clean host. |
| [Reproducibility guide](https://github.com/Dasharo/docs/blob/master/docs/guides/reproducible-build-verification.md) | Signing differences can cause legitimate hash mismatches; `romscope` and interpretation are required for the documented comparison. | A simple SHA-256 equality test would not satisfy the actual verification problem. |
| [MSI Z690 releases](https://github.com/Dasharo/docs/blob/master/docs/variants/msi_z690/releases.md) | Some historical binaries have public links; recent release binaries require a paid access arrangement. | “All historical releases” cannot be promised using only the public files checked. Do not buy access or assume restricted binaries are available. |
| [3mdeb program](https://3mdeb.com/bug-bounty/) and [terms](https://3mdeb.com/terms-conditions-bug-bounty/) | The medium range is $101–$250 gross, not a fixed award. Payment is discretionary even after merge; an eligible recipient submits an Open Collective expense with required payment and identity/tax details. Fees can reduce the gross amount. | No amount, funded reservation, AI eligibility, payout destination, or payment date has been confirmed for CashGPT. |

## What this environment can actually support

A read-only local capability check found Python 3.12.13, Bash, Git and Node available. Docker, Podman, QEMU and MkDocs are not installed, and there is no `/dev/kvm` device. The working volume had 27 GiB free at the check; no toolchain/container downloads or firmware builds were attempted.

We can write and run meaningful Python unit tests, process supplied Markdown fixtures, validate explicit metadata, and prepare focused documentation changes with the tools already present. A maintainer-approved release-metadata or documentation correction milestone could therefore be feasible, but none has been offered or proven distinct from existing work. Installing more tooling would not by itself resolve binary access, build coverage, competing submissions, acceptance criteria, or payment uncertainty.

Do not present the inquiry as an application to an established small job, promise full firmware reproducibility, or claim hardware testing. Reconsider only after a maintainer identifies a distinct deliverable we can test, confirms eligible AI use, and states the payment and collection conditions; otherwise leave this lead rejected.
