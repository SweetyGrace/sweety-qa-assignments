# 01 — Requirements Clarification Questions

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Requirements Clarification Log
**Version:** 1.0
**Owner:** QA Team
**Status:** Draft — awaiting client input

---

## Purpose

Every requirement in the brief is a single sentence, and a single sentence almost always hides a dozen decisions. Before any test design starts, the job of QA is to surface those hidden decisions and force them into the open. The questions below were raised during the requirements walkthrough of the Vendor Invoice Management Portal. Each one targets a real ambiguity that, if left unanswered, would either block testing or let a defect slip into production unnoticed.

Questions are grouped by the seven requirements (REQ-01 … REQ-07). A "Resolution" column is left blank for the client/BA to fill during clarification sessions.

---

## REQ-01 — Vendor registration and login

| # | Open Question | Why it matters | Resolution |
|---|---------------|----------------|------------|
| Q1 | Which fields are truly mandatory at sign-up — company name, GST/tax ID, bank details, primary contact — and which are optional? | Drives the mandatory-field validation matrix | |
| Q2 | Is a new vendor account live immediately, or does it wait on a manual verification/approval step? | Changes the whole onboarding test flow | |
| Q3 | How does a vendor authenticate — password only, OTP, SSO, or enforced MFA? | Determines which login test paths exist at all | |
| Q4 | What is the exact password policy (min length, character classes, expiry, reuse history)? | Needed for boundary and negative password tests | |
| Q5 | Can one vendor company hold several user logins with different roles under it? | Affects data model and RBAC test design | |
| Q6 | What is the supported account-recovery path — emailed reset link, admin reset, or security questions? | Each path needs its own test coverage | |
| Q7 | After how many failed logins does an account lock, and for how long? | Required to write the lockout test (see TC-003) | |
| Q8 | Is there an idle-session timeout, and what is its duration? | Drives the session-expiry test | |
| Q9 | *(Added)* Are vendor email addresses unique system-wide, and is the uniqueness check case-sensitive? | Prevents duplicate-account defects | |

## REQ-02 — Invoice submission against purchase orders

| # | Open Question | Why it matters | Resolution |
|---|---------------|----------------|------------|
| Q10 | Which file types are accepted for upload (PDF, JPEG, PNG, Excel, ZIP)? | Defines the accepted/rejected format matrix | |
| Q11 | What is the maximum file size per invoice? | Needed for the boundary tests at, just under, and just over the limit | |
| Q12 | Can a vendor attach more than one file in a single submission? | Affects upload-component test design | |
| Q13 | Must every invoice reference an existing PO, and what happens when the PO is missing, closed, or belongs to another vendor? | High-risk validation path | |
| Q14 | Which invoice fields are mandatory (invoice no., date, PO no., line items, tax, total)? | Field-level validation coverage | |
| Q15 | Can the same invoice number be submitted twice by the same vendor? | Duplicate-prevention test | |
| Q16 | Before review, can a vendor edit or withdraw a submitted invoice? | Determines the editable-state test cases | |
| Q17 | Is there a period cut-off/deadline for submitting invoices? | May add a time-based negative test | |
| Q18 | Should the system auto-validate invoice totals against the PO value, and what tolerance is allowed? | Could surface a major business-logic gap | |
| Q19 | *(Added)* On a duplicate or invalid submission, is the uploaded file discarded or retained? | Storage/clean-up and security concern | |

## REQ-03 — AP team approval / rejection

| # | Open Question | Why it matters | Resolution |
|---|---------------|----------------|------------|
| Q20 | Is approval single-step, or a multi-level chain (clerk → manager → finance)? | Defines the workflow state machine to test | |
| Q21 | Is a reason mandatory on rejection, and is that reason shown to the vendor? | Drives TC-021 validation | |
| Q22 | Can a rejected invoice be resubmitted, and is there a cap on resubmissions? | Loop/limit test | |
| Q23 | Can an AP user reassign an invoice to a different approver? | Workflow branch coverage | |
| Q24 | Is there an SLA/deadline on approval decisions, and what happens when it is breached? | May need an escalation test | |
| Q25 | Can an invoice be partially approved (some line items accepted, others rejected)? | Significantly changes data model | |
| Q26 | What search, filter, and sort options must the AP queue offer? | Defines the list-view test cases | |
| Q27 | Can AP users add internal notes that the vendor never sees? | Visibility/RBAC test | |

