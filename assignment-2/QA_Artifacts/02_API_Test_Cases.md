# API Test Cases
## ShopEasy — PetStore API (24 Test Cases: 1 Positive + 1 Negative per Endpoint)

**Base URL:** `https://petstore.swagger.io/v2`

---

## Module 1: Pet (Products)

### TC-01 | POST /pet — Add a New Pet

**Positive**

| Field | Details |
|-------|---------|
| **Method** | POST |
| **URL** | `{{baseUrl}}/pet` |
| **Headers** | `Content-Type: application/json` |
| **Request Body** | `{ "id": 101010, "name": "BuddyQA", "status": "available", "category": { "id": 1, "name": "Dogs" }, "photoUrls": ["https://example.com/dog.jpg"] }` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200; `response.name == "BuddyQA"`; `response.status == "available"` |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | POST |
| **URL** | `{{baseUrl}}/pet` |
| **Headers** | `Content-Type: application/json` |
| **Request Body** | `{ "id": "INVALID_ID", "name": "" }` |
| **Expected Status** | 405 |
| **Assertions** | Status = 405; error message in response |

---

### TC-02 | GET /pet/{petId} — Get Pet by ID

**Positive**

| Field | Details |
|-------|---------|
| **Method** | GET |
| **URL** | `{{baseUrl}}/pet/101010` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200; `response.id == 101010`; `response.name == "BuddyQA"` |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | GET |
| **URL** | `{{baseUrl}}/pet/9999999999` |
| **Expected Status** | 404 |
| **Assertions** | Status = 404; `response.message == "Pet not found"` |

---

### TC-03 | PUT /pet — Update Existing Pet

**Positive**

| Field | Details |
|-------|---------|
| **Method** | PUT |
| **URL** | `{{baseUrl}}/pet` |
| **Headers** | `Content-Type: application/json` |
| **Request Body** | `{ "id": 101010, "name": "BuddyQA-Updated", "status": "sold" }` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200; `response.name == "BuddyQA-Updated"`; `response.status == "sold"` |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | PUT |
| **URL** | `{{baseUrl}}/pet` |
| **Headers** | `Content-Type: application/json` |
| **Request Body** | `{ "id": 0, "name": "" }` |
| **Expected Status** | 400 or 405 |
| **Assertions** | Status = 400 or 405; error in response body |

---

### TC-04 | DELETE /pet/{petId} — Delete a Pet

**Positive**

| Field | Details |
|-------|---------|
| **Method** | DELETE |
| **URL** | `{{baseUrl}}/pet/101010` |
| **Headers** | `api_key: special-key` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200; `response.message == "101010"` |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | DELETE |
| **URL** | `{{baseUrl}}/pet/9999999999` |
| **Headers** | `api_key: special-key` |
| **Expected Status** | 404 |
| **Assertions** | Status = 404 |

---

## Module 2: Store (Orders)

### TC-05 | GET /store/inventory — Get Inventory

**Positive**

| Field | Details |
|-------|---------|
| **Method** | GET |
| **URL** | `{{baseUrl}}/store/inventory` |
| **Headers** | `api_key: special-key` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200; response is a JSON object; contains `available` or `sold` keys |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | GET |
| **URL** | `{{baseUrl}}/store/inventory` |
| **Headers** | `api_key: invalid-key-xyz` |
| **Expected Status** | 200 (PetStore returns 200 even with invalid key — assert response is not empty/error format) |
| **Assertions** | Verify response body does not return an error structure |

> Note: PetStore's /store/inventory does not strictly enforce the API key, so the negative test verifies the response structure remains valid.

---

### TC-06 | POST /store/order — Place an Order

**Positive**

