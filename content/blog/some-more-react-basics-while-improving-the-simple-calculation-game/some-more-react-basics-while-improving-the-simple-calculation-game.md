---
date: "2020-12-29"
title: "Some more React basics while improving the simple calculation game (part 2)"
summary: ""
categories:
  - "React"
  - "useEffect"
  - "simple calculation game"
---

This is part 2 of a series of blog posts where I'll explore some more basic React principles by building a simple calculation game. In this blog post I will improve the app I created in [Part 1]. You might want to read that first, so you know what the app is about and how it was built.

In this blog post we'll make the questions dynamic, because answering the same question over and over again is a bit boring.

The main React topic we'll cover in this blog post is the `useEffect` hook.

### Demo

The app we are building can be found here: https://react-simple-calculation-game.netlify.app. Version 1 we built in [part 1] and now we will create version 2.

### A function for random questions

We need a function that returns a random question. This question consists of an `answer`, which is the number you'll have to add up to, and `choices`, which is an array of numbers to choose from. The function will return an object containing these two properties. To keep it simple, the `choices` array will still be hard-coded and `answer` will be a random number between 2 and 10:

```js
function getQuestion() {
  const min = 2;
  const max = 10;
  const answer = Math.floor(Math.random() * (max - min + 1) + min);
  return { answer, choices: [1, 2, 3, 4] };
}
```

In our `App` component we'll need to call this function. But before we do that we'll have to answer the following question: Does this function need to be _inside_ or _outside_ the component?

I always keep these kind of functions _outside_ the component.

The first reason for that is about _separation of concern_: A React component is responsible for rendering UIs and should contain all code that is needed to do that. However, the `getQuestion` function has nothing to do with UIs, it's a function that contains business logic and even data. Of course it will be _used_ for the UI in this case, but it could also be used for another purpose. Putting it outside keeps the component code clean.

A second reason is about the behavior of React components. With every state change (for example: when clicking the numbers) the `App` component will be re-rendered which means the `getQuestion` function would be re-created with every render. For this app this is not really a big deal, but it is unnecessary.

Having said that, for this app, there is nothing wrong with putting the function inside the component if that is your personal preference, but I do not recommend it.

The second question is: Should I put this function in the `App` component file or in a separate file and then import it? The answer to this question is purely a personal preference. I prefer a separate file and import it, again, to keep the `App` component file clean.

### Calling the `getQuestion` function

Before calling `getQuestion`, we'll refactor our component a bit. Until now, our component started with the following:

```js
function App() {
  const answer = 3;
  const choices = [1, 2, 3, 4];
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState();
```

As said before, `answer` and `choices` will be merged into one object which will be returned by the `getQuestion` component. This `question` object changes with each call to `getQuestion` and should be displayed, which means it becomes stateful:

```js
function App() {
  const [question, setQuestion] = useState({ choices: [] });
  const { answer, choices } = question;
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState();
```

I did two things in this code to make sure the rest of the component's code won't break because of this change, which are worth noting:

First of all, the `useState` call for `question` gets an initial state with an empty `choices` array passed in. This is to make sure the `choices.map` call in the JSX keeps on working on the first render when `getQuestion` has not been called yet. An alternative fix is to not provide an initial state and check for the existence of the choices array before mapping it. But that means unnecessary clutter in the JSX and I don't like that.

The second thing I did, which is also optional, is on the second line where I destruct `answer` and `choices` from `question`. This is to prevent I have to prepend all usages of these variables throughout the component with `question.`.

Now let's fi-nal-ly call `getQuestion` in our component...

Both when the component is rendered for the first time and after answering a question, the `getQuestion` function should be called so the UI will display a new question. This is a side effect as there is no direct user interaction involved that triggers getting a new question. For that we'll call React's `useEffect` hook inside our component, which in turn calls our `getQuestion` function:

```js
useEffect(() => {
  const newQuestion = getQuestion();
});
```

Next we need to update the state of `question` by calling `setQuestion`:

```js
useEffect(() => {
  const newQuestion = getQuestion();
  setQuestion(newQuestion);
}, []);
```

Note how I also added the **empty dependency array** to prevent the notorious infinite `useEffect` loop.

What happens now is that when the component is rendered for the first time, `useState` is called and the `choices` array is empty. The JSX is rendered and nothing is displayed. However, directly after that, `useEffect` is called, which gets a question, updates the `question` state and the question is displayed. This happens so fast the user won't notice it.

After answering the question, `getQuestion` should be called again, but this is not happening. The reason for that is the empty dependency array we passed to `useEffect`, which means the code is only called after the first render.

The question is when (and how) should `getQuestion` be called again? We'll use the already existing stateful `result` variable for that. When an answer is given, `result` will get a value indicating the answer is correct or not. After clicking Try Again, result is cleared again, which happens in the `reset` function. So what our `useEffect` code should do is check for the `result` variable: a new question should be retrieved when `result` is empty:

```js
useEffect(() => {
  if (!result) setQuestion(getQuestion());
}, [result]);
```

Note how I also added `result` to the dependency array. Our side effect code is dependent on that value as it needs it to determine whether `getQuestion` should be called or not.

### Wrapping up

This is quite a long story for quite a small adjustment to our code. However, it's a significant one: The app now gives you infinite pleasure of trying to add up to numbers between 2 and 10! 😉

By the way, did you notice we only changed the _behavior_ of our component and not the UI (JSX)? This shows how nice and clean behavior and UI can be separated in a React component.

In my next blog post, which is part 3 already, I will cover the `useReducer` hook, which we'll use to make the component's code even cleaner.

P.S. The source code for this app is on my GitHub: https://github.com/bouwe77/react-simple-calculation-game

[part 1]: /learn-react-basics-by-creating-a-simple-calculation-game
