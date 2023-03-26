---
date: "2023-03-26"
title: "Throwing errors, just to be sure"
summary: "Why I think it's a bad idea to throw errors in your own code yourself, as a convenience, or just to be sure..."
categories:
  - "Error handling"
  - "Testing"
---

### Introduction

No one likes errors occurring in an application. So that is why I think it's a bad idea to throw errors in your own code yourself, as a convenience, or just to be sure, because someone in the future might be using your code wrong.

Throwing errors is too rigorous, because errors are for bad things. Instead, you could just _solve the problem_ by making your code more meaningful, and of course, test your code.

> To be clear, I am talking about errors you throw in your own code, and not runtime errors that might occur because of something external, like an API. Runtime errors are there for a reason, but that's another story. Which I wrote about before, by the way: [Expected and Unexpected Errors](/expected-and-unexpected-errors)

### Let's take a walk

A common example is a function that accepts arguments, and if you pass the wrong ones, it throws an error.

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

This is a function written in JavaScript, uses immutability, and is meant to be pure: Given the same input it always returns the same output.

Notice an error is thrown when the direction is not one of the known directions. So for example, if I call the function as follows:

```js
let position = { x: 0, y: 0 };
position = walk(position, "northeast");
// Error: Unsupported direction: northeast
```

Now my question is: Is it really necessary to throw an error when the direction is unexpected? The common answer is: "Yes, so we'll notice when someone uses a direction that is not supported!"

### Just do nothing

You can teach a dog to sit when you say "Sit!". But what would it do when you say "Fly!"? Probably nothing. It would look at you and wait for you saying something it does understand. Until then, it probably does nothing.

Let's apply this to our code as well. So when the `direction` is not supported, the `walk` function should just do nothing. Well, except for just returning the current position again, because that's what the calling code expects:

```js
function walk(position, direction) {
  if (direction === "west") return { ...position, x: position.x - 1 };
  if (direction === "east") return { ...position, x: position.x + 1 };
  if (direction === "north") return { ...position, y: position.y + 1 };
  if (direction === "south") return { ...position, y: position.y - 1 };

  // Here we just return the original, unchanged direction:
  return position;
}
```

And as a bonus, because it's a pure and immutable function, the calling code could even optimize what it will (or will not) do when it determines the position (reference) has not changed.

This is in my opinion much beter than handling a terrible error somewhere else in the code for something that is not terrible at all.

As soon as someone supplies a `direction` that is not supported, they will notice nothing happens, by testing it. And then they will fix it.

### But we don't trust anyone!

But what if the `direction` comes from outside of our code? From a user, or another app calling our code? Then we might want to let them know something is not right.

That's where input validation is for. So before you call the `walk` function, you validate the input. If the `direction` is not expected, let the user or caller know.

This way, the `walk` function will do what its name implies, just walk. If it can not walk in a specific direction, it is not called. So instead of throwing an error, you just prevent something unexpected to happen in the first place. It is important each function does only one thing and it does it well. This makes your code easy to reason about, maintainable, and testable.

This might mean the function becomes (too) dependent of another function that acts as a safeguard. An integration test which uses both functions together might make sense in that case.

It depends on your situation and preference whether you think this it's a good idea the function does not do its own validation too.

### Testing and type safety

Testing and type safety are great tools to make sure your code does what it should do, both the happy and unhappy paths.

If we would have tests for the original `walk` function that threw the error, we'd also need a test the check if it throws an error for an unknown `direction`, right? With a dynamically typed language such as JavaScript this would be possible to test, although you are testing something that should not happen.

With a statically typed language such as TypeScript this would be unnecessary, because the `direction` argument can only have a valid value:

```
type Direction = "west" | "east" | "north" | "south"

function walk(position: Position, direction: Direction) {
  if (direction === "west") return { ...position, x: position.x - 1 };
  if (direction === "east") return { ...position, x: position.x + 1 };
  if (direction === "north") return { ...position, y: position.y + 1 };
  if (direction === "south") return { ...position, y: position.y - 1 };
}
```

With tests and type safety, we only need to test what can and should happen. If later more directions are added, we add them to our type definitions and to our test suite. 

This way, tests and types are almost like a manual of how to use our code, just look at them, and you know how it works. No errors, because they will only make it less clear and make you wonder why it is in there: When and why can it go wrong, giving you a suspicious feeling.

### Errors to control the flow of your code

Another very common reason for throwing errors is using it as a way to control the flow of your code, for example to exit early, while it actually indicates your code is not structured well.

Instead of using errors as an escape hatch, let's just fix it. All of the situations where the code is throwing errors are functional situations you know will happen, so why not just return early?

It could be that returning early does not make sense, because what valid value should you return?

A possible solution for this is to use the `Either` pattern, that makes sure a function either returns a value, or an alternative value, which could indicate a failure, or just any other value, so the calling code can act accordingly.

> A great blog post about the `Either` pattern is [Stop catching errors in TypeScript; Use the Either type to make your code predictable](https://antman-does-software.com/stop-catching-errors-in-typescript-use-the-either-type-to-make-your-code-predictable) by Anthony Manning-Franklin:
>
> "The above "exceptions" or "errors" aren't really exceptions or errors at all. They are outcomes. They are predictable, reasonable parts of our system. My heuristic is, if they are something a good product manager would care about, they are not exceptions and you shouldn't throw them!" 💯

### Conclusion

My point is: Don't just throw errors all over the place. First think: Is this really a bad situation that I need to know of, and can't prevent? 

Errors should indicate something bad has happened, so by throwing a lot of errors you give the impression to other developers a lot of bad and dangerous things can and will happen. But is that really the case?

Which other things can I do to gain more trust in my code? Perhaps a good test suite is already sufficient?

I think it depends on the situation whether throwing errors is really necessary, but that it is almost always not necessary at all.

Or am I missing a reason to still do it sometimes? Please let me know, I want to learn!