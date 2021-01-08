---
date: "2021-01-07"
title: "Learn React basics by creating a simple calculation game (part 3)"
summary: ""
categories:
  - "React"
  - "simple calculation game"
  - "useReducer"
---

This is part 3 of a series of blog posts where I explore basic React principles by building a simple calculation game. In this blog post I will improve the app I created in [Part 1] and [Part 2]. You might want to read those first, so you know what the app is about and how it was built.

Or check out the [demo on Netlify]. In this blog post we'll create version 3.

In this blog post we'll hardly change the functionality, instead, we take another approach to managing state in our component by using the `useReducer` hook. I'll explain how to do this and why this might improve your React component code.

At the moment, the top of the `App` component looks like this, we have 3 `useState` calls for 3 separate state variables:

```js
function App() {
  const [question, setQuestion] = useState({ choices: [] });
  const { answer, choices } = question;
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState();
  /* ... */
```

The variables that `useState` returns, both the current state value and the setter functions, are used throughout the component. When a component becomes bigger and/or more complex, you might lose track of where, why and how state is updated.

Switching from using various `useState`s to one `useReducer` hook is one of the approaches to solve this problem. Because `useReducer` is an alternative for `useState`, switching to `useReducer` most of the times is a refactor and not necessarily a change in functionality, which is also the case in this blog post.

### The arguments to `useReducer`

Before calling `useReducer` in the component, we'll create variables that we need to pass to `useReducer`.

First there is a _reducer function_, which I'll call `appReducer`, but you can name it anything you like. More on what this function does later on.

Next there is the _initial state_. In our case we do have some initial state, so we create an object that contains all initial state that is needed for our component and until now was passed to `useState`.

Finally we call `useReducer` inside the component and pass the 2 variables we just created:

```js
function appReducer() {}

const initialState = {
  question: { choices: [] },
  selected: [],
  result: null,
};

function App() {

  useReducer(appReducer, initialState)
  //const [question, setQuestion] = useState({ choices: [] });
  //const { answer, choices } = question;
  //const [selected, setSelected] = useState([]);
  //const [result, setResult] = useState();
  /* ... */
```

Now is a good time te delete all commented out `useState` calls too, because we don't need them anymore.

Although we still have to implement `appReducer`, we are finished passing all necessary arguments to `useReducer`. Now let's focus on what `useReducer` returns.

### What `useReducer` returns

Just like `useState`, `useReducer` returns an array with two items: The first one is the _current state_, which is an object that contains all the separate state variables we had before when we had separate `useState` calls: `question`, `selected` and `result`.

The second item of the array returned by `useReducer` is the `dispatch` function. It's the function we'll later call to update state.

Notice how both `useState` and `useReducer` return an array with two items which have a similar goal, although the usage of these items differs, as you will see soon.

```js
function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  /* ... */
```

`state` is an object containing all state variables, so instead of only destructuring `question`, now let's destructure the whole `state`, so all code that _uses_ the separate state values does not break:

```js
function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { question: { answer, choices }, selected, result } = state;
  /* ... */
```

We finished calling `useReducer`, but our code is broke now, because all the setter functions we used to receive from the `useState` hook (`setQuestion`, `setSelected` and `setResult`) are gone now.

### Replacing `useState` setters by `dispatch`

Now we will replace all `useState` setter calls with `useReducer`'s `dispatch` calls. And along with it we will implement our `appReducer` function which will perform the actual state updates.

Let's start with a state update that really shows where using `useReducer` shines, and that is the `reset` function:

```js
function reset() {
  setSelected([]);
  setResult(null);
}
```

It has two calls to set different state variables. We will replace this by one `dispatch` call. And that is because `selected` and `result` are now part of a single state object. When calling `dispatch` you always pass a so-called _action_ object, which at least always contains the _action type_. The action type is a `string` value that indicates _what_ you want to change about the state. By convention these are in upper case, but you can use any casing you like. Let's call it "RESET", just like the name of the function:

