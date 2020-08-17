---
date: "2020-03-17"
title: "useEffect for handling side effects"
categories:
  - "React"
  - "useEffect"
---

**Introduction**

React offers several hooks and one you'll encounter almost certainly, even when building
the most basic app, is the `useEffect` hook.

However, it is not only very commonly used, it's also quite challenging to really grasp it.

Although there are many other blog posts explaining this hook, I still write my own because I am sure
it will help me to grasp it even better and I hope it does the same for you too.

**Side effects**

The `useEffect` hook is for handling _side effects_ of React components. But what are side effects?

> In computer science, an operation, function or expression is said to have a side effect if it modifies
> some state variable value(s) outside its local environment, that is to say has an observable effect
> besides returning a value (the main effect) to the invoker of the operation.
>
> -- Wikipedia

This general definition is very applicable to React components. It describes that next to _side effects_, there
are also _main effects_. So before going to side effects, the question is: What is the _main effect_ of React
components?

Well, a React component actually has two main effects, the first is _rendering_ UIs, i.e. defining what the component
looks like in the browser, which is expressed in JSX.

The second one is _handling events_, which are triggered by the user that interacts with your app. Handling these
events most of the times result in a state update, which in turn causes a render again.

This cycle of rendering, handling events, updating state, rendering again etc. is the common lifecycle of
most React components. It makes them pure: Given the same input, you always get the same output. This is how you
make reusable and testable UI components. They have no behavior other than rendering and handling user events.

However, to make your app really dynamic and useful, you often need to fetch and send data from/to a server. Or
maybe you need to start a timer which does something recurring. If these kind of things won't be triggered by
a user (event), it is a _side effect_ for a React component.

**Do You Haz Teh Codez?**

Well, certainly. Let's create a very contrived and simple React app so we can really focus on side effects
and `useEffect`. Our app consists of one component:

```js
function App() {
  return <h1>Hello World</h1>;
}
```

The `App` component gets rendered by our app and no matter how often we call it, it always returns a
heading containing the text _Hello World_.

Let's add a `button` to keep track of how many times it was clicked and display that value. This makes
our component dynamic, so we need to use the `useState` hook to make sure React will always render
the current `clicked` value:

```js
function App() {
  const [clicked, setClicked] = useState(0);
  return (
    <>
      <h1>Hello World</h1>
      <p>{clicked}</p>
      <button onClick={() => setClicked(clicked + 1)}>Click Me</button>
    </>
  );
}
```

What we've implemented here is a regular UI component. It renders some kind of UI and as soon as the
user clicks the button, `clicked` is incremented and the component is rendered again. It is still pure,
it always returns the same UI. Even when you click the button, the UI is very predictable.

**Let's add a side effect**

While our app is really cool already, we decide to spice it up a bit. Instead of the _Hello World_ text,
we want to display some random text we fetch from an API.

To keep it simple, it doesn't matter which API we call and whether that API is REST or GraphQL.
What _does_ matter though is _how_ and _when_ we call the API.

Every time someone opens our app, the `App` component's _main effect_ is executed, which renders the UI. What
we _also_ want to do is call the API to fetch the text. This is a side effect, so we'll use the `useEffect`
hook in our component.

The `useEffect` hook is a function, provided by React. For each side effect you want to implement, you call
this function, _inside_ your component. You pass at least one argument and that is the _function_ that contains
the implementation of your actual side effect. In our case that is calling the API to fetch a random text. What
React will do is call this function argument _after_ each render.

In the code below, I've added the `useEffect` call and pass the `getTextFromApi` function. Every time the
`App` component is rendered the `getTextFromApi` is called, even though it doesn't do anything yet:

```js
function App() {
  const [clicked, setClicked] = useState(0);

  useEffect(function getTextFromApi() {
    //TODO: call the API...
  });

  // <--- unchanged return statement ommitted ---> //
}
```

> It is common to pass an arrow function to `useEffect`, but by explicitely naming the function `getTextFromApi`
> like I do here, it is much clearer what this side effect implementation actually does.

