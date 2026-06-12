# 08 — Requirements Traceability Matrix (RTM)

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** RTM
**Version:** 1.0
**Owner:** QA Team

---

## Why this matters

The RTM is the proof of coverage. Read left-to-right it shows every requirement has at least one test; read right-to-left it shows no test exists that doesn't trace to a requirement. Anything that breaks that two-way link is either a coverage gap or scope creep — and the RTM is where you catch it.

## Matrix

| Req ID | Requirement | Test scenarios | Test cases | Exec status | Result |
|--------|-------------|----------------|-----------|-------------|--------|
| REQ-01 | Vendor registration & login | TS-001 … TS-007 | TC-001, TC-002, TC-003 | Executed | Pass |
| REQ-02 | Invoice submission against POs | TS-008 … TS-014, TS-036 | TC-010, TC-011, TC-012, TC-013 | Executed | **Fail** |
| REQ-03 | AP approval / rejection | TS-015 … TS-019 | TC-020, TC-021 | In progress | — |
| REQ-04 | Payment forwarding | TS-020, TS-021, TS-037 | TC-030 … TC-035 | Not started | — |
| REQ-05 | Email notifications | TS-022 … TS-025 | TC-040 … TC-048 | Not started | — |
| REQ-06 | Monthly reports | TS-026, TS-027, TS-028 | TC-050 … TC-055 | Not started | — |
| REQ-07 | Role-based access control | TS-029 … TS-035 | TC-029, TC-030 | Executed | **Fail** |

## Coverage read-out

- **Every requirement is traced** to at least one scenario and one case — no orphan requirements.
- **Two failures stand out:** REQ-02 (file-attachment not enforced — BUG-001) and REQ-07 (vendor reaches AP queue — BUG-002). Both are blockers for UAT.
- **REQ-04 and REQ-05** are not started: REQ-04 is blocked on the payment-gateway sandbox; REQ-05 is blocked on the QA email service not being configured.
- The added rows **TS-036** (REQ-02) and **TS-037** (REQ-04) extend coverage into two failure modes the original matrix didn't trace.

> Status values here mirror the Test Execution Report (`09`). When either document changes, both must be updated together so they never disagree.