```js
function reset() {
  //setSelected([]);
  //setResult(null);
  dispatch({ type: "RESET" });
}
```

Notice that we went from calling setter functions that exactly described _how_ to change the state to a `dispatch` call that only describes _what_ you want to change about the state. This is the big difference between `ueState` and `useReducer`.

Now that we told React to "RESET", let's implement our reducer to actually do that.

First we change the signature of our reducer to make it adhere to what React expects from a reducer by adding the two required arguments `state` and `action`:

```js
function appReducer(state, action) {
  //TODO reducer implementation
}
```

Now you might think: _Who_ is going to call this function? Because _we_ don't, we just call `dispatch`.

What happens is that when we call `dispatch`, React will call `appReducer` for us and will pass the two required arguments we just added: First the _current state_, which is something React is keeping track of. And the second argument is `action`, which is the object we passed to the `dispatch`. For the reset call it only contains a `type` string, but it can contain more as you will see later on.

Let's implement `appReducer` so it resets the appropriate state variables.

What a reducer always returns is a **new** state object. State should always considered to be immutable: don't change the incoming state directly, but instead return a new object.

> React uses immutable state to detect whether a state change occurred and a re-render is necessary without having to do any comparison of the previous and current state's data: No matter what exactly has changed, it is new, so just re-render.

A way to return a new object based on another object is to use the spread operator:

```js
function appReducer(state, action) {
  return { ...state, selected: [], result: null };
}
```

What this return statement says is: Return the state as it was, but make `selected` an empty array and set `result` to `null`.

Note how we did not use the `action` argument yet, because this is the only state change our reducer does until now. However, there will be more action types so let's prepare our reducer for that by adding a `switch` statement:

```js
function appReducer(state, action) {
  switch (action.type) {
    case "RESET":
      return { ...state, selected: [], result: null };
    default:
      return state;
  }
}
```

I also added a `default` which returns the current state so our reducer at least always returns _something_.

We have finished our first state change with `useReducer`.

On to the next one, the `done` function, which is determining whether the given answer is correct:

```js
function done() {
  const selectedTotal = selected.reduce((a, b) => a + b, 0);
  selectedTotal === answer ? setResult("correct!") : setResult("incorrect...");
}
```

Here you have to decide what goes to the reducer and what stays in the `done` function. However, this function is only using the current state to do some checking and there is no reason to keep it here. Next to updating state, a reducer's responsibility can also be to take care of the UI logic of your component:

```js
function done() {
  dispatch({ type: "ANSWER_QUESTION" });
}
```

And the reducer implementation, where I ommitted the other action type implementations:

```js
function appReducer(state, action) {
  switch (action.type) {
    /* ... */
    case "ANSWER_QUESTION": {
      const selectedTotal = state.selected.reduce((a, b) => a + b, 0);
      const result =
        selectedTotal === state.question.answer ? "correct!" : "incorrect...";
      return { ...state, result };
    }
    /* ... */
  }
}
```

### Passing additional action data to a reducer

Next, let's tackle selecting and deselecting a number:

```js
function select(number) {
  setSelected([...selected, number]);
}

function deselect(number) {
  const index = selected.indexOf(number);
  if (index === -1) return;
  const newSelected = [...selected];
  newSelected.splice(index, 1);
  setSelected(newSelected);
}
```

For both functions we will move the full implementation to the reducer.

But implementing the reducer for these functions is kind of special: Next to the _action type_, we need to tell the reducer the `number` that was clicked. Therefore we also supply the _action payload_, an object that contains the `number`:

```js
function select(number) {
  dispatch({ type: "SELECT", payload: { number } });
}

function deselect(number) {
  dispatch({ type: "DESELECT", payload: { number } });
}
```

And this is the reducer:

```js
function appReducer(state, action) {
  switch (action.type) {
    /* ... */
    case "SELECT":
      const newSelected = [...state.selected, action.payload.number];
      return { ...state, selected: newSelected };
    case "DESELECT": {
      const index = state.selected.indexOf(action.payload.number);
      if (index === -1) return state;
      const newSelected = [...state.selected];
      newSelected.splice(index, 1);
      return { ...state, selected: newSelected };
    }
    /* ... */
  }
}
```

