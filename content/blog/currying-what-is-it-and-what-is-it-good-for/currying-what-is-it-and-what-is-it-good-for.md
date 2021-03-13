---
date: "2021-03-14"
title: "Currying: What is it and what is it good for?"
summary: ""
categories:
  - "JavaScript"
  - "Functional programming"
---

#### Introduction

Functional programming is a very intruiging paradigm for me. Some of the concepts I am already using regularly, such as declarative programming, pure functions and higher order functions, when writing NodeJS or React.

However, there are also concepts that I find a bit hard to grasp. _Currying_, for example, so I decided to learn this by trying it out and while doing that, write about it.

#### A real world example?

Most people try to explain currying with very simple functions, for example one that adds up two numbers. I totally agree with such an approach to keep it simple, but somehow I failed to see the benefit of currying that way. So I decided to use an example that (hopefully) is a bit more realistic.

So I came up with the following function, which you can use to perform logging in your app:

```js
function log(datetime, severity, message) {
  console.log(`${datetime} [${severity}] - ${message}`);
}
```

Here are some examples how you could use the `log` function:

```js
// Informational logging:
log(new Date(), "INFO", "The service has started");

// Error logging:
log(new Date(), "ERROR", "An exception occurred: " + error.message);

// etc.
```

Because of how the `log` function works, it means you always have to pass all 3 arguments. This is not ideal and error-prone.

For example, you'll probably want to prevent unsupported `severity` values are passed, like `"DEBUG"`, `"INFO"`, `"WARN"`, `"ERROR"`, etc. Other values wouldn't make any sense, so you probably want to validate or (even better) restrict that.

> The only proper way of restricting `severity` values is using TypeScript, which we won't cover in this blog post.

What we can do is create some utility logging functions that, when logging, save us some key strokes, so probably reduce mistakes, but also make it more clear how to do logging, by offering the following abstractions:

```js
const logInfo = (message) => log(new Date(), "INFO", message);
const logError = (message) => log(new Date(), "ERROR", message);
// etc. for the other severities...
```

By creating these functions I do _partial application_: Creating functions out of other functions, supplying known values up front, so I only need to pass the values I only know at the moment when I use them. In this case it means the `datetime` and `severity` are known and the `message` is something that differs per logging call.

JavaScript technically speaking, with this abstractions I created some _closures_.

> _A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time._
>
> MDN Web Docs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

Everywhere I need to log, I choose the function that already contains the severity so I only need to pass the `message`:

```js
logInfo("This is an informational message!");
logError("An exception occurred!");
```

#### Enter currying

What we've achieved by introducing the closures is reducing the amount of code we need, but also using function composition: Out of the `log` function we created more specific functions.

Let's take this a step further and reduce our code by composing without using closures: _currying_, at last.

Currying is a technique where you transform a function so that it doesn't receive all parameters at once, but expects all parameters one by one. To achieve this, the curried version of the function needs to return another function, which in turn returns another function, until all arguments have been passed.

This may sound confusing, so before I explain further, let's first transform our `log` function to a curried one:

```js
function log(datetime) {
  return function (severity) {
    return function (message) {
      console.log(`${datetime} [${severity}] - ${message}`);
    };
  };
}
```

Here you see the `log` function now only expects the `datetime` argument, which is the first argument of the original `log` function. Then it returns a new function, which expects the second argument, `severity`. Finally, a function is returned for providing the `message` argument, which does the actual logging.

Although the most inner function only receives the `message`, it can also use `datetime` and `severity` because that is how closures work.

Now you might think, what is the purpose of transforming our function like this?

Well, what we can do now is compose new logging functions like this:

```js
logInformation("This is an informational message!");
logError("An exception occurred!");
```

Notice that composing abstractions out of the `log` function does not require using closures anymore, which reduces the amount of code even more. The only place we use closures is inside the `log` function.

To do the actual logging hasn't changed:

```js
logInfo("This is an informational message!");
logError("An exception occurred!");
```

Finally, I want to show you a way of making the curried `log` function even more concise by using arrow functions only:

```js
const log = (datetime) => (severity) => (message) =>
  console.log(`${datetime} [${severity}] - ${message}`);
```

Personally, I don't think this makes things more readable, but you could do it like this if you want.

#### Hybrid currying

What we've just done is changing the `log` function so it supports currying. However, what if we want to have a choice, either using the curried approach or the original way of just passing the 3 arguments ourselves?

Let's go back to the original `log` function, because this is the one we want to keep:

```js
function log(datetime, severity, message) {
  console.log(`${datetime} [${severity}] - ${message}`);
}
```

And instead we create a function that can make _any_ function curried:

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return function (a) {
      return curried(...[...args, a]);
    };
  };
}
```

> Check out this video by Derick where he creates this `curry` function and explains how it works: https://youtu.be/jJAxhVxaHMM

Next, let's create a curried `log` function by calling the `curry` function:

```js
let curriedLog = curry(log);
```

What we can do now is logging by calling `curriedLog` and pass arguments however we want:

```js
// We can call log with all 3 arguments:
curriedLog(new Date(), "INFO", "The service has started");

// We can pass all arguments separately:
curriedLog(new Date())("INFO")("The service has started");

// And we can apply partial application:
const logInfo = curriedLog(new Date())("INFO");
logInfo("The service has started");

// etc. etc.
```

Normally you wouldn't create the `curry` function yourself, but use a library like [Lodash], [Ramda], etc. instead, but I think it's nice to show how you could transform a normal function into a curried function.

#### Conclusion

I really learned a lot from exploring currying and writing about it. And although we now know what currying is and seen how to use it and what the some of the benefits are, I am not yet fully convinced of how useful currying is, apart from that it is a cool skill and another, refreshing way of programming.

However, we only touched the surface of currying so there is more to say, for example about other ways of function composition, so I will write another blog post.

If my blog post was not clear (or simply wrong) I really would like to hear that! If you want to know more you can check out some of the links below.

#### Acknowledgements and tips

A read quite a few articles and watched many videos to learn currying.

The first video that made it click for me was this step by step video by Steve Griffith: https://youtu.be/F_N97iovVbQ

A great article about currying with JavaScript that inspired me to use the logging example is [Currying Partials].

The `curry` function I showed you I got from this video where Derick explains how to write it: https://youtu.be/jJAxhVxaHMM

MPJ of Fun Fun Function also does a great (and funny as always) job explaining currying: https://youtu.be/iZLP4qOwY8I

[currying partials]: https://javascript.info/currying-partials
[lodash]: https://lodash.com
[ramda]: https://ramdajs.com
