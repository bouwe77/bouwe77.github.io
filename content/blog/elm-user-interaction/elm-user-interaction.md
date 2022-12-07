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

There is a bit of unnecessary duplication going on for the "presents", so let's create a function called `present` that renders the present `button`, and sets the `presentId` argument as the `id` attribute:

```
renderPresent presentId =
    button [ id presentId, class "present" ] []

view model =
    div []
        [ h1 [] [ text "Let's Help Santa! 🎅🏻🙏🏻" ]
        , div [ class "container" ]
            [ div [ class "workshop" ]
                [ renderPresent "present-2"
                , renderPresent "present-3"
                ]
            , div [ class "sleigh" ]
                [ renderPresent "present-1"
                ]
            ]
        ]
```

If you read my previous blog post, you might notice a slight difference: The HTML is defined in a function called `view`, that receives a `model` argument. It returns an HTML structure, kind of like we did before. We don't use the `model` argument yet. Then we call `main`, which calls the `view` and receives a string of `"todo"` as a value for now.


### The initial model

The next part of the Elm Architecture is the model, which is the state of our application. In our case, it's a list of presents, and their location:

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

The `initialModel` is a list of `Present` records, where the `location` is either `Workshop` or `Sleigh`.

### Rendering the initial model

Now that we have an initial model, let's render that instead of the hard-coded elements:

