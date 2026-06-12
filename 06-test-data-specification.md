# 06 — Test Data Specification

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Test Data Specification
**Version:** 1.0
**Owner:** QA Team

---

All of the data below must be seeded into the QA environment **before** execution starts. Wherever possible it should be created by a repeatable seed script so the environment can be refreshed each sprint without manual setup. This is the *minimum* set; testers may add ad-hoc data for exploratory work.

## 6.1 User accounts

| ID | Email | Company | Role | Status |
|----|-------|---------|------|--------|
| V001 | vendor1@test.com | Alpha Supplies | Vendor | Active |
| V002 | vendor2@test.com | Beta Traders | Vendor | Active |
| V003 | vendor3@test.com | Gamma Corp | Vendor | Inactive |
| AP001 | apclerk@company.com | Internal | AP Clerk | Active |
| AP002 | apmanager@company.com | Internal | AP Manager | Active |
| ADM01 | admin@company.com | Internal | Admin | Active |

> V003 is deliberately *Inactive* so we can verify that deactivated vendors cannot log in or submit. AP001 vs AP002 lets us prove role separation within the AP team (clerk vs manager).

## 6.2 Purchase orders

| PO Number | Vendor | PO Value | Status | Intended use |
|-----------|--------|----------|--------|--------------|
| PO-1001 | Alpha Supplies (V001) | ₹1,00,000 | Open | Positive submission flows |
| PO-1002 | Beta Traders (V002) | ₹50,000 | Open | Partial-invoicing tests |
| PO-1003 | Alpha Supplies (V001) | ₹25,000 | Closed | Submission-against-closed-PO test |
| PO-9999 | — | — | Does not exist | Invalid-PO test |

## 6.3 Invoice files

| File | Format | Size | Purpose |
|------|--------|------|---------|
| valid_invoice.pdf | PDF | 2 MB | Standard happy-path submission |
| large_invoice.pdf | PDF | 12 MB | Over the size limit — negative |
| invoice.exe | EXE | 1 MB | Unsupported format — negative |
| invoice_script.pdf | PDF | 3 MB | PDF with embedded script — security |
| invoice_image.jpg | JPEG | 1.5 MB | Image-format support |
| boundary_10mb.pdf | PDF | 10.0 MB | Boundary — exactly at the limit |
| boundary_10_1mb.pdf | PDF | 10.1 MB | Boundary — just over the limit |
| empty_submission (no file) | — | — | *(Added)* No-attachment negative test (TS-036 / TC-013) |

> **Boundary note:** the original spec used 5 MB boundary files while the test cases assume a 10 MB limit — a contradiction. Until Q11 is answered, the boundary files here are aligned to the **10 MB** limit used in TC-012; they must be regenerated if the confirmed limit differs.

## 6.4 Data hygiene rules

- No real vendor or banking data in any non-production environment.
- Passwords for seeded accounts follow the confirmed password policy (pending Q4); until then, `Test@1234` is the placeholder.
- The seed script must be idempotent — re-running it should reset, not duplicate, the data set.
