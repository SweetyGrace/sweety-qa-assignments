# 4. Test Scenarios

**Project:** Vendor Bill & Payment Hub
**Document Type:** Test Scenarios
**Version:** 1.0

---

Test scenarios are the high-level *"what to test"* — one per user situation or feature area, derived from the 7 requirements. Each maps forward to one or more detailed test cases (see document 05) and back to a requirement (see the RTM, document 08).

| Scenario ID | Feature Area | Scenario Description |
|-------------|-------------|----------------------|
| TS-001 | Vendor Registration | Vendor registers successfully with all mandatory details |
| TS-002 | Vendor Registration | Registration is rejected when a mandatory field is missing or invalid |
| TS-003 | Vendor Registration | Duplicate registration (same email/tax ID) is prevented |
| TS-004 | Vendor Sign-in | Activated vendor signs in with valid credentials |
| TS-005 | Vendor Sign-in | Sign-in fails with a wrong password and shows a non-revealing error |
| TS-006 | Vendor Sign-in | Account is locked after the configured number of failed attempts |
| TS-007 | Vendor Sign-in | Session expires after the configured idle timeout |
| TS-008 | Vendor Sign-in | Password reset link works once and then expires |
| TS-009 | Bill Submission | Vendor submits a valid bill linked to an open PO |
| TS-010 | Bill Submission | Submission fails when a required bill field is missing |
| TS-011 | Bill Submission | Upload rejects an unsupported file type (e.g., .exe) |
| TS-012 | Bill Submission | Upload rejects a file above the maximum size |
| TS-013 | Bill Submission | Upload accepts a file exactly at the size boundary |
| TS-014 | Bill Submission | Duplicate bill number for the same vendor is blocked |
| TS-015 | Bill Submission | Vendor cannot bill against a closed or non-existent PO |
| TS-016 | Bill Submission | Over-billing beyond the remaining PO balance is blocked |
| TS-017 | Bill Submission | Vendor can view their submitted bills and current status |
| TS-018 | AP Workflow | AP user sees all pending bills in their queue |
| TS-019 | AP Workflow | AP user approves a valid bill and it moves to the payment queue |
| TS-020 | AP Workflow | AP user must enter a reason to reject a bill |
| TS-021 | AP Workflow | A rejected bill can be corrected and resubmitted by the vendor |
| TS-022 | AP Workflow | A high-value bill escalates to the next approval level |
| TS-023 | AP Workflow | Concurrent action: vendor recall vs. AP approve resolves safely |
| TS-024 | Payment Routing | Approved bill is routed to payment with correct data |
| TS-025 | Payment Routing | Payment reference is stored and shown on the bill record |
| TS-026 | Payment Routing | A failed payment returns the bill to an exception state |
| TS-027 | Notifications | Vendor is notified when a bill is submitted successfully |
| TS-028 | Notifications | Vendor is notified on approval |
| TS-029 | Notifications | Vendor is notified on rejection, including the reason |
| TS-030 | Notifications | AP team is notified when a new bill is awaiting review |
| TS-031 | Reporting | AP manager generates the monthly bill-activity report |
| TS-032 | Reporting | Report exports correctly to Excel and PDF |
| TS-033 | Reporting | Report filters by vendor, date range, and status |
| TS-034 | Access Control | Vendor cannot reach AP approval screens |
| TS-035 | Access Control | AP Clerk cannot reach the payment-processing module |
| TS-036 | Access Control | Unauthenticated user is redirected to sign-in on protected routes |
| TS-037 | Access Control | Admin can create, edit, and deactivate user accounts |
| TS-038 | Security | Uploaded files never execute malicious scripts/payloads |
| TS-039 | Security | Bill APIs reject requests without a valid auth token |
| TS-040 | Performance | Bill list loads within 3 seconds with 500 records |