**Calling an API inside `useEffect`**

The current _Hello World_ text must be replaced by a text coming from the API, so we'll create a state variable for this called
`text` and the function `setText` to update it. In the JSX we render this `text` variable instead of the hard-coded _Hello World_.

Furthermore, we'll import the `getRandomText` function which does the actual API call.

Finally, inside the `getTextFromApi` function. inside the `useEffect`, we call `getRandomText` and then `setText` to
update the `text` state.

Now, our code looks like this:

```js
function App() {
  const [clicked, setClicked] = useState(0);
  const [text, setText] = useState();

  useEffect(function getTextFromApi() {
    getRandomText().then(text => setText(text));
  });

  return (
    <>
      <h1>{text}</h1>
      <p>{clicked}</p>
      <button onClick={() => setClicked(clicked + 1)}>Click Me</button>
    </>
  );
}
```

Every time the component is rendered, `text` is updated with the text coming from the API. This happens when the component
is rendered for the first time but also when clicking the button, because then the `clicked` state is updated which also causes
a render.

However, there is no reason to call the API after each `button` click. We only want to call it when the component is
rendered for the first time.

> A great blog post about fetching data with `useEffect` is Robin Wieruch's [How to fetch data with React Hooks?]. It also covers
> working with `async` and `await`.

**The dependency array**

Now that we know _how_ to handle and implement side effects with the first argument to the `useEffect` call, let's look at controlling
_when_ to execute these side effects. This is done by supplying a _second_ argument to `useEffect`, which is the so-called _dependency array_.

This array must contain all variables where the side effect implementation in the first `useEffect` argument depends on.
In other words: which variables are _used_ in the implementation.

Possible candidates for such a dependency are variables that are an argument to the component function, better known as `props`,
and variables (so functions too) that are defined _inside_ the component.

The `getRandomText` function we use in our effect is imported, so it is defined _outside_ the component, and therefore is _not_
a dependency. If it would be a local function, it would have been a dependency.

So our side effect has no dependencies, but how can we use the dependency array to make sure the effect is only called once?

Before the side effect inside `useEffect` is executed, React checks first whether the variables in the dependency array have
a different value since the previous render. If not, it is not necessary to execute the effect again, because executing the effect
with the same values would yield the same result anyway.

So to make sure an effect is only executed once, you just make sure the values inside the dependency array _never_ change.
And the easiest way to achieve that is to pass an _empty_ dependency array because an empty array will never change! 😄

So the only thing we have to add in our code is an empty array as the second argument to our `useEffect` call:

```js
useEffect(
  function getTextFromApi() {
    getRandomText().then(text => setText(text));
  },
  [] // <=== Empty dependency array
);
```

**A `useEffect` _with_ dependencies**

Let's change our app so I can demonstrate how `useEffect` works when you do have a dependency.

Instead of getting a random text for the API I will call the so-called [Numbers API]. This API returns trivia about numbers.
I'll import the `getNumberText` function which handles calling the Numbers API and I remove the import of `getRandomText`.

Inside my `getTextFromApi` function I now call `getNumberText` and pass a number, which is the `clicked` state variable I already had.

If I would run my app now the effect would only be called the first time, while I also want to call it when `clicked` changes. This is
the moment to add the `clicked` variable to the dependency array:

```js
useEffect(
  function getTextFromApi() {
    getNumberText(clicked).then(text => setText(text));
  },
  [clicked]
);
```

**Closing note**

This post covered the basics of handling side effects in React with the `useEffect` hook. I learned a lot from it
and I hope you did too.

> **Want a real deep dive into `useEffect`?**
>
> Then read Dan Abramov's very long blog post (or mini-book, as he calls it)
> [A Complete Guide To useEffect].

Please contact me on [Twitter] if you have questions or remarks.

[how to fetch data with react hooks?]: https://www.robinwieruch.de/react-hooks-fetch-data
[numbers api]: http://numbersapi.com
[a complete guide to useeffect]: https://overreacted.io/a-complete-guide-to-useeffect
[twitter]: https://twitter.com/bouwe
