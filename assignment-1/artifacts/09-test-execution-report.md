# 9. Test Execution Report

**Project:** Vendor Bill & Payment Hub
**Document Type:** Test Execution Report
**Version:** 1.0
**Reporting Period:** June 2026 (Cycle 1)

---

## 9.1 Execution Summary

| Metric | Count | Percentage |
|--------|-------|-----------|
| Total test cases planned | 40 | 100% |
| Executed | 22 | 55% |
| Passed | 15 | 68% (of executed) |
| Failed | 6 | 27% (of executed) |
| Blocked | 1 | 5% (of executed) |
| Not executed | 18 | 45% (of planned) |
| Total defects raised | 9 | — |
| Critical defects open | 2 | — |
| High defects open | 3 | — |

## 9.2 Defect Summary by Severity

| Severity | Total | Open | Fixed | Verified |
|----------|-------|------|-------|----------|
| Critical | 2 | 2 | 0 | 0 |
| High | 4 | 3 | 1 | 0 |
| Medium | 2 | 1 | 1 | 0 |
| Low | 1 | 0 | 1 | 0 |

## 9.3 Observations & Recommendations

1. **RBAC has a critical gap (DEF-002):** the Vendor role can reach AP screens via direct URL and see all vendors' bills. Must be fixed and re-tested before UAT.
2. **Server-side validation is incomplete (DEF-001, DEF-003):** file attachment and PO-balance checks pass on the UI but are not enforced by the API. Add server-side enforcement.
3. **Notifications (REQ-05) are largely untested:** the QA email sandbox is not yet wired up; trigger logic can only be partially verified via logs.
4. **Payment routing (REQ-04) is blocked:** the payment-gateway sandbox is unavailable; recommend mocking the boundary to unblock functional testing now and verifying the real integration in UAT.
5. **Automate regression for sign-in and RBAC** before the next sprint — these are critical, high-frequency, and prone to regression.

## 9.4 Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| QA Lead | | | |
| Project Manager | | | |
| Business Owner | | | |
