# 6. Test Data Specification

**Project:** Vendor Bill & Payment Hub
**Document Type:** Test Data Specification
**Version:** 1.0

---

All data below must be seeded into the QA environment before execution begins. Where possible, use a repeatable seed script so the data set can be reset between cycles.

## 6.1 User Accounts

| User ID | Email | Organisation | Role | Status |
|---------|-------|--------------|------|--------|
| V001 | vendor1@northwind.example | Northwind Components | Vendor (Submitter) | Active |
| V002 | vendor2@stellar.example | Stellar Logistics | Vendor (Submitter) | Active |
| V003 | viewer@northwind.example | Northwind Components | Vendor (Viewer) | Active |
| V004 | vendor4@meridian.example | Meridian Tools | Vendor | Inactive |
| AP001 | clerk@hub.internal | Internal | AP Clerk | Active |
| AP002 | manager@hub.internal | Internal | AP Manager | Active |
| FN001 | finance@hub.internal | Internal | Finance | Active |
| ADM01 | admin@hub.internal | Internal | Admin | Active |
| AUD01 | auditor@hub.internal | Internal | Auditor (read-only) | Active |

## 6.2 Purchase Orders

| PO Number | Vendor | PO Value | Remaining Balance | Status | Notes |
|-----------|--------|----------|-------------------|--------|-------|
| PO-7001 | Northwind (V001) | ₹1,00,000 | ₹1,00,000 | Open | Positive-flow billing |
| PO-7002 | Northwind (V001) | ₹50,000 | ₹30,000 | Open | Over-billing / partial tests |
| PO-7003 | Stellar (V002) | ₹75,000 | ₹0 | Fully Consumed | Bill against consumed PO |
| PO-7004 | Northwind (V001) | ₹25,000 | ₹25,000 | Closed | Bill against closed PO |
| PO-9999 | N/A | N/A | N/A | Does not exist | Invalid PO entry |

## 6.3 Test Bill Files

| File Name | Format | Size | Purpose |
|-----------|--------|------|---------|
| bill_june.pdf | PDF | 2 MB | Standard successful submission |
| bill_6mb.pdf | PDF | 6 MB | Over the 5 MB limit — negative |
| bill_5_0mb.pdf | PDF | 5.0 MB | Boundary at exact limit (inclusive) |
| bill_5_1mb.pdf | PDF | 5.1 MB | Boundary just over the limit |
| payload.exe | EXE | 1 MB | Unsupported type — negative |
| bill_script.pdf | PDF | 3 MB | PDF with embedded script — security |
| bill_scan.jpg | JPEG | 1.5 MB | Image-format support |
| bill_empty.pdf | PDF | 0 KB | Zero-byte / corrupt-file edge case |

## 6.4 Data Handling Notes

- **No production data** is to be copied into QA; all values above are synthetic.
- Reset the data set at the start of each regression cycle to keep tests reproducible (a core quality of a good test case).
- Currency values use `₹` to match the client's locale; adjust if multi-currency clarifications (Q19) change the scope.
