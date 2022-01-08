---
date: "2022-01-09"
title: "Expected and Unexpected Errors"
summary: ""
categories:
  - "Architecture"
---

# Introduction

The reason I write this blog post is because I have some thoughts about errors, and how to categorize and handle them. It is not based on any investigation, or study, these are just my own thoughts, based on my opinion and experience.

By making this article, other people can read it, might find it interesting, might discuss about it, and I, but perhaps other people too, might learn something from it.

The distinction I like to make for errors is to identify them as _expected_ or _unexpected_. And how you handle errors depending on this distinction.

But first some terminology, what are we talking about?

# What is an error?

The term one might use for errors depends on your programming language, or framework, but in this blog post the errors I am talking about are also known as faults, or exceptions: Your code is running and suddenly something goes wrong and an error is thrown.

No one wants errors, because they indicate something is wrong. Perhaps the only good thing about errors is that you at least know there is something to improve in your code base. On the other hand, you can't prevent them from happening, so it's all about how to handle them.

If an error occurs, it most likely means something is not working, which might have impact for your users. It could also be there is hardly (or no) impact, but in that case they are at least distracting.

# How do you know errors occur?

Most apps have some kind of logging in place, so when errors occur, we at least know.

Also, depending on the software, we might let the user know. In a UI, we might show a modal indicating something's gone wrong. In the case of an HTTP API, a specific error code might be returned, for example a `400 Bad Request`.

It is also possible errors are not reported to the user, but only logged. Or, not logged, but only reported to the user. In that case you are not _in control_, because you'll only know errors occur when users let you know, or even worse, complain about it.

It is even possible errors are not logged, and not reported. That is disastrous, because then you are completely blind for what is happening on your platform.

Let's assume for now you want to know which errors happen (logging), and you want to give proper feedback to your users.

# What do errors even say?

So you have an application, you know when errors occur, and you provide feedback to your users.

Does that mean that when there are no errors, your software works? Of course not, because you might be handling errors wrongly, or even worse, there are no errors, but the the software is not working.

For example, suppose you have a web shop, users can add products to their cart, but when they click the the "Order Now" button nothing happens. No errors, just nothing happens. It appears some of the app's functionality has not been built, and/or tested, and now your company can not sell their products.

So errors can be an indication things are wrong, but no errors are not an indication nothing is wrong.

That is why your application not only needs to be built, but also needs to be tested. And not only the functionality (the happy flow), but also how it handles errors.

And that brings me to _expected_ and _unexpected_ errors.

# Expected errors

Expected errors are errors you know will happen and can not be prevented. For example, an application is communicating with another application, and somehow, a server is down, or the connection is gone. There are many ways to minimize the chance of this to happen, but it will happen.

We just talked about logging, and while it might be interesting to log these kinds of problems, more importantly, there should be some kind of external monitoring in place to determine something is wrong and should be fixed. You'll need to have some kind of service that checks the health of your servers, network, and application.

The solution to fix these kind of issues lies mostly _outside_ of the application.

Regarding feedback to the user, we all know the phrase "An error occurred, please try again". Although this often feels (and is) not very helpful, for expected errors this might be quite useful. Chances are there was just a hickup in the connection, or a standby server took over for a failing server, so retrying a few seconds later might already help.

Expected errors can be predicted up front, and therefore can and should be tested. You could, for example, shut down a server, disconnect the WiFi, make deliberate mistakes in config files, etc. and see how the application responds.

A part of expected errors are outside of your influence, for example when a user has a failing WiFi connection. There is nothing you can do about that, so logging has no use. Giving clear feedback, if you can, might.

# Unexpected errors

Unexpected errors are really annoying and hard.

Suppose you built and tested your application(s), everything is on production, and then an error occurs: The response from the API you called returns JSON in a structure that is not how your application expected it, so parsing fails with an error. Or a user enters data in a form, but the value is too long.

These kinds of errors are unexpected because you have designed, built, and tested your application, based on documentation, meetings, or whatever. So everything should be good, but isn't.

