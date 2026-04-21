---
date: "2026-04-21"
title: "What to test"
summary: "Lorem ipsum"
categories:
  - "Testing"
---

This is a blog about What and how to test...

Why are we testing? We are testing because we want to know the app or whatever solution we built works for our users. To determine what users can do with our app we define requirements, which explain WHAT they can do with it.

And tests should check requirements, i.e. the WHAT, and not the HOW of the implementation details.

The question is what (part of the code) do we have to test, when writing automated tests?

People say code coverage is important, so that we know that ALL the code we built works.

Testing all the code means creating unit tests for every function that can be called by other modules within the application code. We treat those functions as the public API of that module and so we test those so that we know that when other code calls it, it does what it should do.

But one can wonder what that means: "it really works" when you unit test almost all your code.

And as we keep on adding, refactoring, updating, deleting our code, we also constantly have to update the tests along with it. So that is a lot of works and we have to be sure it is really worth all that effort.

So I say instead of unit testing the "code", we should test the "functionality", how the user uses our app/code. So if it's a UI, we'll test the UI. If it's an API we will test calling that API. An API can be an HTTP endpoint, but also a function they can call on a library or SDK.

That way we treat our code as a means to an end, which is it should work for our users.

We build our app for our users and we want to be sure it works for them, and keeps on working: Regression testing.

Users use the "outside" (UI/public interface/API) of our app/code, so when creating tests, we always start with testing that outside as well.

And then MAYBE also unit test some other things inside our code, but as little as possible.

And we can do this with an integration test where you test as much of the code behind as well, but maybe mocking away a few things if that is convenient. Or do an end-to-end test where even the DB and all other external dependencies are used.

> * Unit test = test every modules's of class' public interface in all layers of the application code.
> * Integrtion test = Test a bigger part of our code, often a specific functionality, like chat, shopping cart, search filter, etc. Or even the whole app if it's not big. And extenral dependencies like databases or APIs are often mocked.
> * E2E Test the whole app inlcuding a real DB or API

Between testing the public interface of our app and unit testing each and every module's or class' public function is another approach, which is a common pattern in frontend testing where we would test specific parts of the functionality, like a chat module or a shopping cart. The app normally would render multiple modules at the same time, but in such a test you render the DOM with only that module, as if the page only has a chat box. Then still you test (and use) it as a real user would, but you make the test a little bit more self-contained and focused.

"But what about code coverage?" This is a nice metric to check you did not cover all your code. And that could mean you just add more of those functional public API tests, or it might show that it is not really doable because there are simply way to many variables. And ONLY THEN you decide to create unit tests for those parts.

...TODO example...

"But integration tests and e2e tests are slow" Yes they are, but their VALUE matters, not how long you have to wait for them. You can also use waiting as a nice opportunity to take e break, chat to a colleague or work on something else. To me it's nonsense to say we will create unit tests because they are quick, while their value (remember, it should work for users) is very low as it does not guarantee enything. So what good is a quick test that doesn't say much...

Having tests that do not test implementation details open the door for refactoring, and security and performance improvements, where the tests serve as a safeguard for screwing up. In most cases you will only change the code and run the tests to see it still works. It saves so much effort for something that is not useful.

I've seen devs being annoyed by writing and updating unit tests because it's so much work, with every little piece of code you change. The result is it becomes an afterthought where no one bothers with TDD, and instead fix the test AFTER changing the code, not caring about the test qulity and only doing it because they "have to acoording to the rules"...

...TODO TDD works super well for integration and e2e tests...

It also allows for building apps in a super agile way: If you have the requirements, build tests for it, but take a few shortcuts in the code just to make a first version as a minimal viable product you can move really quick. You created the minimal test suite to show it really works for users according to the specs, can ship, and in the meantime improve the implementation, and build further on the functionality. Moving quick when also creating unit tests is a lot of work, and holds you back when you are still figuring out the best code structure and patterns.



