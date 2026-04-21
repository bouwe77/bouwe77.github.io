---
date: "2026-04-21"
title: "Requirements belong in your tests"
summary: "Tests should verify requirements, not reuse implementation details from the code they are testing."
categories:
  - "Testing"
---

When writing a test, you are testing a **subject**.

That subject can be a function, a component, an API endpoint, a whole feature, or even the complete application, i.e. anything from the actual implementation you want to verify. 

The subject should be the only thing your test imports from the implementation, acting as the single point of contact between your test and your code.

In your test you verify requirements. Requirements describe **what** the subject is expected to do. And **how** the subject does this, your test should not know or care about.

That sounds obvious, but I think this is where a lot of tests slowly become less useful. Not because people don't care about testing, but because some things are just very convenient when writing tests.

### An example

Suppose you have a function that checks if a user is allowed to see a page:

```js
export function canAccessPage(role, page) {
  if (page === "products") return true
  return role === "admin"
}
```

Then the subject of the test is `canAccessPage`.

So the test should call `canAccessPage`, and verify what it returns for the requirements we know:

```js
import { canAccessPage } from "./canAccessPage"

test("an admin can access the settings page", () => {
  expect(canAccessPage("admin", "settings")).toBe(true)
})

test("a user can not access the settings page", () => {
  expect(canAccessPage("user", "settings")).toBe(false)
})

test("an admin can access the products page", () => {
  expect(canAccessPage("admin", "products")).toBe(true)
})

test("a user can access the products page", () => {
  expect(canAccessPage("user", "products")).toBe(true)
})
```

These tests don't know how `canAccessPage` works. They only know what the subject should do, based on requirements we came up with when defining what are app should do.

### The subject is the boundary

The subject is the only thing from the actual code the test should access.

Of course the test can use test utilities, builders, fake data, mocks, and whatever makes the test readable and useful. But from the actual implementation code, the test should only access the subject.

If the subject uses other functions, constants, arrays, objects, config files, or classes internally, then those things are **implementation details**, which the test should not import.

Because by doing so, the test starts to know _how_ the subject works. The test is no longer only testing the outside, but also reaches inside the subject.

### Convenience

This often happens when the implementation grows. For example, the authorization logic might become more elaborate:

```js
const publicPages = ["home", "products", "contact"]
export const adminPages = ["settings", "users"]

const pagesByRole = {
  user: publicPages,
  admin: [...publicPages, ...adminPages],
}

export function canAccessPage(role, page) {
  return pagesByRole[role].includes(page)
}
```

Now when writing tests, it can feel convenient to import `adminPages` as well.

Maybe you want to run the same test for all admin pages. Or maybe you don't want to repeat the list of pages in the test, because duplication feels wrong.

So you write something like:

```js
import { adminPages, canAccessPage } from "./canAccessPage"

test.each(adminPages)("an admin can access the %s page", (page) => {
  expect(canAccessPage("admin", page)).toBe(true)
})
```

This looks nice, is short and easy to maintain. If you add a new admin page, the test automatically includes it. But that is also the problem. The test now uses the implementation to determine the requirement.

We prioritized the convenience of "don't repeat yourself" over the actual purpose of the test: catching mistakes in the implementation.

When a requirement changes, you should update the test first. This forces a deliberate acknowledgement of the new rule before any code changes. Treating the test as the leading authority ensures the implementation follows the requirement, rather than the other way around.

### Requirements in the wrong place

The requirement is not in the test anymore. The requirement is now in `adminPages`, which is part of the actual code.

And the test only verifies that the code behaves according to another piece of the same code. That might still be useful in some situations, but it is not the same as testing requirements.

Because what happens when someone changes this?

```js
export const adminPages = ["users"]
```

Maybe `settings` was removed by accident. Maybe during a refactor. Maybe because someone misunderstood the feature. Maybe because the code was moved around and the list was changed without realizing what it meant.

The test still passes.

Why?

Because the test imports `adminPages`, and `settings` is not in that list anymore. So the test no longer checks that admins can access settings.

The requirement silently disappeared and that is dangerous.

### Passing tests based on nothing

This is one of the worst situations in testing: tests are passing, but they are passing based on incorrect or non-existing requirements: False positives.

The test suite should give confidence, but that confidence is not justified anymore.

So you run the tests, everything is green, you deploy, and later users complain that admins can no longer open the settings page. At that moment the test suite did not protect you.

In fact, the test implicitely changed the requirements, because you changed things in the wrong order: Requirements always come first.

### Duplication is not always bad

I think this is also where the fear of duplication can get in the way. Developers often try to avoid duplication, and usually that is a good thing. But tests are different.

If the requirement is "an admin can access the settings page", then it is perfectly fine to write `"settings"` in the test.

Yes, that value might also exist in the implementation, but in the test it has another meaning. In the implementation it is used to make the code work. In the test it describes what the code should do. That is not the same duplication.

The test is the place where the requirement should be visible. When someone reads the test, they should understand what the subject is expected to do, without having to inspect the implementation.

### Tests after code

I think this problem often happens when tests are written after the implementation.

You already built the code. You know which constants exist. You know which helper functions are available. You know how the logic is structured.

And then you start writing tests.

Of course you see the convenient things you can reuse. They are right there. Import the list, use it with `test.each`, and the test is done.

The test passes, but did you really test the requirement? Or did you mostly test that the implementation agrees with itself?

That is the question I think we should ask more often.

### TDD

If you would write the test first, this probably would not happen as easily. Because before the implementation exists, there are no implementation details to import.

You have to think about the requirement. You have to write down what the subject should do. You have to decide what the outside of the subject looks like.

That is one of the things I like about TDD. Not because it magically creates better code, but because it forces you to reason from the outside: First the requirement, then the test, then the implementation.

And while implementing, you can still create all the helpers, constants, mappings, and data structures you want. The test does not care. As long as the subject still behaves according to the requirements, the test passes.

That gives you freedom to refactor. And more importantly, it gives you tests that actually mean something.

### Conclusion

When writing tests, try to be strict about the boundary: The test accesses the subject, and verifies requirements.

Everything behind the subject is implementation detail.

So if you feel the urge to import something from the actual code to make testing easier, take a moment and ask yourself: Am I still testing what the subject should do? Or am I now using how it works to decide what should be true?

Requirements belong in your tests. Implementation details belong in your implementation.
