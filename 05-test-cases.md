# 05 — Test Cases

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Detailed Test Cases
**Version:** 1.0
**Owner:** QA Team

---

A test case answers **"how exactly do we test it?"** — exact preconditions, numbered steps, and a single unambiguous expected result. Below is a representative set covering the highest-risk scenarios; a full suite would have a case for every scenario in `04-test-scenarios.md`. *Actual Result* and *Pass/Fail* are left blank for execution.

> **Reading the IDs:** `TC-xxx` maps to a scenario `TS-xxx`, which maps to a requirement `REQ-xx`. The chain is what makes the RTM (`08`) work.

---

### TC-001 — Successful vendor registration
- **Scenario / Req:** TS-001 / REQ-01 · **Priority:** High · **Type:** Positive
- **Preconditions:** Registration page reachable. No existing account for the test email.
- **Steps:**
  1. Open the vendor registration page.
  2. Company Name → `ABC Supplies Pvt Ltd`
  3. Tax/GST ID → `GSTIN123456`
  4. Email → `vendor@abcsupplies.com`
  5. Password → `Test@1234`, and confirm it
  6. Contact → `John Doe`, Phone → `9876543210`
  7. Click **Register**.
- **Expected:** Registration succeeds, a confirmation email is sent, and the vendor lands on a "Pending Activation" (or dashboard) screen.
- **Actual:** _____ · **Pass/Fail:** _____

### TC-002 — Registration blocked on missing mandatory field
- **Scenario / Req:** TS-002 / REQ-01 · **Priority:** High · **Type:** Negative
- **Preconditions:** Registration page reachable.
- **Steps:**
  1. Open the registration page.
  2. Leave **Company Name** empty.
  3. Fill every other mandatory field with valid data.
  4. Click **Register**.
- **Expected:** Submission is refused. Inline error "Company Name is required" appears beside the field. No account is created.
- **Actual:** _____ · **Pass/Fail:** _____

### TC-003 — Account lockout after 5 failed logins
- **Scenario / Req:** TS-006 / REQ-01 · **Priority:** High · **Type:** Negative
- **Preconditions:** An activated account exists for `vendor@abcsupplies.com`.
- **Steps:**
  1. Open the login page.
  2. Enter the email with a wrong password (`Wrong@123`) and submit; note the error.
  3. Repeat the wrong-password attempt four more times (5 total).
  4. Observe the response on the 5th attempt.
- **Expected:** After the 5th failure the account locks: "Your account has been temporarily locked. Please contact support or try again after 30 minutes." Further attempts are blocked.
- **Actual:** _____ · **Pass/Fail:** _____

### TC-010 — Successful invoice submission with valid PO
- **Scenario / Req:** TS-008 / REQ-02 · **Priority:** Critical · **Type:** Positive
- **Preconditions:** Vendor logged in. `PO-1001` exists with status *Open*. A valid 2 MB PDF is ready.
- **Steps:**
  1. From the dashboard, click **Submit Invoice**.
  2. Invoice Number → `INV-2026-0055`
  3. Select PO → `PO-1001`
  4. Invoice Date → `01-Jun-2026`
  5. Amount → `50,000`
  6. Upload `invoice_june.pdf` (2 MB PDF)
  7. Click **Submit**.
- **Expected:** Invoice is accepted with status *Pending Review*, appears in the AP queue, and a confirmation email goes to the vendor.
- **Actual:** _____ · **Pass/Fail:** _____

### TC-011 — Upload rejects unsupported format
- **Scenario / Req:** TS-010 / REQ-02 · **Priority:** High · **Type:** Negative
- **Preconditions:** Vendor logged in. `malware.exe` available.
- **Steps:**
  1. Click **Submit Invoice**.
  2. Fill all mandatory fields validly.
  3. Try to upload `malware.exe`.
  4. Click **Submit**.
- **Expected:** Upload is refused before submission: "File format not supported. Please upload PDF, JPEG, or PNG files only." No invoice is created.
- **Actual:** _____ · **Pass/Fail:** _____

