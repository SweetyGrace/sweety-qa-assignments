# 09 — Test Execution Report

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Test Execution Report
**Version:** 1.0
**Owner:** QA Lead
**Reporting period:** Sprint cut-off, June 2026

---

## 9.1 Execution summary

| Metric | Count | % |
|--------|-------|---|
| Planned test cases | 35 | 100% |
| Executed | 20 | 57% |
| Passed | 14 | 70% (of executed) |
| Failed | 6 | 30% (of executed) |
| Blocked | 2 | 10% (of executed) |
| Not executed | 15 | 43% (of planned) |
| Defects raised | 8 | — |
| Critical defects open | 2 | — |
| High defects open | 3 | — |

## 9.2 Defects by severity

| Severity | Total | Open | Fixed | Verified |
|----------|-------|------|-------|----------|
| Critical | 2 | 2 | 0 | 0 |
| High | 4 | 3 | 1 | 0 |
| Medium | 1 | 0 | 1 | 0 |
| Low | 1 | 0 | 1 | 0 |

## 9.3 What we found, and what to do about it

1. **RBAC has a critical hole.** A vendor can open AP-only URLs directly and see every vendor's invoices (BUG-002). This is a broken-access-control defect and is a hard blocker for UAT.
2. **Invoice file enforcement is client-side only.** The API accepts a submission with no file (BUG-001). Needs a server-side guard; the added test TC-013 will confirm the fix.
3. **Notifications (REQ-05) are untested** because the QA environment has no email service wired up. Recommendation from the plan stands: stand up a mail sink (e.g. MailHog) so triggers can be verified without a live SMTP.
4. **Payment integration (REQ-04) is blocked** pending the payment-gateway sandbox. Until it arrives, exercise the handoff against a stub so the contract is at least validated early.
5. **Automate the login and RBAC suites.** These are the highest-risk, highest-regression areas; they should be in the automated regression pack before the next sprint so a fix doesn't silently regress.

## 9.4 Exit-criteria check

| Exit criterion | Met? |
|----------------|------|
| 100% planned cases executed | ❌ (57%) |
| All Critical/High defects fixed & re-verified | ❌ (2 Critical, 3 High open) |
| ≥ 90% requirement coverage | ❌ (3 requirements not started) |
| Execution report published & signed off | In progress |
| No open blockers on in-scope features | ❌ (BUG-002 blocks REQ-07) |

**Verdict:** the build is **not** ready to exit this test phase. The two Critical defects must be fixed and re-verified, and the email/payment blockers cleared, before a release decision.

## 9.5 Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| QA Lead | | | |
| Project Manager | | | |
| Business Owner | | | |
