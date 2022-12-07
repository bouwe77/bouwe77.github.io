---
date: "2022-12-05"
title: "Elm: User interaction"
summary: ""
categories:
  - "Functional programming"
  - "Elm"
---

### Introduction

This is my third blog post about Elm. After writing about the language, I wrote about creating a web page with HTML. However, this was about rendering some HTML, but it didn't support any user interaction. So that's what we are going to do now.

When talking about user interaction in modern front end frameworks, _state_ is a very common topic. State is the data in your app that can (and will) change, which in turn makes the UI change as well. By separating state from UI, we can build declarative and flexible apps.

This means for Elm, we have to look into the so-called Elm Architecture, which defines how to structure Elm apps so we have this separation between state and UI. So let's build a very simple interactive app, while explaining and adhering to The Elm Architecture.

### ...

De functionaliteit van de app...

### The Elm Architecture

...


### The view

The View is the UI of our app.

(plaatje santa-1.png)

As you can see (right? 😏), on the left there are 2 presents that are still in Santa's workshop, while on the right, there's Santa's sleigh, with already one present on it.

The HTML UI for this looks as follows:

```
main =
    div []
        [ h1 [] [ text "Let's Help Santa! 🎅🏻🙏🏻" ]
        , div
            [ class "container"
            ]
            [ div
                [ class "workshop"
                ]
                [ button
                    [ id "present-2"
                    , class "present"
                    ]
                    []
                , button
                    [ id "present-3"
                    , class "present"
                    ]
                    []
                ]
            , div
                [ class "sleigh"
                ]
                [ button
                    [ id "present-1"
                    , class "present"
                    ]
                    []
                ]
            ]
        ]
```

We have a heading saying `"Let's Help Santa! 🎅🏻🙏🏻"`, and a bunch of `div`s: A `container`, which has 2 children, `"workshop"` and `"sleigh"`. Then there are 3 buttons, which are the presents. Present 1 is already on the sleigh (child of the `"sleigh"` `div`), and the other two are still in the workshop, i.e. a child of the `"workshop"` `div`.

There is a bit of unnecessary duplication going on for the presents, so let's create a function called `present` that renders the present `button`, and sets the `presentId` argument as the `id` attribute:

```
present presentId =
    button
        [ id presentId
        , class "present"
        ]
        []


main =
    div []
        [ h1 [] [ text "Let's Help Santa! 🎅🏻🙏🏻" ]
        , div
            [ class "container"
            ]
            [ div
                [ class "workshop"
                ]
                [ present "present-2"
                , present "present-3"
                ]
            , div
                [ class "sleigh"
                ]
                [ present "present-1"
                ]
            ]
        ]
```

In order to make this the view of our app, ...

```
-- TODO view.. .
```

### The model

The Model is the state of our application.

### Rendering the model

...

### Updating the model

...

### Conclusion

...