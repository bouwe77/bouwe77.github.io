---
date: "2022-12-05"
title: "Elm baby steps"
summary: ""
categories:
  - "Functional programming"
  - "Elm"
---

### Introduction

In my [previous blog post about Elm](/elm-baby-steps) I wrote about the Elm language, mainly about how to create and call functions. Because that's what you do in a functional language, writing and/or calling functions.

In this post I'll look into writing HTML with Elm. This is very common as Elm is a language for creating web applications. The Elm code you write is compiled into JavaScript.

Again, we will use the [Elm Playground](https://elm-lang.org/try) so you don't have to install anything, and can just fiddle around.

### Hello World

As I've already explained in [my previous Elm blog post](/elm-baby-steps), the following Elm program renders the text `"Hello World"` in the browser:

```
import Html exposing (text)

main = text "Hello, World!"
```

If you inspect the page, you'll see the DOM (roughly) looks as this:

```
<html>
<body>
"Hello, World!"
</body>
</html>
```

Now you might think, let's add some HTML like this:

```
main = text "<div>Hello, <b>World!</b></div>"
```

However, now it (still) renders the value as text, so it does not apply the markup:

```
<html>
<body>
"<div>Hello, <b>World!</b></div>"
</body>
</html>
```

This is of course because we still pass the `text` function to `main`. So how do we render HTML that is interpreted by the browser?

### HTML

Let's start with just rendering a `div` element with a text. Next to the `text` function we were already importing, we also import the `div` function:

```
import Html exposing (text, div)

main = div [] [ text "Hello, World!" ]
```

The value of `main` now becomes the `div` function which expects two list arguments. The first one are HTML attributes of the `div`, which are empty (`[]`) in this case. The second argument is a list of children of the `div`, in this case the `text` with the `"Hello, World!"` argument:

Next, let's try to achieve the HTML we want, with `"World!"` being bold:

```
import Html exposing (text, b, div)

main = div [] [ 
  text "Hello, ", 
  b [] [ 
    text "World!" 
  ]
]
```

In the second (children) array argument, `div` not only receives the `"Hello, "` text, but also another element function for a bold text. This is the `b` function we've imported from `Html`. The `b` element also has an empty list for its attributes, but the child is the `"World"` text.

### CSS styling

...


