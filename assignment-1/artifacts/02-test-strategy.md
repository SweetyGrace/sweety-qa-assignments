# 2. Test Strategy

**Project:** Vendor Bill & Payment Hub
**Document Type:** Test Strategy
**Version:** 1.0
**Status:** Draft — For Review

---

## 2.1 Project Overview

The Vendor Bill & Payment Hub is a B2B web application that lets external vendors submit bills against purchase orders and lets the internal Accounts Payable (AP) team review, approve, and route them for payment. This strategy defines the overall QA approach, applying quality across the full lifecycle rather than only at the end.

## 2.2 Test Objectives

- Confirm all 7 functional requirements are implemented correctly.
- Prove role-based access control blocks every unauthorised operation.
- Verify multi-step approval workflows execute correctly and fire the right notifications.
- Confirm the hub stays responsive under expected concurrent load.
- Validate data integrity is preserved across the UI, API, and database layers.
- Capture every defect with enough detail to be reproduced and fixed first time.

## 2.3 Scope

**In scope**
- Vendor registration, sign-in, and account recovery
- Bill submission, field validation, and file upload
- AP review, approval, rejection, and resubmission workflows
- Payment-routing integration (boundary)
- Notification triggers (email / in-app)
- Monthly report generation and export
- Role-based access control and security
- API-layer testing of backend services
- Database-integrity verification

**Out of scope**
- Internal logic of the third-party payment gateway
- ERP/SAP internals (integration boundary only)
- Server provisioning and network infrastructure
- End-user device procurement

## 2.4 Test Approach by Phase

| Phase | Activities | Techniques |
|-------|------------|-----------|
| Requirements Analysis | Review BRD, log ambiguities, define acceptance criteria | Checklist review, clarification sessions |
| Test Planning | Define scope, risks, environments, entry/exit criteria | Risk-based prioritisation |
| Test Design | Author scenarios and detailed cases, prepare test data | Equivalence Partitioning, Boundary Value Analysis, Decision Tables |
| Functional Testing | UI, API, and DB testing of every feature | Scripted + exploratory |
| Non-Functional Testing | Performance, security, accessibility, compatibility | JMeter, OWASP ZAP, axe |
| Integration Testing | Email, ERP, and payment-gateway boundaries | Contract testing, mocks/stubs |
| UAT | Business validation against real-world scenarios | Scripted + exploratory UAT |
| Deploy Verification | Smoke tests, config checks, rollback readiness | Smoke checklist |

## 2.5 Test Environments

| Environment | Purpose | Notes |
|-------------|---------|-------|
| DEV | Developer unit & integration testing | Owned by developers; QA does not test here |
| QA / SIT | Functional, API, and regression testing | Primary QA environment; refreshed each sprint |
| Staging / UAT | User Acceptance Testing | Production mirror; business-team access |
| Production | Post-deploy smoke only | No destructive testing; read-only verification |

## 2.6 Entry and Exit Criteria

**Entry (to begin testing)**
- Requirements baselined and approved
- Target environment deployed and reachable
- Test data prepared and loaded
- Build deployed with release notes
- Test plan and cases reviewed and approved

**Exit (to close testing)**
- 100% of planned cases executed
- All Critical and High defects fixed and re-tested
- Requirement coverage ≥ 90%
- Test Execution Report published and signed off
- No open blockers on in-scope features

## 2.7 Tools

| Purpose | Tool | Usage |
|---------|------|-------|
| Test Management | Jira / Zephyr | Authoring, execution, defect tracking |
| API Testing | Postman | Contract and regression testing |
| UI Automation | Playwright / Cypress | Regression suite for high-frequency flows |
| Performance | JMeter / k6 | Load and stress on critical endpoints |
| Security | OWASP ZAP / Burp Suite | OWASP Top 10 and vulnerability scans |
| Accessibility | axe / Lighthouse | WCAG 2.1 AA checks |
| Bug Tracking | Jira | Logging, triage, resolution tracking |

> **Why a strategy before a plan?** The strategy is the *organisation-level* decision about how quality is achieved across the whole project. The plan (next document) turns that into a concrete, schedule-bound operating guide for one release.
