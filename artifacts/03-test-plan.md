# 3. Test Plan

**Project:** Vendor Bill & Payment Hub
**Document Type:** Test Plan
**Version:** 1.0
**Status:** Draft — For Review

---

## 3.1 Purpose

This Test Plan turns the Test Strategy into an operating guide for the QA team for this release. It defines what will be tested, the priority and risk of each feature, the resources involved, and the risks to the test effort itself.

## 3.2 Features to Be Tested

| Req ID | Feature | Priority | Test Types | Product Risk |
|--------|---------|----------|------------|--------------|
| REQ-01 | Vendor Registration & Sign-in | High | Functional, Security | Medium |
| REQ-02 | Bill Submission & Upload | Critical | Functional, API, DB | High |
| REQ-03 | AP Approval / Rejection Workflow | Critical | Functional, Workflow | High |
| REQ-04 | Payment Routing Integration | High | Integration, API | High |
| REQ-05 | Notification Triggers | Medium | Functional, Integration | Medium |
| REQ-06 | Monthly Report Generation | Medium | Functional, Performance | Low |
| REQ-07 | Role-Based Access Control | Critical | Security, Functional | Critical |

## 3.3 Risk Register (risks to the *test effort*)

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Requirements not baselined before test start | High | High | Raise blocker; test only confirmed requirements |
| QA environment instability | Medium | High | Dedicated QA env; daily health checks |
| Payment-gateway sandbox unavailable | Medium | High | Mock/stub early; real integration in UAT |
| Insufficient test data (POs, vendors) | High | Medium | Prepare data-seed scripts upfront |
| Timeline compression cutting coverage | Medium | High | Risk-based prioritisation; defer low-risk scenarios |
| File-upload security gaps | Medium | Critical | Dedicated security cycle with OWASP ZAP |
| Notification email service not configured in QA | Medium | Medium | Use a mail-trap/sandbox SMTP; verify triggers via logs |

## 3.4 Resource Allocation

| Role | Responsibilities | Allocation |
|------|------------------|-----------|
| QA Lead | Strategy, planning, risk, sign-off | Full-time |
| QA Engineer (Functional) | Test design, manual execution, defect reporting | 2 × Full-time |
| QA Engineer (Automation) | API + regression automation | 1 × Full-time |
| Performance Tester | Load/stress scripts and reporting | Part-time (NFT phase) |
| Security Analyst | OWASP testing, vulnerability assessment | Part-time (NFT phase) |

## 3.5 Schedule (indicative)

| Sprint / Window | Focus |
|-----------------|-------|
| Sprint 1 | Requirements review, test design, data prep |
| Sprint 2 | Functional execution: REQ-01, REQ-02, REQ-03 |
| Sprint 3 | Functional execution: REQ-04, REQ-05, REQ-06, REQ-07 |
| Sprint 4 | Non-functional, integration, regression, UAT support |
| Release week | Smoke, deploy verification, sign-off |

## 3.6 Suspension & Resumption Criteria

- **Suspend** testing if a build blocks more than 30% of planned cases, or the QA environment is down for more than half a day.
- **Resume** once a fixed build is deployed, smoke tests pass, and blocked cases are unblocked.
