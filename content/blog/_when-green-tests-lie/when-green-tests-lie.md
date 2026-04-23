---
date: "2026-04-21"
title: "When green tests lie"
summary: "Tests should verify requirements instead of reusing implementation details from the code they are testing."
categories:
  - "Testing"
---

A test should only care about the subject, the specific function or component you are verifying. This subject is the boundary. Everything behind it, like constants, helper functions, or configuration objects, are implementation details.

When a test imports these details, it stops testing requirements and starts testing whether the code agrees with itself.

## The trap of convenience

Imagine a function that checks if a user can access a page. As the app grows, you might move the list of pages into a shared array.

```js
export const adminPages = ["settings", "users"]

export function canAccessPage(role, page) {
  return role === "admin" && adminPages.includes(page)
}
```

It feels efficient to import these pages into your test to avoid duplication. You might write a loop that runs the same check for every page in that list.

```js
import { 
  // The subject: our intentional boundary and only point of contact
  canAccessPage, 
  
  // The leak: importing implementation details turns the test into a mirror
  adminPages 
} from "./canAccessPage"

test.each(adminPages)("an admin can access the %s page", (page) => {
  // If adminPages changes in the source, this test 'lies' by staying green
  expect(canAccessPage("admin", page)).toBe(true)
})
```

It looks clean and updates automatically when you add new pages. But that is exactly the problem. The test has lost its authority.

## Why mirrors fail

If the test uses the implementation to define its own expectations, it becomes a mirror. 

Suppose someone accidentally removes a value from the array in the source code. If your test imports that same array, the test for that specific page simply disappears. The test suite stays green because it no longer knows that the page should be protected. 

This is a false positive. The code is broken, but the test is happy because it is only checking the implementation against itself. The requirement has silently vanished.

## Redundancy is a feature

Developers are taught to avoid duplication, but tests are different. 

In the implementation, repeating a string is a code smell. In a test, hardcoding that same string is specification redundancy. This redundancy is what makes the test an independent authority. 

If the requirement is that an admin can access settings, the word "settings" belongs in the test. If you rename "settings" to "preferences" in the code, the test should break. That failure forces you to consciously acknowledge the change and verify it against the actual requirement. 

A test should not be a reflection of what the code currently does. It should be a statement of what must be true.

## TDD as a shield

This mistake usually happens when tests are written after the implementation. When the code already exists, the temptation to "borrow" its constants is high.

Writing the test first prevents this. Since the implementation does not exist yet, you have no details to import. You are forced to think about the requirement from the outside. You define the expected behavior using raw values, creating a contract that the implementation must eventually satisfy.

## Keep requirements in the test

When you feel the urge to import something from your source code into a test, ask yourself if you are testing the "what" or the "how". 

Requirements belong in your tests. Implementation details belong in your implementation. If the two are too closely linked, your green tests might be lying to you.