| Field | Details |
|-------|---------|
| **Method** | POST |
| **URL** | `{{baseUrl}}/store/order` |
| **Headers** | `Content-Type: application/json` |
| **Request Body** | `{ "id": 5001, "petId": 101010, "quantity": 1, "status": "placed", "complete": false }` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200; `response.id == 5001`; `response.status == "placed"` |
| **Post-Script** | `pm.environment.set("orderId", pm.response.json().id)` |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | POST |
| **URL** | `{{baseUrl}}/store/order` |
| **Headers** | `Content-Type: application/json` |
| **Request Body** | `{ "id": "INVALID", "quantity": -1 }` |
| **Expected Status** | 400 |
| **Assertions** | Status = 400; error message present |

---

### TC-07 | GET /store/order/{orderId} — Get Order by ID

**Positive**

| Field | Details |
|-------|---------|
| **Method** | GET |
| **URL** | `{{baseUrl}}/store/order/5001` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200; `response.id == 5001`; `response.petId == 101010` |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | GET |
| **URL** | `{{baseUrl}}/store/order/9999999` |
| **Expected Status** | 404 |
| **Assertions** | Status = 404; `response.message == "Order not found"` |

---

### TC-08 | DELETE /store/order/{orderId} — Cancel Order

**Positive**

| Field | Details |
|-------|---------|
| **Method** | DELETE |
| **URL** | `{{baseUrl}}/store/order/5001` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200; `response.message == "5001"` |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | DELETE |
| **URL** | `{{baseUrl}}/store/order/0` |
| **Expected Status** | 404 |
| **Assertions** | Status = 404; error message in response |

---

## Module 3: User (Auth)

### TC-09 | POST /user — Create User

**Positive**

| Field | Details |
|-------|---------|
| **Method** | POST |
| **URL** | `{{baseUrl}}/user` |
| **Headers** | `Content-Type: application/json` |
| **Request Body** | `{ "id": 9001, "username": "testuser_qa", "firstName": "QA", "lastName": "Tester", "email": "qa@shopeasy.com", "password": "Test@1234", "phone": "9876543210", "userStatus": 1 }` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200; `response.message == "9001"` |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | POST |
| **URL** | `{{baseUrl}}/user` |
| **Headers** | `Content-Type: application/json` |
| **Request Body** | `{}` (empty body) |
| **Expected Status** | 400 or 405 |
| **Assertions** | Status = 400 or 405 |

---

### TC-10 | GET /user/login — Login User

**Positive**

| Field | Details |
|-------|---------|
| **Method** | GET |
| **URL** | `{{baseUrl}}/user/login?username=testuser_qa&password=Test@1234` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200; response contains session token string |
| **Post-Script** | Extract and store session token if returned |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | GET |
| **URL** | `{{baseUrl}}/user/login?username=&password=` |
| **Expected Status** | 400 |
| **Assertions** | Status = 400; error message `"Invalid username/password supplied"` |

---

### TC-11 | GET /user/{username} — Get User by Username

**Positive**

| Field | Details |
|-------|---------|
| **Method** | GET |
| **URL** | `{{baseUrl}}/user/testuser_qa` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200; `response.username == "testuser_qa"`; `response.email == "qa@shopeasy.com"` |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | GET |
| **URL** | `{{baseUrl}}/user/nonexistentuser_xyz_99999` |
| **Expected Status** | 404 |
| **Assertions** | Status = 404; `response.message == "User not found"` |

---

### TC-12 | DELETE /user/{username} — Delete User

**Positive**

| Field | Details |
|-------|---------|
| **Method** | DELETE |
| **URL** | `{{baseUrl}}/user/testuser_qa` |
| **Expected Status** | 200 |
| **Assertions** | Status = 200 |

**Negative**

| Field | Details |
|-------|---------|
| **Method** | DELETE |
| **URL** | `{{baseUrl}}/user/nonexistentuser_xyz_99999` |
| **Expected Status** | 404 |
| **Assertions** | Status = 404; `response.message == "User not found"` |

---

## Summary

| Module | Endpoints | Positive | Negative | Total |
|--------|-----------|----------|----------|-------|
| Pet | 4 | 4 | 4 | 8 |
| Store | 4 | 4 | 4 | 8 |
| User | 4 | 4 | 4 | 8 |
| **Total** | **12** | **12** | **12** | **24** |
