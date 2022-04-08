---
date: "2022-02-15"
title: "Throwing errors, just to be sure"
summary: ""
categories:
  - "Error handling"
  - "Testing"
---

### Introduction

> Beginnen met throwing errors to control the flow of your code en waarom men dat doet.
> En dan zeggen dat ik een bepaalce categorie daarvan hier behandel

Developers tend to throw errors in their code to prevent themself, their fellow developers, or their users from doing something wrong. I think in many cases throwing errors, just in case, is not necessary. In this blog post I will explain why and give you some alternatives.

In a minute I will give you a code sample we will work with, but the situation I am talking about is a function that expects one or more possible values to work with, but will throw an error if such a value is unexpected.

### Do you haz teh codez?

Suppose I am creating a 2D game and use the following `walk` function to determine the new `position` X and Y coordinate by supplying both the current `position`, and a `direction`:

```js
function walk(position, direction) {
  if (direction === "west") return { ...position, x: position.x - 1 };
  if (direction === "east") return { ...position, x: position.x + 1 };
  if (direction === "north") return { ...position, y: position.y + 1 };
  if (direction === "south") return { ...position, y: position.y - 1 };

  throw new Error(`Unsupported direction: ${direction}`);
}
```

An example of calling this function:

```js
let position = { x: 0, y: 0 };
position = walk(position, "east");
console.log(position); // { x: 1, y: 0}
```

This is a function written in JavaScript, it's pure, and uses immutability. While that is very nice, it is not the point of this blog post. Also, it could have been written in many other ways, but that's also not what this is about.

Instead, I want you to notice that an error is thrown when the direction is not one of the known directions. So for example, if I call the function as follows:

```js
let position = { x: 0, y: 0 };
position = walk(position, "northeast");
// Error: Unsupported direction: northeast
```

Now my question is: Is it really necessary to throw an error when the direction is unexpected? The common answer is: "Yes, so we'll notice when someone uses a direction that is not supported!"

### Just do nothing

You can teach a dog to sit when you say "Sit!". But what would it do when you say "Fly!"? Probably nothing. It would look at you and wait for you saying something it does understand. Until then, it probably does nothing or just walks to the next tree.

This is also something that we could apply to our code. So when the `direction` is not supported, the `walk` function should just do nothing. Well, except for just returning the current position again, because that's what the calling code expects:

```js
function walk(position, direction) {
  if (direction === "west") return { ...position, x: position.x - 1 };
  if (direction === "east") return { ...position, x: position.x + 1 };
  if (direction === "north") return { ...position, y: position.y + 1 };
  if (direction === "south") return { ...position, y: position.y - 1 };

  return position;
}
```

And as a bonus, because it's a pure, immutable function, the calling code could even optimize what it will (or will not) do when it determines the position (reference) has not changed. Which, in my opinion, is already much beter than handling a terrible error somewhere else in the code for something that is not terrible at all.

As soon as someone supplies a `direction` that is not supported, they will notice nothing happens. And then they will build it.

### But we don't trust anyone

But what if the `direction` comes from outside of our code? From a user, or another app calling our code? Then we might want to let them know something is not right.

That's where input validation is for. So before you call the `walk` function, you validate the input. If the `direction` is not expected, let the user or caller know.

This way, the `walk` function will do what its name implies, just walk. If it can not walk in a specific direction, it is not called. So instead of throwing an error, you just prevent something unexpected to happen in the first place. It is important each function does only one thing and it does it well. This makes your code easy to reason about, maintainable, and testable.

This might mean the function becomes (too) dependent of another function that acts as a safeguard. It depends on your situation and preference whether you think this it's a good idea the function does not do its own validation too.

### Testing and type safety

Testing and type safety are great tools to make sure your code does what it should do, both the happy and unhappy paths.

If we would have tests for the original `walk` function that threw the error, we'd also have a test the check if it throws an error for an unknown `direction`, right? With a dynamically typed language such as JavaScript this would be easy to test, because the value of the `direction` argument can be anything, a random string, or even a number.

However, with a statically typed language this would be hard to do, so you'd probably not test that situation at all. Throwing the error is only done just to be sure, but with having tests, think of what else you still need to be sure of.

As soon as we'd want to support other directions as well, we can build that test-driven because we have tests in place. This way, we make sure we only do the code changes that are really necessary to support this new feature. We can trust our tests and don't need to throw errors, just in case.

### When to throw errors

Whether or not you agree with me throwing errors is not always necessary, there are, however, situations where throwing errors might be necessary.

Check out the following function that divides the given numbers:

```js
function divide(a, b) {
  return a / b;
}
```

Let's call that function:

```js
divide(1, 1); // returns 1
divide(10, 2); // returns 5
divide(2, 0); // returns Infinity...
```

Division by zero is probably not very useful, so if you would follow my proposal to then just "do nothing", what would the correct return value be? There is none! In other words, this is a case for throwing an error because this function can not do anything meaningful otherwise.

However, this is an exception. In many other cases, there is nothing wrong with just doing nothing. You will notice, and fix it, when that is not what you want. Throwing errors is only for situations that are really unexpected, exceptions to the rule, from which you can not recover, or can not respond to in a useful way.

### Don't throw, but return something different

Suppose you have a function that throws errors in specific situations, how can you know it does? You can check the source code, look at code comments, etc., but it is not always very clear. Some languages, such as Java, require you to annotate functions with the exception(s) it throws. And also, in the stack of functions that call that function, there must be one that catches the exception.

However, in most languages, the return type and the possible error(s) it could throw is not clear when you look at the return types.

There is, however, a very elegant way to not have your function throw errors, but just defining different return types depending on a successful or unsuccessful execution of the function.
There is, however, a very elegant way to not have your function throw errors, but just defining different return types depending on a successful or unsuccessful execution of the function.
There is, however, a very elegant way to not have your function throw errors, but just defining different return types depending on a successful or unsuccessful execution of the function.
There is, however, a very elegant way to not have your function throw errors, but just defining different return types depending on a successful or unsuccessful execution of the function.
There is, however, a very elegant way to not have your function throw errors, but just defining different return types depending on a successful or unsuccessful execution of the function.

### Conclusion

My point is: Don't just throw errors all over the place. First think: Is this really a bad situation that I need to know of, and can't prevent? Errors should indicate something bad has happened, so by throwing a lot of errors you give the impression to other developers a lot of bad and dangerous things can and will happen. But is that really the case?

Which other things can I do gain more trust in my code? Perhaps a good test suite is already sufficient?

I think it depends on the situation whether throwing errors is really necessary, and that it is quite often not necessary at all.
