# 03 — Test Plan

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Test Plan
**Version:** 1.0
**Owner:** QA Lead
**Status:** Draft — for review

---

## 1. Purpose

Where the Test Strategy sets direction, this Test Plan is the operational guide the QA team works from day to day. It nails down which features get tested at what priority, what could go wrong and how we'll cushion it, and who is doing what.

## 2. Features under test

| Req ID | Feature | Priority | Test types | Inherent risk |
|--------|---------|----------|-----------|---------------|
| REQ-01 | Vendor registration & login | High | Functional, Security | Medium |
| REQ-02 | Invoice submission & upload | Critical | Functional, API, DB | High |
| REQ-03 | AP approval / rejection workflow | Critical | Functional, Workflow | High |
| REQ-04 | Payment forwarding integration | High | Integration, API | High |
| REQ-05 | Email notification triggers | Medium | Functional, Integration | Medium |
| REQ-06 | Monthly report generation | Medium | Functional, Performance | Low |
| REQ-07 | Role-based access control | Critical | Security, Functional | Critical |

Priority order for execution, when time is tight: **REQ-07 → REQ-02 → REQ-03 → REQ-04 → REQ-01 → REQ-05 → REQ-06.** Access control leads because a gap there is the most damaging and the cheapest for an attacker to exploit.

## 3. Risk register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Requirements not finalised before test start | High | High | Raise as blocker; build only against confirmed requirements |
| QA environment unstable | Medium | High | Dedicated env + daily health check |
| Payment-gateway integration arrives late | Medium | High | Mock/stub early; real integration deferred to UAT |
| Not enough test data (POs, vendors) | High | Medium | Prepare seed-data scripts up front |
| Timeline gets compressed | Medium | High | Risk-based prioritisation; defer low-risk scenarios |
| File-upload security holes | Medium | Critical | Dedicated security cycle with OWASP ZAP |
| Email service not configured in QA | Medium | Medium | Stand up a mail sink (e.g. MailHog) or stub the trigger | 

> The last row is an addition from QA — the original execution report flags that the email service was never configured, which blocked REQ-05. Planning for a mail sink up front avoids repeating that.

## 4. Resourcing

| Role | Responsibility | Allocation |
|------|----------------|-----------|
| QA Lead | Strategy, planning, risk, sign-off | Full-time |
| QA Engineer (Functional) ×2 | Test design, manual execution, defect reporting | Full-time |
| QA Engineer (Automation) | API + regression automation (Postman/Cypress) | Full-time |
| Performance Tester | JMeter/k6 scripts, perf reporting | Part-time (NFT phase) |
| Security Analyst | OWASP testing, vulnerability assessment | Part-time (NFT phase) |

## 5. Schedule (indicative)

| Sprint window | Focus |
|---------------|-------|
| Sprint 1 | Requirements clarification, test design begins |
| Sprint 2 | REQ-07 + REQ-02 functional + API |
| Sprint 3 | REQ-03 workflow + REQ-01 |
| Sprint 4 | REQ-04 integration, REQ-05 notifications |
| Sprint 5 | REQ-06 reports, non-functional cycle |
| Sprint 6 | Regression, UAT support, sign-off |

## 6. Deliverables

- This Test Plan and the Test Strategy
- Test scenarios (`04`) and detailed test cases (`05`)
- Test data specification (`06`)
- Bug reports (`07`)
- Requirements Traceability Matrix (`08`)
- Test Execution Report (`09`)
- Non-functional testing checklist (`10`)

## 7. Suspension & resumption

Testing on a given feature is **suspended** if its build is unstable enough to block more than ~40% of its planned cases, if the environment is down, or if a Critical defect blocks the flow under test. It **resumes** once a fixed build is deployed and the blocking defect is verified closed.
