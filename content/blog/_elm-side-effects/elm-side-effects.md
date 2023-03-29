---
date: "2023-03-14"
title: "Side effects in Elm"
summary: "... ... ..."
categories:
  - "Functional programming"
  - "Elm"
---

### Introduction

This is my fourth blog post about Elm. In the 3 previous articles I wrote about [the language](/elm-baby-steps), [rendering HTML](/elm-rendering-html), and [handling user interaction](/elm-user-interaction).

These apps had no side effects, because they only use pure functions, and were safely running in Elm's sandbox. The sandbox makes sure an app can not communicate with the outside world, so the only thing these apps do is run the app's code, which, when compiled successfully will not have any technical problems, such as runtime errors, or `null` or `undefined` values.

The only thing that can go wrong is that it functionally does not work as expected, but that would be a bug, caused by misunderstanding the desired functionality, or by any other human mistake.

However, most apps are not very useful if they do not communicate with the outside world, for example calling an HTTP API, or even working with the current time, or randomization. So let's discover how you can build an Elm app that does communicate with the outside world.

And also how it is possible that it then still will not throw runtime errors, or have `null` or `undefined` values.

To keep it simple, we will build an app that generates a random number.

### Wiring up the app

Let's start with the initial model, and architect the app around it as we go:

```
type alias Model =
    Int

init : Model
init =
    0
```

The type of our `Model` is an `Int`, and the initial value is not (yet) random, but just `0` for now.

Let's have a view that displays the number, and a button to generate a new number:

```
view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text (String.fromInt model) ]
        , button [ onClick GenerateRandomNumber ] [ text "GENERATE" ]
        ]
```

The `model` is passed to the view by the Elm runtime, but in order to display it as the `text` of the `h1` element, we convert it to a string with `String.fromInt`. When the button is clicked, we send the `GenerateRandomNumber` message.

Let's implement the `GenerateRandomNumber` message, by (for now) just incrementing the number:

```
type Msg
    = GenerateRandomNumber

update : Msg -> Model -> Model
update msg model =
    case msg of
        GenerateRandomNumber ->
            model + 1
```

So when we click the button, the Elm runtime passes the current model to the `update`, and when the message is `GenerateRandomNumber` it returns a new model, where the model is incremented.

By the way, we don't need to account for any other messages, because there aren't any. This code compiles, so it is guaranteed that every possible message is handled here.

As we do not yet communicate with the outside world, we run the app sandboxed:

```
main : Program () Model Msg
main =
    Browser.sandbox { init = init, update = update, view = view }
```

Here we tell Elm to initialize the model with our `init` function, to call the `update` function we created whenever we send a message, and which `view` to render.

### Leaving the sandbox

Finally it's time for our app to leave the safe sandbox and allow our app to communicate with the outside world. We do this by switching our app from `Browser.sandbox` to `Browser.element`:

```
main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }
```

Note how we added `subscriptions` to the record we pass to `Browser.element`, which you can use to listen to things like the current time, web socket messages, etc. We don't do that now, so we tell Elm to don't listen to anything.

The second change we need to do is making it possible for _flags_ being passed to our app when it's being initialized. Flags are values that originate from outside of your Elm app, but you want to pass into it, for example environment variables. These flags would be received in the `init` function, so we need to change it so it looks like this:

```
init : () -> ( Model, Cmd Msg )
init _ =
    ( 0
    , Cmd.none
    )
```

`init` does not receive arguments (flags), still has the initial value of `0`, and there are no additional commands (`Cmd.none`) to be executed when initialized.

### Generating random numbers

The only thing left to do is changing the `update` function to generate a random number instead of incrementing it.

The concept of having side effects in an Elm app is to tell the Elm _what and how_ to do something, and giving it the function to call back when that is done. This way, things like generating random numbers, but also calling an HTTP API, happen outside of your code, in the Elm runtime, so that your own code keeps on only having pure functions and no side effects.

The first step to change the `update` function is ... ...

```
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GenerateRandomNumber ->
            ( model
            , Random.generate RandomNumberGenerated (Random.int 1 6)
            )
```

...bla...
...bla...
...bla...

```
-- code
-- code
-- code
```

To be clear, in your code, generating the random number, and handling the result of that, is not directly called, it is called by the Elm runtime. You only specify what and how it should be done.

Generating a random number can not fail, which is why you only have to provide the message to be sent when the random number is generated. However, if you would call an HTTP API, it could fail, which is why in that case you also have to provide an implementation for handling errors. But more on that in a future blog post.

### Conclusion

Although this app does very little, the thing to take away is that your code is free of side effects, even though you are using things that require having side effects. The Elm runtime handles side effects for you, keeping your code clean and simple, and easier to reason about.

The next step is to call an HTTP API, because then things could go wrong, so how would you still keep your app free of errors?



