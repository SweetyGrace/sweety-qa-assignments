# 07 — Bug Report Template & Samples

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Defect Reporting
**Version:** 1.0
**Owner:** QA Team

---

## 7.1 What makes a bug report worth reading

A good report gets fixed on the first pass. A poor one gets bounced back as "Cannot Reproduce" and wastes a round-trip. Every report we file carries: a one-line title that says *module → what happens → when*, exact reproduction steps, expected-vs-actual side by side, the environment, and evidence (screenshot/log/API response). Severity describes **impact**; priority describes **urgency** — they are not the same thing.

## 7.2 Template

| Field | Value |
|-------|-------|
| Bug ID | _(auto, Jira)_ |
| Title | _Module — what happens — when_ |
| Reporter | _QA engineer_ |
| Date reported | _DD-MMM-YYYY_ |
| Environment | _QA / Staging / UAT · browser · OS · build_ |
| Feature / Module | _e.g. Invoice Submission_ |
| Requirement ID | _e.g. REQ-02_ |
| Severity | Critical / High / Medium / Low |
| Priority | P1 / P2 / P3 / P4 |
| Reproducibility | Always / Intermittent / Unable to reproduce |
| Preconditions | _system state before the steps_ |
| Steps to reproduce | 1. … 2. … 3. … |
| Expected result | _what should happen_ |
| Actual result | _what actually happened_ |
| Attachments | _screenshot / video / API response / log_ |
| Assigned to | _developer_ |
| Status | Open / In Progress / Fixed / Verified / Closed |

---

## 7.3 Sample defects

### BUG-001 — Invoice submitted with no file attached

| Field | Value |
|-------|-------|
| Title | Invoice Submission — vendor can submit the form without attaching a file |
| Environment | QA · Chrome 126 · Windows 11 · Build 2.3.1 |
| Feature / Req | Invoice Submission / REQ-02 |
| Severity | High |
| Priority | P1 |
| Reproducibility | Always |
| Preconditions | Vendor V001 logged in; PO-1001 open |
| Steps | 1. Open **Submit Invoice**. 2. Fill all mandatory text fields validly. 3. Attach **no** file. 4. Click **Submit**. |
| Expected | Validation error "Invoice file attachment is required." Form not submitted. |
| Actual | Invoice is created with status *Pending Review* despite having no file. The record shows a blank attachment. |
| Attachments | screenshot_bug001.png, api_response_bug001.json |

**QA note:** the file check appears to be client-side only, so the API accepts a fileless request. Covered going forward by the added server-side test TC-013 / TS-036.

### BUG-002 — Vendor can open the AP queue by direct URL

| Field | Value |
|-------|-------|
| Title | Access Control — Vendor role can reach the AP invoice queue via direct URL |
| Environment | QA · Firefox 127 · macOS 14 · Build 2.3.1 |
| Feature / Req | RBAC / REQ-07 |
| Severity | Critical |
| Priority | P1 |
| Reproducibility | Always |
| Preconditions | Vendor V001 logged in, role = Vendor |
| Steps | 1. Log in as Vendor V001. 2. Navigate directly to `/ap/invoice-queue`. 3. Observe the page. |
| Expected | Access denied — redirect to vendor dashboard or HTTP 403. |
| Actual | The AP queue renders fully and shows pending invoices from **all** vendors; Approve/Reject buttons are functional. |
| Attachments | screenshot_bug002.png |

**QA note:** this is a missing server-side authorization check on the AP routes — a textbook broken-access-control issue (OWASP A01). It must be fixed before UAT. Covered by TC-029 / TS-029.