## REQ-04 — Payment forwarding for approved invoices

| # | Open Question | Why it matters | Resolution |
|---|---------------|----------------|------------|
| Q28 | What does "forwarded for payment" mean technically — an ERP/SAP push, an email to finance, or an internal queue? | Defines the integration boundary to test | |
| Q29 | What is the target payment turnaround after approval? | Possible SLA/perf assertion | |
| Q30 | Who can view an invoice's payment status — vendor, AP, finance, all? | RBAC + visibility coverage | |
| Q31 | Which payment methods are in scope (bank transfer, cheque, wallet)? | Data-field coverage | |
| Q32 | Does the system store a payment confirmation/reference number? | Determines DB-verification step | |
| Q33 | If a payment fails, does the invoice revert to a pending state? | Failure-path test | |
| Q34 | What audit-trail/compliance records are required for payment events? | Audit-log verification | |

## REQ-05 — Email notifications on status changes

| # | Open Question | Why it matters | Resolution |
|---|---------------|----------------|------------|
| Q35 | Which exact events trigger an email (submit, approve, reject, payment, etc.)? | Defines the notification trigger matrix | |
| Q36 | For each event, who is the recipient — vendor, AP, or both? | Recipient-correctness test | |
| Q37 | Are in-app alerts also expected alongside email? | Adds a channel to test | |
| Q38 | Can users opt out of specific notification types? | Preference-handling test | |
| Q39 | If email delivery fails, is there a retry, and how many attempts? | Resilience test | |
| Q40 | Are there branding/template rules for the email content? | Content-validation test | |

## REQ-06 — Monthly invoice activity reports

| # | Open Question | Why it matters | Resolution |
|---|---------------|----------------|------------|
| Q41 | Which fields must the monthly report contain (vendor, invoice count, total value, approval rate…)? | Report-content assertions | |
| Q42 | Which output formats are required — PDF, Excel, dashboard, or all? | Export-format coverage | |
| Q43 | Who may generate/download reports — all AP users, managers only, everyone? | RBAC on reporting | |
| Q44 | Which filters must the report support (vendor, date range, status, department)? | Filter-combination tests | |
| Q45 | Are reports auto-generated and emailed at month-end, or on demand only? | Scheduling test | |
| Q46 | Is there a historical retention requirement (e.g., 7 years for compliance)? | Data-retention/archival test | |

## REQ-07 — Role-based access control

| # | Open Question | Why it matters | Resolution |
|---|---------------|----------------|------------|
| Q47 | What is the full list of roles (Vendor, AP Clerk, AP Manager, Finance, Admin, Auditor)? | Defines the RBAC permission matrix | |
| Q48 | What can each role do per module (view/create/edit/approve/delete/export)? | Core of all access-control tests | |
| Q49 | Can an Admin grant or revoke individual permissions per user, outside the standard roles? | Edge-case permission test | |
| Q50 | Is IP whitelisting or VPN required for internal AP/Finance users? | Network-level access test | |
| Q51 | Must all user access and actions be logged for audit? | Audit-trail verification | |
| Q52 | How is access revoked when a vendor relationship ends or an employee leaves? | Deactivation/off-boarding test | |

---

## Notes for the reviewer

- **All items are currently unresolved.** Per the risk register, QA will only build test cases against *confirmed* requirements; everything still pending is treated as a blocker for that scenario.
- Items marked *(Added)* are additional questions raised by QA beyond the original brief, on the basis of failure modes seen on similar invoicing systems.
- Once answers land, each row should be traced forward into the relevant scenario(s) in document `04-test-scenarios.md`.
