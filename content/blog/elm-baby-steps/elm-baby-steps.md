---
date: "2022-12-04"
title: "Elm baby steps: The language"
summary: "Before building a real app with Elm, let's look at the language first."
categories:
  - "Functional programming"
  - "Elm"
  - "Currying"
---

### Elm?

Elm is a functional programming language for creating web apps. As you will see in this blog post, programming in Elm is quite different from programming in JavaScript, but Elm does compile to JavaScript, which makes it work in every browser.

I am learning Elm because functional programming intrigues me, and building for the web as well, so it feels like the ideal language to try out.

You can do functional programming in JavaScript as well, but JS is not opinionated about what paradigm(s) you use, so there are always escape hatches from not programming fully functional. Which is not a bad thing at all of course, the fact you can use different paradigms in a language is ideal, because which paradigm is best? It depends of course.

So my reason I try out Elm is mainly because of curiosity. And because there are some very compelling language features that Elm offers: Static typing, immutability, pure functions, no side effects, no exceptions, no runtime errors, no `null` or `undefined`, etc. Sounds like a lot less to worry about.

Many reasons to try this out, let's go! This blog post will focus on the language itself.

### Playground

Let's not install things, but just start coding by using the Elm playground: [https://elm-lang.org/try](https://elm-lang.org/try)

Here you can code with Elm, and see how it looks in the browser by clicking "Rebuild", which, like I said, compiles your Elm code to JavaScript, and shows the result in the browser right away.

### Hello, World!

Let's create a variable with the name `sayHello` with the value "Hello, World!":

```
sayHello = "Hello, World!"
```

Let's output that value to the browser. Every Elm program needs a `main` function which is called by Elm. The `main` function expects an argument with the value that needs to be rendered, so let's try this:

```
sayHello = "Hello, World!"

main = sayHello
```

This does not work:

```
I cannot handle this type of `main` value:

3| main = sayHello
   ^^^^
The type of `main` value I am seeing is:

    String
```

The problem is that the type of `main` is a string, while it should be a function, so Elm can call it. So we need a function that returns our `"Hello, World!"` string. For this, we import the `text` function from Elm:

```
import Html exposing (text)

sayHello = "Hello, World!"

main = text sayHello
```

Here we import the 'text' function, and assign calling the `text` function with the `sayHello` argument to `main`, so Elm can call it and render `"Hello, World!"` in the browser.

### Functions

Let's make a function that expects a name to say hello to:

```
sayHello name = "Hello, " ++ name
```

How to read this? `sayHello` is the name of the function, and it expects an argument called `name`. The `=` sign is for indicating where the function body starts, which here returns the string `"Hello, "`, followed by `++` which concatenates string, in this case the `name` argument.

With this, our program now looks like this:

```
import Html exposing (text)

sayHello name = "Hello, " ++ name

main = text (sayHello "Bouwe")
```

Note how `main` is still calling `text`, but the argument is the outcome of calling the `sayHello` function first. If I would not add the parentheses, I would be passing 2 arguments to `text`, while it only expects one.

### Calculations and types

Let's do some calculations:

```
add a b = a + b
```

Here the `add` function expects two arguments, `a` and `b`, and it will return the total of these two numbers.

Numbers, you might think? How does Elm know these are numbers? Well, it's the `+` operator, which you can only use for numbers. Remember, we used the `++` operator in our previous example because we were dealing with strings. This shows how Elm is statically typed and will try to infer types. If it can not infer it, it will say so, and you can explicitly define the types if necessary.

Alright, let's write the outcome of the calculation to the screen:

```
import Html exposing (text)

add a b = a + b

main = text (add 1 1)
```

Here we pass the result of `1 + 1` to the `text` function by calling the `add` function. However, this does not work, because `text` expects a string while the result of `add` is a number. The compilation error says we probably want to use `String.fromInt` to convert it to a string first.

As with everything in Elm, `String.fromInt` is a function as well, so we could call it as follows:

```
main = text (String.fromInt (add 1 1))
```

This works, but I don't like all the parentheses, so let's break it up, and use a very cool language feature, the pipe operator:

```
total = add 1 1
        |> String.fromInt

main = text total
```

Here we call `add`, pass the value `1` twice, and the result from this, `2`, is passed along to the next function in the pipeline, `String.fromInt`. This converts `2` to the string `"2"`, and assigns it to the variable `total`, which is then passed to the `text` function for displaying.

### Partial application

Elm supports partial application, in other words, calling a function with some of its arguments, which then returns a new function to which you only need to pass in the remaining arguments.

Let me show you some examples with the `add` function we just used:

```
result1 = add 10 20
-- result1 is the number 30

result2 = add 10
-- result2 is a function where the first argument (10) is already passed and applied,
-- and you only need to pass the second argument still
```

As the second call results in a function that adds `10` to any number argument passed to it, let's rename it to `addTen`, and call it:

```
addTen = add 10

result = addTen 20
-- result is the number 30
```

With this, we could create a bunch of functions, and reuse and compose them together however we need. I wrote a [blog post about this](/composition-with-currying) already.

### Conclusion

Cool, we covered a few basics about Elm, I learned a lot, and I hope you too! There is much more to discover of course, so stay tuned for another blog post. Topics I can think of are some more language syntax, but also how to render HTML, as Elm is for building web applications.

Thanks for reading!

Check out the code from this blog post here: [https://github.com/bouwe77/elm-blog-posts/blob/main/Blog1.elm](https://github.com/bouwe77/elm-blog-posts/blob/main/Blog1.elm)


