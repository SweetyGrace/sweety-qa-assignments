# API Test Plan
## ShopEasy — E-Commerce Order Management API (PetStore)

| Field | Details |
|-------|---------|
| **Base URL** | https://petstore.swagger.io/v2 |
| **Swagger UI** | https://petstore.swagger.io/#/ |
| **Tool** | Postman |
| **Execution** | Newman CLI |
| **Report Format** | HTML (newman-reporter-htmlextra) |

---

## 1. Objective

Validate all 12 API endpoints of the PetStore service covering:
- Correct HTTP status codes for positive and negative scenarios
- Response body structure and field validation
- Authentication and authorization behaviour
- Error handling for invalid inputs

---

## 2. Scope

### In Scope
- All 12 endpoints across Pet, Store, and User modules
- Positive test: valid inputs → expected success response
- Negative test: invalid/missing inputs → expected error response
- Response time assertion (< 3000ms per request)
- Status code assertions
- Response body field assertions

### Out of Scope
- Performance/load testing
- UI testing
- Third-party payment gateway internals

---

## 3. API Modules & Endpoints

| # | Method | Endpoint | Module | Priority |
|---|--------|----------|--------|----------|
| 1 | POST | /pet | Pet | High |
| 2 | GET | /pet/{petId} | Pet | High |
| 3 | PUT | /pet | Pet | High |
| 4 | DELETE | /pet/{petId} | Pet | Medium |
| 5 | GET | /store/inventory | Store | Medium |
| 6 | POST | /store/order | Store | High |
| 7 | GET | /store/order/{orderId} | Store | High |
| 8 | DELETE | /store/order/{orderId} | Store | Medium |
| 9 | POST | /user | User | High |
| 10 | GET | /user/login | User | High |
| 11 | GET | /user/{username} | User | Medium |
| 12 | DELETE | /user/{username} | User | Medium |

---

## 4. Test Approach

| Phase | Activity |
|-------|---------|
| Setup | Import collection in Postman; set environment variables |
| Execution | Run collection via Newman |
| Assertions | Status code, response body, response time per request |
| Reporting | Generate HTML report via newman-reporter-htmlextra |

---

## 5. Environment Variables (Postman)

| Variable | Value |
|----------|-------|
| `baseUrl` | https://petstore.swagger.io/v2 |
| `petId` | (set dynamically from POST /pet response) |
| `orderId` | (set dynamically from POST /store/order response) |
| `username` | testuser_qa |
| `password` | Test@1234 |

---

## 6. Entry & Exit Criteria

**Entry Criteria**
- Postman installed and collection imported
- Environment variables configured
- API is reachable (health check passes)

**Exit Criteria**
- All 24 test cases executed
- Newman HTML report generated
- All critical (High priority) tests passing

---

## 7. Risk

| Risk | Mitigation |
|------|-----------|
| PetStore is a public shared API — test data may be modified by others | Use unique IDs; re-run if data is missing |
| Dynamic IDs needed across requests | Use Postman `pm.environment.set()` in Tests tab to chain requests |
