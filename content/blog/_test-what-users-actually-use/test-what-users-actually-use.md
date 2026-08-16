---
date: "2026-04-23"
title: "Test what users actually use"
summary: "Start testing at the public boundary of your system, where users actually interact with it, and only move inward when there is a concrete reason."
categories:
  - "Testing"
---

> **TODO before publishing — topics to add or expand**
>
> 1. **Where is the boundary, exactly?** Every reader will ask this, and the post only waves at it ("sometimes the public boundary is just a function in a library"). In a React app, is it the whole app, one page, or one component? Add a concrete rule of thumb, otherwise the advice is convincing but hard to apply.
> 2. **Setup cost and faking.** The strongest objection to boundary testing is practical: you need a database, a network, a browser. The post calls it "too hard to set up" but never says what to do. What do you fake, and where do you draw the line? For example, fake the network but not your own code.
> 3. **"But then I don't know what broke."** The classic defense of unit tests. A failing boundary test says something is wrong, not where. Answer it — a failing boundary test plus a debugger often beats the false confidence of green unit tests.
> 4. **Testing pyramid vs testing diamond.** Name both. The pyramid is the traditional model readers already carry in their head, and the diamond (few unit tests, many integration tests, few end-to-end tests) is basically what this post argues for. Explain the diamond properly. It gives the post something to push against and pairs well with the coverage point below.
> 5. **Code coverage as a metric.** Currently only one paragraph, and it serves the boundary argument instead of standing on its own. Coverage is the traditional way to judge whether tests are good, and the point of this post is that it is not. Expand it: coverage targets, gaming the number, and what coverage *is* good for (finding untested code, not proving correctness).
> 6. **TDD.** There is a real tension the post skips. In classic TDD you write the small unit test first as a design tool, so deeper tests are pushed by habit on purpose. That contradicts "pulled into existence by necessity rather than pushed by habit". Addressing it makes the post stronger, not weaker.
> 7. **Combinatorics.** Only hinted at with the complex pricing logic. State the rule: test one representative case at the boundary, push the exhaustive matrix of cases down to a focused test. This is probably the most concrete advice in the post, and it is half a sentence right now.
>
> Priority: 1 and 2 turn the post from an opinion into something a reader can act on.

We write tests because we want confidence that our software works for users.

And where can we see whether it works for users? At the public boundary. That is where a user clicks a button, calls an endpoint, or uses a function from our library.

That is why I think testing should always start there. The public boundary is the mandatory starting point, because that is where requirements become visible and where users discover whether the software actually works.

That boundary is the subject.

Everything behind it, like helper functions, reducers, mappers, selectors, hooks, classes, and configuration objects, is implementation detail. Important of course, but still detail.

## Start where the requirement lives

Suppose you build a shopping cart. A requirement could be:

> When a user adds a product to the cart, the cart total should update.

That requirement does not say anything about which functions should exist internally, whether you use a reducer, whether prices are mapped first, or whether totals are calculated in three small helpers or one big function.

So the first useful test is also not about those things.

The first useful test is one that adds a product through the public boundary and checks whether the total updates. If that test passes, you know something meaningful. You know the cart works for the user in that situation.

This boundary test is the first source of truth. It proves the requirement in the place where the requirement matters.

You might still add lower-level tests later. But they should support this boundary test, not replace it.

## Why the boundary comes first

A lot of teams talk about coverage as if it proves the system works. But it does not. It only proves code was executed while tests were running.

You can have high coverage and still miss the thing that matters.

Imagine the shopping cart uses these internal steps:

1. map the product to a cart line
2. merge duplicate lines
3. calculate subtotal
4. calculate VAT
5. calculate total

You could unit test every one of these functions and reach very high coverage. But if the button in the UI no longer dispatches the right event, or the API sends the wrong field, or the total is no longer rendered, all those tests can still stay green.

The internal code may work in isolation while the feature is broken as a whole.

This is not an argument against lower-level tests. It is an argument about order. First prove the requirement at the boundary. Only after that decide whether testing deeper adds something useful.

## Deeper tests are a tactical choice

There is another problem with testing many internal details: those tests tend to break when you improve the implementation.

That is not automatically wrong. It just means such tests are more implementation-coupled. They know more about how the system is built, so they are more sensitive to refactors.

If you refactor the shopping cart from several helpers to one reducer, or from one reducer to a small state machine, the requirement is still the same: adding a product should update the total.

A boundary-focused test survives that kind of refactor.

A deeper test may still be worth it, but I think it should be pulled into existence by necessity rather than pushed by habit.

Maybe the pricing logic is complicated enough that verifying every rule through the UI becomes cumbersome. Or maybe you want a faster feedback loop while working on a specific calculation. Those are good reasons to test that logic more directly.

The point is that these tests are a tactical choice. You add them because they help you with clarity, speed, or focus, after the requirement has already been anchored at the boundary.

## Speed matters, but value matters first

People often defend low-level unit tests by saying they are fast.

That is a fair point. Speed matters, because fast feedback helps you stay productive and iterate with confidence.

Still, speed is a tool, not the goal. The primary value of a test is that a passing test tells you something important about a requirement.

A slower test that verifies a real requirement is often more valuable than a very fast test that only proves a helper returns the same shape you already told it to return.

Of course, this does not mean every test should become a huge end-to-end test. My point is simpler. Start at the outside, where the requirement is visible, and then choose the smallest additional tests that still verify something meaningful.

Sometimes that will be an end-to-end test. Sometimes an integration test is enough. Sometimes the public boundary is just a function in a library. The exact test level matters less than whether you are testing the real contract.

## When should you test deeper?

Testing deeper is a valid optimization, once the boundary test exists.

Sometimes a boundary test is too broad, too slow, or too hard to set up for a specific rule. Sometimes a piece of logic is complex enough that giving it a focused test is simply useful. Sometimes you just need a faster feedback loop while shaping a tricky algorithm.

In those situations, testing deeper is a good move. But I think it works best as a support layer. The boundary test establishes that the requirement holds for the user. The deeper test helps you work more precisely inside the implementation.

So before writing a lower-level test, I think the useful question is:

> Which requirement becomes easier or clearer to verify by testing this part directly?

If there is no good answer, the test probably does not need to exist.

## Start at the outside

If tests are there to give us confidence for users, we should begin where users meet the system.

Test the page, the endpoint, the public function, the visible behavior.

Then move inward only when there is a concrete reason.

That way the boundary remains your primary source of truth, and every deeper test has a clear reason to exist.
