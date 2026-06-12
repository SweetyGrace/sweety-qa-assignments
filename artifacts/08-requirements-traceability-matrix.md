# 8. Requirements Traceability Matrix (RTM)

**Project:** Vendor Bill & Payment Hub
**Document Type:** Requirements Traceability Matrix
**Version:** 1.0

---

The RTM links every requirement to its scenarios and test cases, proving coverage in both directions: every requirement has at least one test case, and every test case traces back to a requirement.

| Req ID | Requirement | Test Scenarios | Test Case IDs | Exec Status | Result |
|--------|-------------|----------------|---------------|-------------|--------|
| REQ-01 | Vendor registration and sign-in | TS-001 → TS-008 | TC-101, TC-102, TC-103 | Executed | Pass |
| REQ-02 | Bill submission against POs | TS-009 → TS-017 | TC-110, TC-111, TC-112, TC-113, TC-114 | Executed | **Fail** |
| REQ-03 | AP approval / rejection workflow | TS-018 → TS-023 | TC-120, TC-121, TC-123 | In Progress | — |
| REQ-04 | Payment routing for approved bills | TS-024 → TS-026 | TC-140 → TC-145 | Not Started | — |
| REQ-05 | Notifications on status changes | TS-027 → TS-030 | TC-150 → TC-158 | Not Started | — |
| REQ-06 | Monthly bill-activity reports | TS-031 → TS-033 | TC-160 → TC-165 | Not Started | — |
| REQ-07 | Role-based access control | TS-034 → TS-040 | TC-134, TC-138 | Executed | **Fail** |

## Coverage Notes

- **REQ-02** failed due to **DEF-001** (no-file submission accepted) and **DEF-003** (over-billing not blocked).
- **REQ-07** failed due to **DEF-002** (vendor reaches AP queue by direct URL) — a critical access-control gap.
- **REQ-04** and **REQ-05** are not started: payment-gateway sandbox and QA email service are still being provisioned (see the Risk Register in document 03).
- Coverage gaps are tracked openly rather than hidden — silent truncation would misrepresent quality.
