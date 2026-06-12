# 1. Requirements Clarification Questions

**Project:** Vendor Bill & Payment Hub
**Document Type:** Requirements Clarification Log
**Version:** 1.0
**Prepared By:** QA Team
**Status:** Draft — For Client Review

---

The most valuable defect a QA engineer can find lives in the requirements, long before a line of code is written. Each requirement below was challenged for ambiguity, missing edge cases, and implicit assumptions. Every open question must be answered and baselined before test design is finalised.

> For each question we asked five framing questions: *What does success look like? What happens on failure? Who is affected? What data is involved? What are the boundaries/limits?*

---

## REQ-01 — Vendors can register and sign in to the hub

| Ref | Clarification Question | Client Response |
|-----|------------------------|-----------------|
| Q1 | Which fields are mandatory at registration — legal entity name, tax/GST ID, registered address, bank account, primary contact? | _Pending_ |
| Q2 | Is a vendor account usable immediately, or does it stay in a "Pending Verification" state until an internal admin approves it? | _Pending_ |
| Q3 | What sign-in method is required — email + password, OTP, corporate SSO, or mandatory MFA? | _Pending_ |
| Q4 | What is the password policy (minimum length, character classes, rotation/expiry, reuse history)? | _Pending_ |
| Q5 | Can one vendor organisation have several user logins with different roles (submitter vs. viewer)? | _Pending_ |
| Q6 | How is a forgotten password recovered — self-service email link, admin reset, or security questions? Does the link expire? | _Pending_ |
| Q7 | After how many consecutive failed attempts is an account locked, and how is it unlocked (auto after N minutes vs. admin)? | _Pending_ |
| Q8 | What is the idle session timeout, and is the user warned before being signed out? | _Pending_ |
| Q9 | Are vendor email addresses required to be unique across the whole system, or unique per organisation? | _Pending_ |

## REQ-02 — Vendors can submit bills against purchase orders

| Ref | Clarification Question | Client Response |
|-----|------------------------|-----------------|
| Q10 | Which file formats are accepted for the bill document (PDF, JPEG, PNG, Excel)? Are multi-page PDFs supported? | _Pending_ |
| Q11 | What is the maximum file size, and is there a per-day or per-PO submission cap? | _Pending_ |
| Q12 | Can multiple supporting files be attached to a single bill (e.g., delivery note + tax invoice)? | _Pending_ |
| Q13 | Must every bill reference an existing, open PO? What is shown if the PO is closed, fully consumed, or does not exist? | _Pending_ |
| Q14 | Which fields are mandatory on the bill (bill number, bill date, PO number, line items, tax, currency, total)? | _Pending_ |
| Q15 | Can the same bill number be submitted twice by the same vendor? Is the check per-vendor or system-wide? | _Pending_ |
| Q16 | Can a vendor edit, recall, or withdraw a submitted bill before it is reviewed? After rejection? | _Pending_ |
| Q17 | Should the system auto-validate the billed amount against the remaining PO balance, and block over-billing? | _Pending_ |
| Q18 | Is there a submission cut-off (e.g., bills for a month must arrive by the 5th of the next month)? | _Pending_ |
| Q19 | Which currencies are supported, and how are exchange rates handled if the PO and bill differ? | _Pending_ |

## REQ-03 — The Accounts Payable team can review, approve, or reject bills

| Ref | Clarification Question | Client Response |
|-----|------------------------|-----------------|
| Q20 | Is approval single-step or multi-level (e.g., AP clerk → AP manager above a value threshold)? | _Pending_ |
| Q21 | Is a comment mandatory on rejection, and is that comment visible to the vendor? | _Pending_ |
| Q22 | How many times can a rejected bill be corrected and resubmitted? Is there a limit? | _Pending_ |
| Q23 | Can a reviewer reassign a bill to a different approver or place it on hold pending information? | _Pending_ |
| Q24 | Is there an SLA for decisions, and what happens to bills breaching it (auto-escalate, flag)? | _Pending_ |
| Q25 | Can a reviewer partially approve a bill — accept some line items and query others? | _Pending_ |
| Q26 | What filter, search, and sort controls must the AP work-queue provide (by vendor, age, value, status)? | _Pending_ |
| Q27 | Can the AP team add internal notes that the vendor never sees? | _Pending_ |

