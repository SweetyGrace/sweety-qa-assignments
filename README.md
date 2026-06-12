# QA Artifacts — Vendor Bill & Payment Hub

End-to-end QA documentation for a B2B **Vendor Bill & Payment Hub**: a web application where external vendors submit bills against purchase orders and an internal Accounts Payable (AP) team reviews, approves, and routes them for payment.

This repository is a hands-on QA assignment demonstrating the full quality lifecycle — from challenging the requirements, through test design and execution, to deployment-readiness checks. Quality is treated as something built in at every phase, not bolted on at the end.

## The 7 Requirements Under Test

| Req ID | Requirement |
|--------|-------------|
| REQ-01 | Vendors can register and sign in to the hub |
| REQ-02 | Vendors can submit bills against purchase orders |
| REQ-03 | The AP team can review, approve, or reject bills |
| REQ-04 | Approved bills are routed to payment processing |
| REQ-05 | Both parties receive notifications on status changes |
| REQ-06 | The system produces monthly bill-activity reports |
| REQ-07 | Only authorised users may access the system |

## Documents

Each artifact lives in its own file under [`artifacts/`](artifacts/), in the order a QA engineer produces them:

| # | Document | Purpose |
|---|----------|---------|
| 01 | [Requirements Clarification Questions](artifacts/01-requirements-clarification-questions.md) | Challenges every ambiguous requirement before test design |
| 02 | [Test Strategy](artifacts/02-test-strategy.md) | Project-level QA approach, scope, environments, tools |
| 03 | [Test Plan](artifacts/03-test-plan.md) | Release-level operating guide: features, risks, resources, schedule |
| 04 | [Test Scenarios](artifacts/04-test-scenarios.md) | High-level "what to test" per feature area |
| 05 | [Test Cases](artifacts/05-test-cases.md) | Detailed "how to test" with steps, data, and expected results |
| 06 | [Test Data Specification](artifacts/06-test-data-specification.md) | Accounts, POs, and files to seed before execution |
| 07 | [Bug Reports](artifacts/07-bug-reports.md) | Defect template plus sample defects |
| 08 | [Requirements Traceability Matrix](artifacts/08-requirements-traceability-matrix.md) | Links every requirement to its scenarios and cases |
| 09 | [Test Execution Report](artifacts/09-test-execution-report.md) | Pass/fail summary, defect counts, recommendations |
| 10 | [Non-Functional Testing Checklist](artifacts/10-non-functional-testing-checklist.md) | Performance, security, accessibility, compatibility, usability, docs |

## How to read this repo

Start with **01 (Clarification Questions)** to see how requirements are interrogated, then follow the numbers. The traceability is two-way: **04 → 05 → 08** lets you trace any requirement down to its test cases and back again.

## QA techniques applied

- **Equivalence Partitioning & Boundary Value Analysis** — see the file-size and PO-balance cases in document 05.
- **Negative and security testing** — unsupported file types, RBAC bypass, malicious uploads.
- **Risk-based prioritisation** — Critical/High features (bill submission, RBAC) get the deepest coverage.
- **Shift-left mindset** — the most valuable defects are caught in the requirements (document 01), not in production.

---

*Assignment artifact · Version 1.0 · June 2026*
