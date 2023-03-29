---
date: "2023-03-29"
title: "Always test a black box"
summary: "... ... ..."
categories:
  - "Testing"
---

### Example v1

#### Code (v1)

```js
function isRoleAuthorizedForResource(role, resource) {
  if (resource === 'products') return true
  return role === 'admin'
}
```

#### Tests (v1)

```js
test('Admin is authorized for "settings" resource', () => {
  const isAuthorized = isRoleAuthorizedForResource('admin', 'settings')
  expect(isAuthorized).toBe(true)
})

test('Admin is authorized for "products" resource', () => {
  const isAuthorized = isRoleAuthorizedForResource('admin', 'products')
  expect(isAuthorized).toBe(true)
})

test('User is not authorized for "settings" resource', () => {
  const isAuthorized = isRoleAuthorizedForResource('user', 'settings')
  expect(isAuthorized).toBe(false)
})

test('User is authorized for "products" resource', () => {
  const isAuthorized = isRoleAuthorizedForResource('user', 'products')
  expect(isAuthorized).toBe(true)
})
```

### Example v2

More and more resources and roles appear...

#### Code (v2)

```js
const visitorResources =  [ 'home', 'products', 'contact', 'help', 'cart', ]
const customerResources = [ ...visitorResources, 'orders', ]
const productManagerResources = [ 'order-mgt', 'product-mgt', 'content-mgt', ] 
const adminResources = [ ...productManagementResources, 'users', 'settings', 'analytics', ]

function isRoleAuthorizedForResource(role, resource) {
  // TO DO...
}
```

#### Tests v2

```js

// Oh no, now we need SOOO MANY tests... 😱

```

### Example v3

We don't update the code, only the tests:


#### Tests v3

```js

// TODO...

```

### Outline

- When writing a test, you are testing the **subject**

- In your test you verify **requirements**, which are **WHAT** the subject is expected to do

- **HOW** the subject does this, your tests should not know or care about

- The subject is the only thing in your code that tests are allowed to access

- Still, it does happen developers access more than the subject from the actual code, as a **convenience** to make testing easier.

- See **EXAMPLE**

- Chances are, however, that means you **violate** the difference between WHAT and HOW

- And even worse, that the **requirements** are not specified in your test, but are used **from the actual code**...

- What can happen is that when you change something in the code, that **implicitely** can also change the requirements...

- And still, the tests are **passing**... Until after going live shit hits the fan...

- The cause of this happening is often creating tests **AFTER** implementing the code. You see the convenience, and use it to make the tests pass...

- If you would have applied **TDD**, this probably wouldn't have happened, becuse then you would write the tests first (or during coding) and you would reason based on requirements and tests, without using anything from the actual implementation.