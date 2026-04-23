---
date: "2026-04-23"
title: "What to test"
summary: "Start testing at the public boundary of your system, where users actually interact with it, and only move inward when there is a concrete reason."
categories:
  - "Testing"
---

We write tests because we want confidence that our software works for users.

That sounds obvious, but it has a big consequence: the first thing we should test is not our internal code structure, but the public boundary of the system. The UI, the API, the function exposed by a library, whatever users or other systems actually use.

That boundary is the subject.

Everything behind it, like helper functions, reducers, mappers, selectors, hooks, classes, and configuration objects, is implementation detail. Important implementation detail of course, but still detail.

## Start where the requirement lives

Suppose you build a shopping cart. A requirement could be:

> When a user adds a product to the cart, the cart total should update.

That requirement does not say anything about which functions should exist internally, whether you use a reducer, whether prices are mapped first, or whether totals are calculated in three small helpers or one big function.

So the first useful test is also not about those things.

The first useful test is one that adds a product through the public boundary and checks whether the total updates. If that test passes, you know something meaningful: the cart works for the user in that situation.

If instead you unit test five helper functions behind the cart, you might get five green tests and still not know whether adding a product actually updates the cart total in the real flow.

That is the difference between testing code and testing functionality.

## Why internal coverage can be misleading

A lot of teams talk about coverage as if it proves the system works. It does not. It only proves code was executed while tests were running.

You can have high coverage and still miss the thing that matters.

Imagine the shopping cart uses these internal steps:

1. map the product to a cart line
2. merge duplicate lines
3. calculate subtotal
4. calculate VAT
5. calculate total

You could unit test every one of these functions and reach very high coverage. But if the button in the UI no longer dispatches the right event, or the API sends the wrong field, or the total is no longer rendered, all those tests can still stay green.

The internal code may work in isolation while the feature is broken as a whole.

That is why broad internal unit coverage often creates a false sense of safety. It is expensive to maintain, but the confidence you get back is often smaller than people think.

## The maintenance cost is not accidental

There is another problem with testing many internal details: those tests tend to break when you improve the implementation.

That is annoying, but more importantly, it is a sign the test was coupled to how the code works instead of what the code should do.

If you refactor the shopping cart from several helpers to one reducer, or from one reducer to a small state machine, the requirement is still the same: adding a product should update the total.

A boundary-focused test survives that kind of refactor.

A test suite full of internal unit tests often does not. Then the tests become friction. Instead of acting as a safety net, they start punishing healthy refactoring.

## Slower tests can still be better tests

People often defend low-level unit tests by saying they are fast.

That is true, but speed is not the main metric. Value is.

A slower test that verifies a real requirement is usually more valuable than a very fast test that only proves a helper returns the same shape you already told it to return.

Of course, this does not mean every test should become a huge end-to-end test. The point is simpler: start at the outside, where the requirement is visible, and choose the smallest test that still verifies something meaningful.

Sometimes that will be an end-to-end test. Sometimes an integration test is enough. Sometimes the public boundary is just a function in a library. The exact test level matters less than whether you are testing the real contract.

## When should you test deeper?

This does not mean lower-level tests are wrong.

Sometimes a boundary test is too broad, too slow, or too hard to set up for a specific rule. Sometimes a piece of logic is complex enough that giving it a focused test is simply useful. In that case, testing deeper is fine.

But that should be a conscious choice to support the boundary tests, not the default starting point.

So before writing a lower-level test, I think the useful question is:

> Which requirement becomes easier or clearer to verify by testing this part directly?

If there is no good answer, the test probably does not need to exist.

## Start at the outside

If tests are there to give us confidence for users, we should begin where users meet the system.

Test the page, the endpoint, the public function, the visible behavior.

Only move inward when there is a concrete reason.

That way your tests stay close to the requirements, give more realistic confidence, and keep their value when the implementation changes underneath them.
