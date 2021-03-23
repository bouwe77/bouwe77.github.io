---
date: "2021-03-21"
title: "Currying Part 2 (Working Title)"
summary: ""
categories:
  - "Functional programming"
  - "JavaScript"
  - "Currying"
---

#### Introduction

Bla bla bla... In ieder geval composition noemen.

So if you don't know what currying is, please read [Part 1] where I try to explain it and which also contains some links to other resources that explain currying very well.

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

Nesting the function calls like this is not particularly readable and I am not composing anything.

#### Piping and composition

What I would like to do instead is compose a new function that does the nesting for me, so I only need to mention which functions I want to be called in sequence, making my code look nicer. This is a form of composition that is called piping:

```js
// Compose a new function by piping (or chaining) some functions into a new function that does logging for us:
const logInfoToFile = pipe(formatLog, writeToConsole, writeToFile);

// Call the function we just composed to do some logging:
logInfoToFile("Hello World");
```

The code above does not work, because we haven't defined the `pipe` function yet. But because we are doing functional programming, this code is already quite easy to reason about.

This is the `pipe` function:

```js
const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);
```

> Just like the `curry` function I showed you in [Part 1], also the `pipe` function is probably not something you'd build yourself, but use from libraries like [Lodash], [Ramda], etc.

What the `pipe` function does is composing a function that calls the provided functions nested, just like we did by hand earlier. The only thing we did is abstracted that away, for convenience, but also to keep our code clean.

However, something is missing in the code example where I showed how to pipe and log. We pass three functions to pipe and then call the `logInfoToFile` and only pass a message. But what about all the other arguments, like the `datetime` and `severity` for `formatLog` and the `filepath` for the `writeToFile` function?

To be able to do piping, or rather, composing in general, we need a predictable interface for each function, so they always _fit_ together. And the only way to achieve that is by requiring that every function not only always returns a value, but also it always expects exactly one parameter.

That way, the return value from the first function is the argument for the next, which also returns one value, that is passed to the next function, etc., and so you can combine any number of functions you want.

However, the `formatLog` and `writeToFile` need multiple arguments, so they are not suitable for composition yet.

#### Currying to the rescue!

In my [previous blog about currying] I showed you how we can transform any function to a curried function so that it can only receive one argument at a time. So that's what we are going to do now to solve our composition problem.

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

#### Conclusion

Iets zeggen over dat we code declaratief hebben gemaakt, het gaat er om dat je allemaal functions maakt en die aanroept, zodat het een leesbaar geheel wordt van stapjes die elkaar aanroepen.

Ook dat deze code niet production ready is, het is vooral illustratief.

Doordat ik er inmiddels best veel mee geoefend heb, komt het steeds beter in mijn systeem en zie ik steeds meer toepassingen...

Links

- [Curry and Function Composition] by Eric Elliott.

[part 1]: /currying-what-is-it-and-what-is-it-good-for
[previous blog about currying]: /currying-what-is-it-and-what-is-it-good-for
[curry and function composition]: https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
[lodash]: https://lodash.com
[ramda]: https://ramdajs.com
[esnext proposal: the pipeline operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator
