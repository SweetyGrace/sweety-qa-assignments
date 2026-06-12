# 02 — Test Strategy

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Test Strategy
**Version:** 1.0
**Owner:** QA Lead
**Status:** Draft — for review

---

## 1. Overview

The Vendor Invoice Management Portal is a B2B web application. On one side, external vendors register, log in, and submit invoices against purchase orders. On the other, an internal Accounts Payable (AP) team reviews those invoices, approves or rejects them, and forwards the approved ones for payment. Both sides are kept informed by email, and the business gets a monthly activity report on top.

This strategy sets the *direction* of QA for the whole engagement — what we are trying to prove, what we will and won't touch, how we'll work through it, and which tools and environments we'll lean on. The detailed day-to-day "how" lives in the Test Plan (`03-test-plan.md`); this document stays at the altitude of intent.

## 2. What we are trying to prove (Objectives)

- All seven functional requirements behave exactly as agreed once they are confirmed.
- The right user can do the right thing — and, just as important, the wrong user **cannot**. Access control is treated as a first-class objective, not a footnote.
- Multi-step approval flows move through their states correctly and fire the correct notifications at each transition.
- The portal stays responsive under the concurrency the business actually expects.
- Data stays consistent end-to-end — what the UI shows, what the API returns, and what the database stores all agree.
- Every defect is captured with enough context that a developer can reproduce and fix it without coming back to ask.

## 3. Scope

### In scope
- Vendor registration and authentication
- Invoice submission, field validation, and file upload (including malformed/oversized files)
- AP approval and rejection workflows, including resubmission
- The payment-forwarding handoff (up to the integration boundary)
- Email notification triggers
- Monthly report generation and export
- Role-based access control across every module
- API-layer testing for all backend services
- Database integrity verification

### Out of scope
- The internal logic of any third-party payment gateway (we test up to our side of the boundary)
- ERP/SAP system behaviour beyond the integration contract
- Server provisioning and network infrastructure
- Procurement of end-user devices

> Anything sitting on the scope boundary (payment gateway, ERP) is covered with mocks/stubs early and only exercised against the real system during integration/UAT.

## 4. Approach, phase by phase

| Phase | What QA does | Techniques |
|-------|--------------|-----------|
| Requirements analysis | Review the brief, hunt for ambiguity, pin down acceptance criteria | Checklist review, clarification sessions |
| Test planning | Fix scope, risks, environments, entry/exit gates | Risk-based prioritisation |
| Test design | Author scenarios and detailed cases, build test data | Equivalence partitioning, boundary analysis, decision tables |
| Functional testing | Exercise UI, API, and DB layers across all features | Scripted + exploratory |
| Non-functional testing | Performance, security, accessibility, compatibility | JMeter/k6, OWASP ZAP, axe |
| Integration testing | Email, ERP, and payment-gateway boundary checks | Contract tests, mocks/stubs |
| UAT | Business validates against real-world processes | Scripted + exploratory UAT |
| Deploy verification | Smoke checks, config verification, rollback readiness | Smoke checklist |

The guiding principle throughout is **shift-left**: the cheapest bug to fix is the one caught in a requirement, so QA engages from day one rather than waiting for a build.

## 5. Environments

| Environment | Used for | Notes |
|-------------|----------|-------|
| DEV | Developer unit/integration work | Not a QA environment |
| QA / SIT | Functional, API, regression | QA's primary playground; refreshed each sprint |
| Staging / UAT | User acceptance | Production mirror; business access |
| Production | Post-deploy smoke only | Read-only verification — no destructive testing |

## 6. Entry & exit criteria

**We start testing when:**
- Requirements are baselined and approved
- The QA environment is deployed and reachable
- Test data is loaded
- A build is deployed with release notes
- Test cases are reviewed and approved

**We close testing when:**
- 100% of planned cases have been executed
- Every Critical and High defect is fixed and re-verified
- Requirement coverage is at least 90%
- The execution report is published and signed off
- No open blockers remain on in-scope features

## 7. Tooling

| Purpose | Tool | Use |
|---------|------|-----|
| Test management | Jira / Zephyr | Authoring, execution tracking, defects |
| API testing | Postman | Contract and regression checks |
| UI automation | Selenium / Cypress | Regression suite for high-traffic flows |
| Performance | JMeter / k6 | Load and stress on critical endpoints |
| Security | OWASP ZAP / Burp Suite | Vulnerability scans, OWASP Top 10 |
| Accessibility | axe / Lighthouse | WCAG 2.1 AA checks |
| Defect tracking | Jira | Logging, triage, resolution |

## 8. Guiding principles

1. **Test at every layer.** A bug in the API can sail straight past a perfectly behaving UI — so the UI is never the only place we look.
2. **Risk drives effort.** RBAC and invoice submission carry the most business risk, so they get the deepest coverage first.
3. **Only test what's confirmed.** Pending requirements are blockers, not guesses.
4. **Evidence over opinion.** Every reported defect carries reproduction steps and artifacts.