### TC-012 — Upload rejects oversize file
- **Scenario / Req:** TS-011 / REQ-02 · **Priority:** High · **Type:** Negative (boundary)
- **Preconditions:** Vendor logged in. A 12 MB PDF is ready (limit assumed 10 MB).
- **Steps:**
  1. Click **Submit Invoice**.
  2. Fill all mandatory fields validly.
  3. Upload `12mb_invoice.pdf`.
  4. Click **Submit**.
- **Expected:** Upload refused: "File size exceeds the 10MB limit. Please upload a smaller file." No invoice is created.
- **Actual:** _____ · **Pass/Fail:** _____

### TC-013 — *(Added)* File attachment enforced server-side
- **Scenario / Req:** TS-036 / REQ-02 · **Priority:** High · **Type:** Negative
- **Preconditions:** Vendor logged in. `PO-1001` open. Browser dev-tools / API client available.
- **Steps:**
  1. Begin a submission and fill all text fields validly, attaching no file.
  2. Submit the request directly to the API (bypassing any client-side guard).
  3. Inspect the response and the resulting record.
- **Expected:** The server rejects the request ("Invoice file attachment is required."); no invoice record is created with a blank attachment. *(Directly targets BUG-001.)*
- **Actual:** _____ · **Pass/Fail:** _____

### TC-020 — AP user approves a valid invoice
- **Scenario / Req:** TS-016 / REQ-03 · **Priority:** Critical · **Type:** Positive
- **Preconditions:** AP user logged in. `INV-2026-0055` is *Pending Review*.
- **Steps:**
  1. Open the **Invoice Queue** as the AP user.
  2. Find `INV-2026-0055`.
  3. Click **View Details**.
  4. Review details, PO match, and the uploaded document.
  5. Click **Approve** and confirm.
- **Expected:** Status → *Approved*. Invoice moves to the payment-forwarding queue. Vendor and AP both get emails. Approval timestamp and approver name are logged.
- **Actual:** _____ · **Pass/Fail:** _____

### TC-021 — AP user rejects invoice with mandatory reason
- **Scenario / Req:** TS-017 / REQ-03 · **Priority:** High · **Type:** Positive + Negative
- **Preconditions:** AP user logged in. `INV-2026-0055` is *Pending Review*.
- **Steps:**
  1. Open the Invoice Queue, **View Details** on `INV-2026-0055`.
  2. Click **Reject**.
  3. Leave the reason blank and click **Confirm**; observe.
  4. Enter reason: `Invoice amount does not match PO-1001 agreed value`.
  5. Click **Confirm Rejection**.
- **Expected:** Step 3 → validation error "Rejection reason is required." Step 5 → status *Rejected*; vendor receives an email containing the reason; invoice is returned for resubmission.
- **Actual:** _____ · **Pass/Fail:** _____

### TC-029 — Vendor cannot access AP approval module
- **Scenario / Req:** TS-029 / REQ-07 · **Priority:** Critical · **Type:** Security
- **Preconditions:** A user logged in with role = `Vendor`.
- **Steps:**
  1. Log in as a vendor.
  2. Navigate directly to the AP URL `/ap/invoice-queue`.
  3. Observe the response.
- **Expected:** Access denied — redirect to the vendor dashboard or a `403 Forbidden`. No AP data is exposed. *(Directly targets BUG-002.)*
- **Actual:** _____ · **Pass/Fail:** _____

### TC-030 — File upload security: embedded script
- **Scenario / Req:** TS-033 / REQ-07 · **Priority:** Critical · **Type:** Security
- **Preconditions:** Vendor logged in. A file with an embedded script payload is prepared.
- **Steps:**
  1. Click **Submit Invoice**, fill valid fields.
  2. Upload `invoice.pdf` carrying an embedded JavaScript payload.
  3. Submit.
  4. If accepted, try to view/download the stored file.
- **Expected:** Either the file is rejected at upload (preferred) **or** it is stored but the script never executes on retrieval. No XSS or remote code execution occurs.
- **Actual:** _____ · **Pass/Fail:** _____
