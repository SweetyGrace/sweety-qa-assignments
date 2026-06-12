# 5. Test Cases

**Project:** Vendor Bill & Payment Hub
**Document Type:** Detailed Test Cases (representative set)
**Version:** 1.0

---

This is a representative set of detailed cases; a full suite would cover every scenario in document 04. Each case is atomic, reproducible, includes concrete test data, and traces to a requirement.

---

### TC-101 — Successful Vendor Registration
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-001 / REQ-01 |
| Priority / Type | High / Positive |
| **Preconditions** | Registration page reachable. No existing account for the test email. |
| **Steps** | 1. Open the vendor registration page. 2. Company Name: `Northwind Components Pvt Ltd`. 3. Tax/GST ID: `GSTIN29NRTH1234`. 4. Email: `billing@northwind.example`. 5. Password `Vendor@2026` (and confirm). 6. Contact: `Priya Nair`, Phone `9123456780`. 7. Click **Register**. |
| **Expected Result** | Registration succeeds. A confirmation email is sent. Vendor lands on a "Pending Verification" screen until an admin activates the account. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-102 — Registration Rejected on Missing Mandatory Field
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-002 / REQ-01 |
| Priority / Type | High / Negative |
| **Preconditions** | Registration page reachable. |
| **Steps** | 1. Open registration. 2. Leave **Company Name** empty. 3. Fill all other mandatory fields validly. 4. Click **Register**. |
| **Expected Result** | Submission is blocked. Inline error `Company Name is required` shows next to the field. No account is created. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-103 — Account Lockout After 5 Failed Sign-ins
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-006 / REQ-01 |
| Priority / Type | High / Negative |
| **Preconditions** | An activated account exists for `billing@northwind.example`. |
| **Steps** | 1. Open sign-in. 2. Enter the email with wrong password `Bad@123`. 3. Submit; note the error. 4. Repeat four more times (5 total). 5. Observe the response on the 5th attempt. |
| **Expected Result** | After the 5th failure the account locks. Message: `Your account is temporarily locked. Try again in 30 minutes or contact support.` Further attempts are blocked even with the correct password until unlock. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-110 — Successful Bill Submission Against an Open PO
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-009 / REQ-02 |
| Priority / Type | Critical / Positive |
| **Preconditions** | Vendor signed in. `PO-7001` exists with status **Open** and sufficient balance. A valid 2 MB PDF is ready. |
| **Steps** | 1. Click **Submit Bill**. 2. Bill Number `BILL-2026-0210`. 3. Select PO `PO-7001`. 4. Bill Date `02-Jun-2026`. 5. Amount `45,000`. 6. Upload `bill_june.pdf` (2 MB). 7. Click **Submit**. |
| **Expected Result** | Bill is accepted with status **Pending Review**, appears in the AP queue, and a confirmation email is sent to the vendor. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-111 — Upload Rejects Unsupported File Type
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-011 / REQ-02 |
| Priority / Type | High / Negative |
| **Preconditions** | Vendor signed in. A file `payload.exe` is available. |
| **Steps** | 1. Click **Submit Bill**. 2. Fill all mandatory fields validly. 3. Attempt to upload `payload.exe`. 4. Click **Submit**. |
| **Expected Result** | Upload is blocked before submission. Error: `File type not supported. Upload PDF, JPEG, or PNG only.` No bill is created. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-112 — Upload Rejects File Over the Size Limit
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-012 / REQ-02 |
| Priority / Type | High / Negative |
| **Preconditions** | Vendor signed in. A 6 MB PDF is ready. (Assumed limit: 5 MB.) |
| **Steps** | 1. Click **Submit Bill**. 2. Fill mandatory fields. 3. Upload `bill_6mb.pdf`. 4. Click **Submit**. |
| **Expected Result** | Upload rejected. Error: `File exceeds the 5 MB limit. Upload a smaller file.` No bill is created. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-113 — Boundary Value at Exact Size Limit (BVA)
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-013 / REQ-02 |
| Priority / Type | Medium / Boundary |
| **Preconditions** | Vendor signed in. A PDF of exactly 5.0 MB is ready. |
| **Steps** | 1. Submit a bill attaching `bill_5_0mb.pdf`. 2. Click **Submit**. |
| **Expected Result** | A file at exactly 5.0 MB is accepted (limit is inclusive). A 5.1 MB file is rejected. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-114 — Over-billing Beyond Remaining PO Balance Is Blocked
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-016 / REQ-02 |
| Priority / Type | High / Negative |
| **Preconditions** | `PO-7002` has a remaining balance of `30,000`. Vendor signed in. |
| **Steps** | 1. Submit a bill against `PO-7002` for amount `35,000`. 2. Click **Submit**. |
| **Expected Result** | Submission is blocked. Error: `Bill amount exceeds the remaining PO balance of 30,000.` No bill is created. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-120 — AP User Approves a Valid Bill
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-019 / REQ-03 |
| Priority / Type | Critical / Positive |
| **Preconditions** | AP user signed in. Bill `BILL-2026-0210` is in **Pending Review**. |
| **Steps** | 1. Open the **Bill Queue**. 2. Locate `BILL-2026-0210`. 3. Open **View Details**. 4. Review fields, PO match, and document. 5. Click **Approve**. 6. Confirm in the dialog. |
| **Expected Result** | Status changes to **Approved**; bill moves to the payment queue; vendor and AP receive notifications; approver name and timestamp are logged. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-121 — AP User Must Provide a Reason to Reject
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-020 / REQ-03 |
| Priority / Type | High / Positive + Negative |
| **Preconditions** | AP user signed in. Bill `BILL-2026-0210` in **Pending Review**. |
| **Steps** | 1. Open the bill. 2. Click **Reject**. 3. Leave the reason empty; click **Confirm** → observe validation. 4. Enter reason `Amount does not match PO-7001 agreed value`. 5. Click **Confirm Rejection**. |
| **Expected Result** | Step 3: error `Rejection reason is required.` Step 5: status → **Rejected**; vendor receives the reason by email; bill returns to the vendor for correction. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-123 — Concurrency: Recall vs. Approve
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-023 / REQ-02, REQ-03 |
| Priority / Type | Medium / Edge |
| **Preconditions** | Bill `BILL-2026-0211` is in **Pending Review**. Vendor and AP user both have it open. |
| **Steps** | 1. Vendor clicks **Recall** at (nearly) the same moment the AP user clicks **Approve**. 2. Observe the final state and both screens. |
| **Expected Result** | Exactly one action wins; the other receives a clear message (`This bill was just updated; please refresh`). No partial/duplicate state; audit log records both attempts. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-134 — Vendor Cannot Reach AP Approval Module (RBAC)
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-034 / REQ-07 |
| Priority / Type | Critical / Security |
| **Preconditions** | A user with role **Vendor** is signed in. |
| **Steps** | 1. Sign in as a vendor. 2. Navigate directly to the AP route `/ap/bill-queue`. 3. Observe the response. |
| **Expected Result** | Access denied — redirected to the vendor dashboard or shown **403 Forbidden**. No AP data is exposed in the page or the network response. |
| Actual / Pass-Fail | _to be filled during execution_ |

### TC-138 — File Upload Security: Malicious Script
| Field | Value |
|-------|-------|
| Scenario / Requirement | TS-038 / REQ-07 |
| Priority / Type | Critical / Security |
| **Preconditions** | Vendor signed in. A PDF carrying an embedded JavaScript payload is prepared. |
| **Steps** | 1. Submit a bill attaching `bill_script.pdf`. 2. If accepted, attempt to view/download it. |
| **Expected Result** | The file is rejected at upload (preferred) or stored inertly — the embedded script never executes on view/download. No XSS or remote code execution occurs. |
| Actual / Pass-Fail | _to be filled during execution_ |
