# Assignment 2 — API Testing
## ShopEasy E-Commerce Order Management API Challenge (using PetStore)

| Field | Details |
|-------|---------|
| **Assignment** | API Testing — E-Commerce Order Management |
| **Reference API** | PetStore Swagger — https://petstore.swagger.io |
| **Base URL** | https://petstore.swagger.io/v2 |
| **Swagger UI** | https://petstore.swagger.io/#/ |
| **Auth** | API Key (`api_key` header) |
| **Tool** | Postman + Newman |

---

## Scenario

You are a QA Engineer for ShopEasy, a growing e-commerce platform. The backend team has deployed a new Order Management microservice. Your task is to validate all APIs before this feature goes live using the PetStore Swagger as the reference test environment.

---

## API Modules to Test

| Module | Endpoints |
|--------|-----------|
| Pet (Products) | POST /pet, GET /pet/{petId}, PUT /pet, DELETE /pet/{petId} |
| Store (Orders) | GET /store/inventory, POST /store/order, GET /store/order/{orderId}, DELETE /store/order/{orderId} |
| User (Auth) | POST /user, GET /user/login, GET /user/{username}, DELETE /user/{username} |

**Total: 12 endpoints — 1 positive + 1 negative test each = 24 test cases**

---

## Deliverables

- [x] API Test Plan
- [x] Test Cases (24 — positive + negative per endpoint)
- [x] Postman Collection (JSON — importable)
- [ ] Newman HTML Report (generate after running collection)

---

## Folder Structure

```
assignment-2/
├── README.md                          ← This file
├── output/                            ← Newman HTML report goes here
│   └── newman-report.html
└── QA_Artifacts/
    ├── 01_API_Test_Plan.md
    ├── 02_API_Test_Cases.md
    ├── 03_Postman_Collection_Guide.md
    └── ShopEasy_PetStore_Collection.json
```

---

## How to Run

**Install Newman**
```bash
npm install -g newman
npm install -g newman-reporter-htmlextra
```

**Run Collection**
```bash
cd /Users/sweety/Documents/sweety-qa-assignments/assignment-2

newman run QA_Artifacts/ShopEasy_PetStore_Collection.json --reporters htmlextra --reporter-htmlextra-export output/newman-report.html
```

**View Report**
```bash
open output/newman-report.html
```