You can not have any external monitoring in place, because you don't know what to monitor for, anything can go wrong. So for unexpected errors logging is really important: When it happens you want to know _what_ and _where_ it happened.

The error message "An error occurred, please try again" does not apply here. Unexpected errors are caused by bugs (programmer mistakes), so you can press that button as many times as you want, but chances are virtually zero it will somehow work later, without anyone changing anything in the source code of one of the applications involved.

# Differences between expected and unexpected errors

Let's talk about the differences between expected and unexpected errors.

First of all, fixing expected errors, i.e. getting things up and running again, is adjusting things _outside_ of the application(s) where the error occurred. For example, bringing things back online.

It could also be you have no influence on fixing it, for example when the external API you are calling is down, or when a user's WiFi connection is down.

So whatever the case with expected errors, the application source code does not need to be changed to make things work again.

And because the error is expected, you might be able to even give pretty detailed instructions on what went wrong and even what the user can do (if anything) to try again.

Unexpected errors, however, always need adjustment _inside_ of the application(s) where things are going wrong.

If the user entered a too long value in an input field, you could've built your app in such a way it just displays the error stacktrace, which might give the user a clue on what they did wrong. However, that's not a good idea, and it's not the user's responsibility to fix it. A possible fix for this problem could be improving the form validation, so it is no longer possible for the user to enter a too long value.

Because of these differences, handling expected and unexpected errors will probably happen in different places in the app. Expected errors are handled (caught) close to where they happen so you know the context and can give proper feedback.

Unexpected errors, however, are not caught on specific places (because they can happen anywhere), but probably bubble up to a higher level in your source code so you can log a full stacktrace. And you'll need that stacktrace, because unexpected errors often need to be investigated before they can be solved, so you want to collect as much information as possible.

# What all errors have in common

There is one thing expected and unexpected errors have in common when handling them.

When an error occurs, the feedback to the user or caller should always be clear. What has happened, and what can the user do now? Even if it means the user can't do anything, then at least they know.

How detailed this feedback is depends on the situation of course. Giving too much detail might not really help, or even lead to security issues.

For example, when you have a UI, and an error occurs, let the user know an error occurred. Maybe part of the UI can even still work, despite the error.

Or when you call an API, it is important you know it's a 4xx or a 5xx status code. In other words, an unexpected error, caused by a bug, or an expected (temporary) error, that might be worth retrying.

# Where should unexpected errors be fixed?

Preventing and fixing unexpected errors is all about _cause_ and _responsibility_.

For example, when an application calls an API with a GET request, the application can expect the response has a specific structure, or even a contract so to say. This might be formally described in documentation, generated code, or just word of mouth, but the structure is clear. Then the calling code can assume this structure is always correct.

When somehow the structure is suddenly not correct anymore, it's an unexpected error. Somewhere in one of our application the contract is broken. Or the old version of an application is still deployed.

Whatever the reason, an error will (should) occur, because it is unexpected, and you want to know. This way, the error bubbles up to a certain place in the application, and is logged, so people can check what went wrong.

The analysis of where the _cause_ of the problem lies is important: You don't want fix the client app, when actually the API is wrong. If you fix things in the wrong place, for example, make the client app handle either correct and incorrect responses, you are obfuscating the real problem.

Of course, sometimes you are dependent on external parties, and a quick fix can be convenient, but strive to prevent these kind of things as it makes the source code brittle, unclear, and unmaintainable.

It is often the case an API, and the client consuming it, are built in different programming languages, so these kind of problems are common. By sticking to the contract, you'll find issues earlier, most likely already when testing, so you'll ship robust code.

# So what's the point?

My point is to not just put some try/catch here and there. Instead, identify what can go wrong (expected errors), handle them, test them, and give proper feedback.

Everything else (unexpected errors) should not be handled specifically, because you don't know where, when, and why they happen. But you want to know they happen, so catch them so you can give proper feedback, and log them, so you at least know something needs to be fixed.

And if you fix something, fix it in the right place.