> What you put in the `payload`, a numeric value, an object, etc. is up to you. You can even call it `data` or whatever instead of `payload`. As long as your reducer can handle it. However, using `payload` with an object is a convention that is used most often and therefore is recommended.

### Calling `dispatch` in a `useEffect`

Finally, we'll implement getting a new question after the previous one was answered. This is handled by a `useEffect` implemented:

```js
useEffect(() => {
  if (!result) setQuestion(getQuestion());
}, [result]);
```

Let's replace `setQuestion` by a dispatch with an action type of "NEW_QUESTION" and putting the new `question` in the payload:

```js
useEffect(() => {
  if (!result) {
    const question = getQuestion();
    dispatch({ type: "NEW_QUESTION", payload: { question } });
  }
}, [result]);
```

Note how the `useEffect` is still responsible for getting a new question, because that is still a _side effect_. However, updating the `question` state will be handled by the reducer:

```js
function appReducer(state, action) {
  switch (action.type) {
    /* ... */
    case "NEW_QUESTION":
      return { ...state, question: action.payload.question };
    /* ... */
  }
}
```

### What did we gain with using `useReducer`?

You might think, using `useReducer` is quite complicated. Well, it's getting used to I think.

The big change we made in our component is that the component tells _which_ state change it wants. And not, like we did with `useState`, _how_ exactly the state should change. And this is particularly interesting for components that have a complex state structure and/or a lot of places where the state changes.

However, there are people who always and only use `useReducer`, just to keep components more clean. It's up to you whether you think this is a good approach.

Until now, we did not change the functionality of our app, it was just a straight up refactor.

But when using `useReducer`, adding new functionality can also have a smaller impact on your component code, because there is less going on. To demonstrate this, I will add a score which keeps track of the number of correctly answered questions.

First we introduce a new state variable `score` in the component by destructuring it from `state` and render it in the JSX:

```js
function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { question: { answer, choices }, selected, result, score } = state;

  /* ... */

  return (
    <div className={styles.container}>

      /* ... */

      <div className={styles["full-width"]}>
        Score: {score}
      </div>

      /* ... */
```

Finally, we add it to the `initialState` with value `0` and in the reducer increase the score when the answer is correct:

```js
function appReducer(state, action) {
  switch (action.type) {
    /* ... */
    case "ANSWER_QUESTION": {
      const selectedTotal = state.selected.reduce((a, b) => a + b, 0);
      if (selectedTotal === state.question.answer) {
        return { ...state, result: "correct!", score: state.score + 1 };
      } else {
        return { ...state, result: "incorrect..." };
      }
    }
    /* ... */
  }
}
```

See how we hardly changed the component code, because it doesn't contain any logic regarding state. The real magic is going on in the reducer.

Next to cleaner components with less complexity and more focus on the actual UI, components also become smaller. This is already the case with how my code changed in this blog post, but we can even go a step further.

Scroll up to see how we do all the `dispatch` calls inside functions which are called from the `onClick` events in the JSX. We could get rid of all these functions and call `dispatch` from the `onClick` events directly. This is also something that depends on your personal preference, but it can make components more concise.

### Wrapping up

That's it for `useReducer`, I hope you liked reading it as I did writing it.

The next thing I want to do with this app is test it with [React Testing Library], because that is something I really want to learn and share, so stay tuned!

P.S. The source code for this app is on my GitHub: https://github.com/bouwe77/react-simple-calculation-game/blob/main/src/simple-calculation-game/v3/App.js

[part 1]: /learn-react-basics-by-creating-a-simple-calculation-game-part-1
[part 2]: /learn-react-basics-by-creating-a-simple-calculation-game-part-2
[demo on netlify]: https://react-simple-calculation-game.netlify.app
[react testing library]: https://testing-library.com/docs/react-testing-library/intro/
