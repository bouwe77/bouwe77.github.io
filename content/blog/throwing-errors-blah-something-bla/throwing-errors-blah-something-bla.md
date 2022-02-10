---
date: "2022-01-20"
title: "Throwing errors blah something bla"
summary: ""
categories:
  - "Testing"
  - "Error handling"
---

### Introduction

This blog post is about why it might not be necessary to throw errors to prevent yourself, your fellow developers, or your users from doing something wrong. 

> En ik draag een aantal alternatieven voor
> ...

> Opmerking over control the flow of your code?
> ...

### Do you haz teh codez?

Suppose I am creating a 2D game and use the following `walk` function to return the new `position` by supplying both the current `position`, and a `direction`:

```js
function walk(position, direction) {
  if (direction === 'west') return { ...position, x: position.x - 1 }
  if (direction === 'east') return { ...position, x: position.x + 1 }
  if (direction === 'north') return { ...position, y: position.y + 1 }
  if (direction === 'south') return { ...position, y: position.y - 1 }

  throw new Error(`Unsupported direction: ${direction}`)
}
```

An example of calling this function:

```js
let position = { x: 0, y: 0}
position = walk(position, 'east')
console.log(position) // { x: 1, y: 0}
```

This is a function written in JavaScript, it's pure, and uses immutability. While that is very nice, it is not the point of this blog post. Also, it could have been written in many other ways, but that's also not what this is about.

Instead, I want you to notice that an error is thrown when the direction is not one of the known directions. So for example, if I call the function as follows:

```js
let position = { x: 0, y: 0}
position = walk(position, 'northeast')
// Error: Unsupported direction: northeast
```

Now my question is: Is it really necessary to throw an error when the direction is unexpected? The common answer is: "Yes, so we'll notice when someone uses a direction that is not supported!"

### Just do nothing

You can teach a dog to sit when you say "Sit!". But what would it do when you say "Fly!"? Probably nothing. It would look at you and wait for something it does understand. Until then, it probably does nothing or just walks to the next tree.

This is also something that we could apply to our code. So when the `direction` is not supported, the `walk` function should just do nothing. Well, except for just returning the current position again, because that's what the calling code expects:

```js
function walk(position, direction) {
  if (direction === 'west') return { ...position, x: position.x - 1 }
  if (direction === 'east') return { ...position, x: position.x + 1 }
  if (direction === 'north') return { ...position, x: position.y + 1 }
  if (direction === 'south') return { ...position, x: position.y - 1 }

  return position
}
```

And as a bonus, because it's a pure, immutable function, the calling code could even optimize what it will (or will not) do when it determines the position (reference) has not changed. Which, in my opinion, is already much beter than handling a terrible error somewhere else in the code for something that is not terrible at all.

As soon as someone supplies a `direction` that is not supported, they will notice nothing happens. And then they will build it.

### But we don't trust anyone

But what if the `direction` comes from outside of our code? From a user, or another app calling our code? Then we might want to let them know something is not right.

That's where input validation is for. So before you call the `walk` function, you validate the input. If the `direction` is not expected, let the user or caller know.

This way, the `walk` function will do what its name implies, just walk. If it can not walk in a specific direction, it is not called. So instead of throwing an error, you just prevent something unexpected to happen in the first place. It is important each function does only one thing and it does it well. This makes your code easy to reason about, maintainable, and testable.

This might mean the function becomes (too) dependent of another function that acts as a safeguard. It depends on your situation and preference whether you think this is a good idea.

### Testing and type safety

Finally we've arrived at the biggest reason why throwing the error is not necessary. And that is: We test our code, and ideally also use a statically typed language.

If we took testing seriously from the start, we would also have a test that determines the `walk` function throws an error for an unknown `direction`. With a language such as JavaScript this would be easy, because the value of the `direction` argument can be anything, in our test we can supply an unknown `direction` very easily.. 

However, with statically typed languages this would be hard to do, so you either use a hack or don't test that situation at all. In fact, with a statically typed language you would discover we wouldn't even need to throw an error or return the current `position` anyway, because it wouldn't even be possible to pass an invalid `direction`:

```ts
//todo...
```

When we want to support other directions as well, we can do that safely because we have tests in place. By doing this test-driven, we make sure we only do the code changes that are really necessary to support this new feature. So we expand both the input validation and the `walk` function to make our tests pass.

### Iets over Maybe monads

...

...

...

### When to throw errors

Een stukje theorie uit een goed boek, wanneer het WEL een goed idee is om errors te gooien

### Conclusion

My point is: Don't just throw errors all over the place. First think: Is this really a bad situation that I need to know of, and can't prevent?

Which other things can I do gain more trust in my code? Perhaps a good test suite is already sufficient? 