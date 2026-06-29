# Postman Collection Setup Guide
## ShopEasy — PetStore API Testing

---

## Step 1: Set Up Environment in Postman

Create a new Environment called **ShopEasy-PetStore** with these variables:

| Variable | Initial Value |
|----------|--------------|
| `baseUrl` | https://petstore.swagger.io/v2 |
| `petId` | 101010 |
| `orderId` | 5001 |
| `username` | testuser_qa |
| `password` | Test@1234 |
| `apiKey` | special-key |

---

## Step 2: Import the Collection

1. Open Postman
2. Click **Import** → select `ShopEasy_PetStore_Collection.json`
3. Select the **ShopEasy-PetStore** environment from the top-right dropdown

---

## Step 3: Pre-request Script (Auto Token/Key Setup)

Add this in the **Collection-level Pre-request Script** tab to auto-set the API key header for all requests:

```javascript
pm.request.headers.add({
    key: 'api_key',
    value: pm.environment.get('apiKey')
});
```

---

## Step 4: Chain Requests (Auto-set Dynamic IDs)

### After POST /pet — save petId
In the **Tests** tab of `POST /pet`:
```javascript
var jsonData = pm.response.json();
pm.environment.set("petId", jsonData.id);
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Pet name is correct", function () {
    pm.expect(jsonData.name).to.eql("BuddyQA");
});
```

### After POST /store/order — save orderId
In the **Tests** tab of `POST /store/order`:
```javascript
var jsonData = pm.response.json();
pm.environment.set("orderId", jsonData.id);
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Order status is placed", function () {
    pm.expect(jsonData.status).to.eql("placed");
});
```

---

## Step 5: Standard Assertions Template

Add to the **Tests** tab of each request:

```javascript
// Status code check
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Response time check
pm.test("Response time is less than 3000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(3000);
});

// Content-Type check
pm.test("Content-Type is application/json", function () {
    pm.response.to.have.header("Content-Type");
});
```

---

## Step 6: Run via Newman

**Install Newman and HTML reporter**
```bash
npm install -g newman
npm install -g newman-reporter-htmlextra
```

**Run the collection**
```bash
newman run ShopEasy_PetStore_Collection.json \
  --environment ShopEasy_PetStore_Environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export newman-report.html
```

**Open the report**
```bash
open newman-report.html
```

---

## Step 7: Execution Order

Run requests in this order to ensure data dependencies are met:

1. POST /user *(create user first)*
2. GET /user/login
3. GET /user/{username}
4. POST /pet *(creates petId)*
5. GET /pet/{petId}
6. PUT /pet
7. POST /store/order *(uses petId, creates orderId)*
8. GET /store/order/{orderId}
9. GET /store/inventory
10. DELETE /store/order/{orderId}
11. DELETE /pet/{petId}
12. DELETE /user/{username}
