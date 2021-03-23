---
date: "2021-03-23"
title: "Composition with currying"
summary: ""
categories:
  - "Functional programming"
  - "JavaScript"
  - "Currying"
---

#### Introduction

In my [previous blog post about currying] I mainly wrote about what currying is and to a lesser extent where it's useful for.

I mentioned how you can compose new functions by specifying some of the arguments in front, which are always the same. That way, when calling the function, you only have to supply the arguments that you only know at the moment you are calling it. This is called _partial application_ and makes your code easier to reason about because you use nice abstractions.

In this blog post I'll write some more about composition, but this time not composing a function from one other function, but composing a function from _multiple_ other, different functions. This is also achieved by using currying.

#### Logging continued

In this blog post we'll continue on the logging functionality we started with in [Part 1]. I changed the code a bit, now the `log` function is split into a function that formats the log message and one that writes a message to the console. I also added a function that writes a message to a file:

```js
function formatLog(datetime, severity, message) {
  return `${datetime} [${severity}] - ${message}`;
}

function writeToConsole(message) {
  console.log(message);
  return message;
}

function writeToFile(filePath, message) {
  fs.appendFile(filePath, message + "\n", (err) => {
    if (err) throw err;
  });
  return message;
}
```

These functions are the _building blocks_ of the logging solution we are going to work with in this blog post.

What we can do now is call and combine different functions to achieve what we want by nesting them:

```js
// Write a log message to the console:
writeToConsole(formatLog(new Date().toISOString(), "INFO", "Hello World"));

// Write a log message to a file:
writeToFile(
  "/path/to/file",
  formatLog(new Date().toISOString(), "INFO", "Hello World")
);

// Write a log message to both the console and a file:
writeToFile(
  "/path/to/file",
  writeToConsole(formatLog(new Date().toISOString(), "INFO", "Hello World"))
);
```

What I am doing here is combining function calls by nesting them. This is not composition.

#### Composition by piping

What I would like to do instead is compose a new function that does the nesting for me, so I only need to mention which functions I want to be called in sequence, making my code look nicer. This is a form of composition that is called _piping_:

```js
// Compose a new function by piping (or chaining) some functions into a new function that does logging for us:
const logInfoToFile = pipe(formatLog, writeToConsole, writeToFile);

// Call the function we just composed to do some logging:
logInfoToFile("Hello World");
```

Notice how we are using the same three functions we also used when nesting, but this time we don't call them but pass them to a `pipe` function which creates a new function for us: composition.

However, this code above does not work, because we haven't defined the `pipe` function yet. But because we are doing functional programming, this code is already quite easy to reason about.

This is the `pipe` function:

```js
const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);
```

> Just like the `curry` function I showed you in [Part 1], the `pipe` function is probably not something you'd build yourself, but use from libraries like [Lodash], [Ramda], etc.

What the `pipe` function does is composing a function that calls the provided functions nested, just like we did by hand earlier. The only thing we did is abstracted that away for convenience and readability.

However, when we pass the three functions to `pipe` and then call the `logInfoToFile` function we only pass a message. But what about all the other arguments, like the `datetime` and `severity` for `formatLog` and the `filepath` for the `writeToFile` function?

To be able to do piping we need a predictable interface for each function, so they always _fit_ together. And the only way to achieve that is by requiring that every function not only always returns a value, but it also always expects exactly one parameter.

That way, the return value from the first function is the argument for the next, which also returns one value, that is passed to the next function, etc., and so you can combine any number of functions you want.

However, the `formatLog` and `writeToFile` need multiple arguments, so they are not suitable for this way of composition yet.

#### Currying to the rescue

In my [previous blog post about currying] I showed you how we can transform any function to a curried function so that it can only receive one argument at a time. So that's what we are going to do now to solve our composition problem.

Here is the `curry` function from that blog post and we'll use it to curry both the `log` and `writeToFile` functions, so we can partially apply them with the `logInfo` and `writeToLogFile` functions, respectively:

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return function (a) {
      return curried(...[...args, a]);
    };
  };
}

const curriedFormatLog = curry(formatLog);
const datetime = { toString: () => newDate().toISOString() };
const formatLogInfo = curriedFormatLog(datetime)("INFO");

const curriedWriteToFile = curry(writeToFile);
const writeToLogFile = curriedWriteToFile("/path/to/file");
```

The `formatLogInfo` function already passes two of the three arguments that `formatLog` expects, so there is only one (`message`) left. The same for `writeToLogFile`, which already passes file path, so also there only the `message` is left.

Now we can pipe the logging functions like this so the return value of each function is passed as an argument to the next function:

```js
// Pipe (or chain) some functions into a new function that does logging for us:
const logInfoToFile = pipe(formatLogInfo, writeToConsole, writeToLogFile);

// Let's do some logging:
logInfoToFile("Hello World");
```

Look how clean this code is! If I don't want to log to the console anymore, just remove that function from the `pipe` arguments. And I can compose many other functions, each with their own applicable combination of functions.

#### Conclusion

What we did in this post is making declarative code by combining several building blocks together, which was made possible because of currying.

The logging solution is not meant to be used in a production situation, it is merely illustrative for how a real world situation could look like, but I hope you see the characteristics, or even benefits of currying by now.

By writing this blog posts, which involved quite some experimenting with JavaScript, I learned yet another way of thinking and approaching code, and I start seeing more and more possibilities for using currying. The more I do it, functional programming really starts growing on me.

Checkout the code on this gist: https://gist.github.com/bouwe77/8af27b85572e965f39a760bea5342814

More on currying and composition:

- [Curry and Function Composition], an article by Eric Elliott.
- [The Power of Composition], a great talk by Scott Wlaschin.

[part 1]: /currying-what-is-it
[previous blog post about currying]: /currying-what-is-it
[curry and function composition]: https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
[lodash]: https://lodash.com
[ramda]: https://ramdajs.com
[esnext proposal: the pipeline operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator
[the power of composition]: https://youtu.be/rCKPgu4DvcE
