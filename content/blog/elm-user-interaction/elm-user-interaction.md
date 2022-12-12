---
date: "2022-12-05"
title: "Elm: User interaction"
summary: ""
categories:
  - "Functional programming"
  - "Elm"
---

### Introduction

This is my third blog post about Elm. After writing about [the Elm language](/elm-baby-steps), I wrote about [rendering a UI with HTML](/elm-rendering-html). However, this didn't include any user interaction, so that's what we are going to do now.

When talking about user interaction in modern front end frameworks, _state_ is a very important topic. State is the data in your app that can (and will) change, which in turn makes the UI change as well. By separating state from UI, we can build declarative and flexible apps.

For Elm this means we have to look into the so-called Elm Architecture, which defines how to structure Elm apps so the Elm Runtime can take care of updating the UI when the state changes.

### Let's build an app

Let's build a very simple interactive app, while explaining and adhering to The Elm Architecture.

It's December, so let's build an Xmas app. Santa is preparing to leave to deliver presents, however, all presents are still in his workshop, and need to be loaded on his sleigh...

(plaatje santa-1.png)

As you can see (right? 😏), on the left there the presents that are still in Santa's workshop, while on the right, there's Santa's sleigh, where all the presents should go.

By clicking on a present, it moves from the workshop to the sleigh, and vice versa.

### The view

One of the parts of The Elm Architecture is the UI, which Elm calls the View.

The HTML UI for our app looks as follows:

```
view model =
    div []
        [ h1 [] [ text "Let's Help Santa! 🎅🏻🙏🏻" ]
        , div [ class "container" ]
            [ div [ class "workshop" ]
                [ button [ id "present-2", class "present" ] []
                , button [ id "present-3", class "present" ] []
                ]
            , div [ class "sleigh" ]
                [ button [ id "present-1", class "present" ] []
                ]
            ]
        ]
```

We have a heading saying `"Let's Help Santa! 🎅🏻🙏🏻"`, and a bunch of `div`s: A `container`, which has 2 children, `"workshop"` and `"sleigh"`. Then there are 3 buttons, which are the "presents". `"present-1"` is already on the sleigh (child of the `"sleigh"` `div`), and the other two presents are still in the workshop, i.e. a child of the `"workshop"` `div`.

There is a bit of unnecessary duplication going on for the "presents", so let's create a function called `renderPresent` that renders the present `button`, and sets the `presentId` argument as the `id` attribute:

```
renderPresent presentId =
    button [ id presentId, class "present" ] []

view model =
    div []
        [ h1 [] [ text "Let's Help Santa! 🎅🏻🙏🏻" ]
        , div [ class "container" ]
            [ div [ class "workshop" ]
                [ renderPresent "present-2", renderPresent "present-3" ]
            , div [ class "sleigh" ]
                [ renderPresent "present-1" ]
            ]
        ]
```

If you read my previous blog post, you might notice a slight difference: Here. the HTML is defined in a function called `view`, that receives a `model` argument. It returns an HTML structure, kind of like we did before. In the HTML, we don't use the `model` argument yet. Then we call `main`, which calls the `view` and passes a string of `"todo"` as a dummy model for now.


### The initial model

The next part of the Elm Architecture is the model, which is the _state_ of our application. In our case, it's a list of presents, and their location:

```
type Location
    = Workshop
    | Sleigh

type alias Present =
    { id : String, location : Location }

initialModel : List Present
initialModel =
    [ { id = "present-1", location = Workshop }
    , { id = "present-2", location = Workshop }
    , { id = "present-3", location = Workshop }
    ]
```

The `initialModel` is a `List` of `Present` records (objects), where the `location` is of the `Location` type, which is either the `Workshop` or the `Sleigh`.

### Rendering the initial model

Now that we have an initial model, let's render that instead of the hard-coded elements:

```
view model =
    div []
        [ h1 [] [ text "Let's Help Santa! 🎅🏻🙏🏻" ]
        , div [ class "container" ]
            [ div [ class "workshop" ] (renderPresents model Workshop)
            , div [ class "sleigh" ] (renderPresents model Sleigh)
            ]
        ]
```

Notice how the hard-coded lists of presents have been replaced by a call to `renderPresents`, which receives 2 arguments, the `model` (all of the presents), and a `Location` type to filter on either `Workshop` or `Sleigh`.

This is the `renderPresents` function:

```
renderPresents presents locationFilter =
    List.map (\p -> renderPresent p.id) (List.filter (\p -> p.location == locationFilter) presents)
```

It receives the `presents`, which it filters with `List.filter` on the given `locationFilter`. The filtered presents is passed as the second argument to `List.map`, which only keeps the `id` of the present, because that's the only thing the `renderPresent` needs.

