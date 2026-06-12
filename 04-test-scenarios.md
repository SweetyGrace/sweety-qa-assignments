# 04 — Test Scenarios

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Test Scenarios
**Version:** 1.0
**Owner:** QA Team

---

## What a scenario is

A scenario answers **"what do we need to test?"** at a feature level — one line per situation a real user could land in. Each scenario fans out into one or more detailed test cases (see `05-test-cases.md`). Scenarios are deliberately implementation-agnostic; they describe the *situation*, not the clicks.

Below, scenarios are grouped by requirement and tagged **[P]** positive (happy path), **[N]** negative (should fail gracefully), or **[S]** security.

---

## REQ-01 — Vendor registration & login

| ID | Type | Scenario |
|----|------|----------|
| TS-001 | [P] | Vendor registers successfully with all required details |
| TS-002 | [N] | Registration is blocked when a mandatory field is missing or invalid |
| TS-003 | [N] | A second registration with an already-used email is prevented |
| TS-004 | [P] | A registered vendor logs in with valid credentials |
| TS-005 | [N] | Login fails with a wrong password and shows a clear, non-leaky error |
| TS-006 | [N] | Account locks after N consecutive failed login attempts |
| TS-007 | [N] | Session expires after the configured idle timeout |

## REQ-02 — Invoice submission

| ID | Type | Scenario |
|----|------|----------|
| TS-008 | [P] | Vendor submits a valid invoice tied to an open PO |
| TS-009 | [N] | Submission is rejected when a required invoice field is missing |
| TS-010 | [N] | Upload rejects an unsupported file type (e.g. `.exe`) |
| TS-011 | [N] | Upload rejects a file over the maximum size limit |
| TS-012 | [N] | A duplicate invoice number from the same vendor is blocked |
| TS-013 | [P] | Vendor can see a list of their own submitted invoices and statuses |
| TS-014 | [N] | Submission against a non-existent or closed PO is refused |
| TS-036 | [N] | *(Added)* Submission with no file attached is rejected server-side, not just in the UI |

## REQ-03 — AP approval workflow

| ID | Type | Scenario |
|----|------|----------|
| TS-015 | [P] | AP user sees all pending invoices in their queue |
| TS-016 | [P] | AP user approves a valid invoice; it moves to the payment queue |
| TS-017 | [N] | Rejection requires a mandatory reason before it can be confirmed |
| TS-018 | [P] | A rejected invoice can be corrected and resubmitted by the vendor |
| TS-019 | [P] | Multi-level approval escalates correctly to the next approver |

## REQ-04 — Payment processing

| ID | Type | Scenario |
|----|------|----------|
| TS-020 | [P] | An approved invoice is forwarded to the payment system with correct data |
| TS-021 | [P] | Payment confirmation/reference is stored and shown on the invoice record |
| TS-037 | [N] | *(Added)* A failed payment returns the invoice to a pending state, not a dead end |

## REQ-05 — Notifications

| ID | Type | Scenario |
|----|------|----------|
| TS-022 | [P] | Vendor is emailed when their invoice is submitted successfully |
| TS-023 | [P] | Vendor is emailed when their invoice is approved |
| TS-024 | [P] | Vendor is emailed when their invoice is rejected, with the reason |
| TS-025 | [P] | AP team is emailed when a new invoice lands for review |

## REQ-06 — Reporting

| ID | Type | Scenario |
|----|------|----------|
| TS-026 | [P] | AP manager generates a monthly invoice activity report |
| TS-027 | [P] | Report exports correctly in both Excel and PDF |
| TS-028 | [P] | Report can be filtered by vendor, date range, and status |

## REQ-07 — Access control & security

| ID | Type | Scenario |
|----|------|----------|
| TS-029 | [S] | A vendor cannot reach AP approval screens |
| TS-030 | [S] | An AP Clerk cannot reach the payment-processing module |
| TS-031 | [S] | An unauthenticated user is bounced to login on every protected route |
| TS-032 | [P] | An Admin can create, modify, and deactivate user accounts |
| TS-033 | [S] | An uploaded file with an embedded script never executes on retrieval |
| TS-034 | [S] | Invoice API endpoints reject requests with no/invalid auth token |
| TS-035 | — | Invoice list page loads within 3 seconds with 500 invoices (perf) |

---

## Coverage note

The two *(Added)* scenarios — TS-036 (server-side file-required enforcement) and TS-037 (payment-failure rollback) — were raised by QA after spotting that the original suite only checked these conditions at the UI layer or not at all. Both map directly to defects/risks already on record (see BUG-001 and the payment-failure clarification Q33).