## REQ-04 — Approved bills are routed to payment processing

| Ref | Clarification Question | Client Response |
|-----|------------------------|-----------------|
| Q28 | What does "routed to payment" mean technically — ERP/SAP push, a message queue, or an email to finance? | _Pending_ |
| Q29 | What is the target payment turnaround after approval, and is it tracked? | _Pending_ |
| Q30 | Who can view the payment status of a bill — the vendor, AP only, or finance only? | _Pending_ |
| Q31 | Which payment methods are in scope (bank transfer, cheque, virtual card)? | _Pending_ |
| Q32 | Are payment reference/UTR numbers captured and shown back on the bill record? | _Pending_ |
| Q33 | If a payment fails or is reversed, does the bill return to a pending/exception state? | _Pending_ |
| Q34 | What audit-trail and retention rules apply to payment records (e.g., immutable log, 7-year retention)? | _Pending_ |

## REQ-05 — Both parties receive notifications on status changes

| Ref | Clarification Question | Client Response |
|-----|------------------------|-----------------|
| Q35 | What is the complete list of events that trigger a notification? | _Pending_ |
| Q36 | For each event, who is notified — vendor, AP, finance, or a combination? | _Pending_ |
| Q37 | Are in-app notifications required in addition to email? Is SMS in scope? | _Pending_ |
| Q38 | Can users opt out of, or configure, specific notification types? | _Pending_ |
| Q39 | If email delivery fails (bounce, mailbox full), is there a retry policy and a dead-letter view? | _Pending_ |
| Q40 | Are there branding/template and localisation requirements for notification content? | _Pending_ |

## REQ-06 — The system produces monthly bill-activity reports

| Ref | Clarification Question | Client Response |
|-----|------------------------|-----------------|
| Q41 | Which columns must the report contain (vendor, bill count, total value, approval rate, average cycle time)? | _Pending_ |
| Q42 | In which formats is the report delivered — on-screen dashboard, Excel, PDF, or all three? | _Pending_ |
| Q43 | Who may generate/download reports — every AP user, managers only, or also vendors (their own data)? | _Pending_ |
| Q44 | Which filters are required (vendor, date range, status, department, cost centre)? | _Pending_ |
| Q45 | Are reports auto-generated and emailed at month-end, on demand, or both? | _Pending_ |
| Q46 | What is the retention requirement for historical reports? | _Pending_ |

## REQ-07 — Only authorised users may access the system

| Ref | Clarification Question | Client Response |
|-----|------------------------|-----------------|
| Q47 | What are the distinct roles (Vendor, AP Clerk, AP Manager, Finance, Admin, Auditor)? | _Pending_ |
| Q48 | What is the exact permission matrix per role and per module (view/create/edit/approve/export/delete)? | _Pending_ |
| Q49 | Can an Admin grant or revoke individual permissions on a per-user basis, overriding the role default? | _Pending_ |
| Q50 | Is IP allow-listing or VPN required for internal (AP/finance) users? | _Pending_ |
| Q51 | Must all access and privileged actions be logged for audit, and for how long are logs kept? | _Pending_ |
| Q52 | How is access revoked when a vendor contract ends or an employee leaves — immediate disable, or scheduled? | _Pending_ |

---

### Cross-cutting questions (not tied to a single requirement)

- **Data residency:** Where is vendor and bill data stored, and are there regional compliance constraints?
- **Concurrency:** What happens when an AP user approves a bill at the same moment the vendor recalls it?
- **Soft delete vs. hard delete:** When a bill or account is "removed", is the record retained for audit?
- **Time zones:** Whose time zone governs cut-off dates and report periods — vendor, server, or organisation?
