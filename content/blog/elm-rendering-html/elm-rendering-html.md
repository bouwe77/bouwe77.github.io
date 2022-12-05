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

In this post I'll look into rendering HTML with Elm. This is very common, as Elm is a language for creating web applications. The Elm code you write is compiled into JavaScript.

Again, we will use the [Elm Playground](https://elm-lang.org/try) so you don't have to install anything, and we can just fiddle around.

In this blog post I'll focus on just _showing_ HTML. Adding user interaction will be something for a next article.

### Hello World

As I've already explained in [my previous Elm blog post](/elm-baby-steps), the following Elm program renders the text `"Hello World"` in the browser:

```
import Html exposing (text)

main = 
    text "Hello, World!"
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
main =
    text "<div>Hello, <b>World!</b></div>"
```

However, now it (still) renders the value as text, so it does not apply the markup:

```
<html>
<body>
"<div>Hello, <b>World!</b></div>"
</body>
</html>
```

The reason for this is we still pass the `text` function to `main`. It's purpose is to add plain text to the DOM. It's the equivalent of rendering text content into an element, in this case in the `body` element.

So how do we write HTML that is rendered by the browser?

### HTML

Let's start with just rendering a `div` element with a text. Next to the `text` function we were already importing, we also import the `div` function:

```
import Html exposing (div, text)

main =
    div [] [ text "Hello, World!" ]
```

The value of `main` now becomes the `div` function which expects two list arguments. The first one are HTML attributes of the `div`, which are empty (`[]`) in this case. The second argument is a list of children of the `div`, in this case the `text` with the `"Hello, World!"` text content as an argument.

Next, let's try to achieve the HTML we want, with `"World!"` being bold:

```
import Html exposing (b, div, text)

main =
    div []
        [ text "Hello, "
        , b []
            [ text "World!"
            ]
        ]
```

In the second (children) array argument, `div` not only receives the `"Hello, "` text, but also another element function for a bold text, the `b` function we've imported from `Html`. The `b` element also has an empty list for its attributes, and a child for the `"World"` text.

> Note the indentation of the code, this is how you should indent Elm code. Personally I really have to get used to this, so for now I let my editor do the formatting, also because incorrect formatting gives compilation errors. You could use VS Code, or an online editor such as [Elm Editor](https://elm-editor.com) to do this for you.

### CSS styling

Until now we have not supplied any attributes to the `div` and `b` elements we've used, so let's do that now. Let's center the div and make the bold text red:

```
import Html exposing (b, div, text)
import Html.Attributes exposing (style)

main =
    div
        [ style "display" "grid"
        , style "place-items" "center"
        , style "min-height" "5vh"
        , style "background-color" "white"
        ]
        [ text "Hello, "
        , b
            [ style "color" "red"
            ]
            [ text "World!"
            ]
        ]
```

We import `style` from `Html.Attributes`, and pass it to both the `div` and `b` in the first argument, which is the attributes argument.

Of course you can also use CSS classes:

```
import Html exposing (b, div, text)
import Html.Attributes exposing (class)

main =
    div
        [ class "container"
        ]
        [ text "Hello, "
        , b
            [ class "emphasis"
            ]
            [ text "World!"
            ]
        ]
```

Just like with most frontend frameworks, Elm is not opinionated about CSS styling, so there are many more ways of doing that.

### Conclusion

Of course there is a lot more to say about HTML, but that's for another time. A very nice next step would be to discover how to make a web app interactive, so stay tuned!

Thanks for reading, and if you have questions or remarks, please let me know!