Note how I use parenthesis so Elm knows which arguments belong to which function call. You need to read this from the inside out: First there is the filter on `presents`, and then there is a map on the result.

We've used two list functions here, `List.filter` and `List.map`. There are a few things that are different when you are used to JavaScript:

- They are not _methods_ on a list, but instead independent functions where you pass the list to. Methods do not exist in Elm, there are only functions, which need to _receive_ all arguments.

- The list to filter or map on is the _second_ argument.

- The first argument of both functions is an anonymous function which defines what to apply on every item in the list. In Elm, anonymous functions start with a `\` (backslash), and we use the arrow `->` before returning.

### Preparing the `update`

The third part of The Elm Architecture, next to View and Model, is Update. This of course is also a function, which receives all of the information to update the model. After the model is updated, the Elm Runtime will update the UI, by applying the updated model to the view.

The `update` function needs to two arguments, and the first one is the message (`msg`), which has all the information to update the model with, and the second argument is the `model` itself. Let's first look at the type definition for the `msg` argument:

```
type Msg
    = MoveTo String Location
```

This says that for the `MoveTo` message it needs a `String` (the present id), and the `Location` to move the present to.

You could see this messages as being _actions_ you can perform on the model. `Msg` is a union type, so you could add more message using a pipe:

```
type Msg
    = MoveTo String Location
    | Unwrap String
```

Now that we have defined which message we can use, lets add an `onClick` to the button in `renderPresent`:

```
renderPresent presentId =
    button
        [ id presentId
        , class "present"
        , onClick
            (MoveTo presentId Sleigh)
        ]
        []
```

The `onClick` expects a message, so that is why we call the `MoveTo`, and supply it with the present we want to move, and `Sleigh` as the location.

Now that we have defined a message, and a user action to trigger it, let's start with creating the `update` function to actually update the model:

```
update msg presents =
    case msg of
        MoveTo presentId location ->
            presents
```

The `update` function receives two arguments, the `msg`, and the `presents` model. It then checks the `msg`, and if it's `MoveTo`, it receives the `presentId` and `location` sent by the `onClick`. However, it does not do anything with it yet, it just returns the unchanged 'presents` again.

This is a switch/case statement, but if the `Msg` union type would still have the `Unwrap` message, this code would not compile, because it is not implemented yet in the case statement. So let's remove `Unwrap`, because we won't use it. 

### Implementing the `update`

The `update` function needs to be changed, so that it finds the present to update, and then changes the location of that present:

```
update msg presents =
    case msg of
        MoveTo presentId location ->
            let
                updatedPresents =
                    List.map
                        (\present ->
                            if present.id == presentId then
                                { present | location = location }

                            else
                                present
                        )
                        presents
            in
            updatedPresents
```

There is a lot going one here, so let's start reading from the inside out: There is a `List.map` to find the present by `presentId`, and change the `location`. The result of the map is being assigned to `updatedPresents`, which is inside a `let` to ... ... ... ... ... ... .... 

The `updatedPresents` are returned, as being the new, updated model.

This `update` function can change the location of a present to any `Location`, while in the `onClick` we said it should always go to the `Sleigh`. So let's improve `renderPresent` so that presents in the workshop go to the sleigh, but also vice versa:

```
renderPresent present =
    button
        [ id present.id
        , class "present"
        , onClick
            (MoveTo present.id
                (if present.location == Sleigh then
                    Workshop

                 else
                    Sleigh
                )
            )
        ]
        []
```

Note how `renderPresent` no longer only receives `presentId`, but instead the whole `present`. With this we can check the current location, and pass the new location to `MoveTo`.

This also simplifies the `renderPresents` functions, because the `List.map` can now just pass the whole present:

```
renderPresents presents locationFilter =
    List.map renderPresent (List.filter (\p -> p.location == locationFilter) presents)
```

### Wiring it all together

Elm needs to know we've written the `update` function, so let's update the call to `main`:

```
import Browser

-- <<< skip all the other code >>>

main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
```

We've imported `Browser`, and assign `Browser.sandbox` to `main`. This is Elm's way to indicate an app is _interactive_, as in, it has a model that can change by user interaction, and the view has to reflect that.

Notice how, with this change, we only pass `initialModel`, `view`, and `update`. All of the parts of the Elm Architecture come together here as we hand them over the Elm Runtime, which will keep everything in sync now.

Nowhere in our code you actually see we pass the model to the view and update, that's what Elm Runtime is doing for us. We only need to pass the things from our own code that only we know, to show and update the right thing.

### Conclusion

Man, figuring out the Elm Architecure, and implement it, while writing this blog post was quite the journey! But it feels great with this experience I have a nice first overview of how to build an interactive Elm app.

There are of course many things to improve here, and of course many other things to still find out, but I am really starting to understand and like (!) Elm.

I hope you found this interesting, and please let me know if you have anything to add or ask.