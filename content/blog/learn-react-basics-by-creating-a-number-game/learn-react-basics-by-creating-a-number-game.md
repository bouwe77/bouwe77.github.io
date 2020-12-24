---
date: "2020-12-22"
title: "Learn React basics by creating a number game"
summary: ""
categories:
  - "React"
  - "simple number game"
---

This is part 1 of a series of blog posts where I'll explore some basic React principles. I do that by building a simple calculation game. Our 6 year old daughter likes this game a lot. 😄

Topics this blog post will cover are JSX, conditional rendering, mapping arrays to JSX, event handling and updating state of arrays and other values with the `useState` hook.

### Demo

Check out this GIF to see what we are going to build:

<img alt="Demo" src="/demo.gif" width="640"/>

The objective of the game is to select (click) the numbers in the box on the left that add up to the given number. When you made a mistake, click the numbers in the box on the right to move them back to the left. When ready (de)selecting numbers, click Done and the app will tell whether your attempt was correct or incorrect. To start all over again while playing, click the Reset button.

Wanna give it a try yourself? https://react-number-game-v1.netlify.app

### Let's start building

I'll build this app using [Create React App]. In this blog post I won't go into CSS styling, but if you're interested, the CSS stylesheet I'll use can be found [on my GitHub].

To keep it simple, the app will consist of one component, the `App` component. Let's start with some basic plumbing of the different sections of the game and apply the CSS I've prepared:

```js
import React from "react";

export default function App() {
  const answer = 3;
  const choices = [1, 2, 3, 4];
  const selected = [];

  return (
    <div className="container">
      <div className="full-width">
        Select numbers that add up to:
        <br />
        <span className="answer">{answer}</span>
      </div>

      <div className="side-by-side">
        <div className="numbers">
          {/* this is the box on the left which will contain numbers to choose from */}
        </div>
        <div className="numbers">
          {/* this is the box on the right which will contain the selected numbers */}
        </div>
      </div>

      <div className="full-width">
        <button className="action">Reset</button>
        <button className="action">Done</button>
      </div>
    </div>
  );
}
```

### Selecting numbers by clicking on them

Note how I created and display a variable named `answer` which contains the number we'll have to add up to. Also variables for the numbers to choose from (`choices`) and the selected numbers (`selected`) have been added. However, these are not displayed yet, so let's do that now by mapping over them and rendering a button for each number:

```js
<div className="side-by-side">
  <div className="numbers">
    {choices.map((number) => (
      <button key={number} className="number">
        {number}
      </button>
    ))}
  </div>
  <div className="numbers">
    {selected.map((number) => (
      <button key={number} className="number">
        {number}
      </button>
    ))}
  </div>
</div>
```

Next, we want to click on a number to select it so it moves from the left to the right box, or vice versa. Technically this means a number moves from the `choices` array to the `selected` array, or vice versa. So to reflect changes to these arrays in the UI, we need to change these arrays from hard-coded constants to stateful values with the `useState` hook:

```js
const answer = 3;
const [choices, setChoices] = useState([1, 2, 3, 4]);
const [selected, setSelected] = useState([]);
```

Note that we did not make `answer` stateful, because this value does not (yet) change.

Now that we got the `setChoices` and `setSelected` functions from `useState` to update the state, let's implement functions to move numbers between these two arrays:

```js
function select(number) {
  setChoices(choices.filter((c) => c !== number));
  setSelected([...selected, number]);
}

function deselect(number) {
  setChoices([...choices, number]);
  setSelected(selected.filter((c) => c !== number));
}
```

What happens in these functions is that a number is removed from an array by filtering all numbers except the one that was clicked. A number is added to an array using the spread operator.

To the number buttons in the left box we add an `onClick` handler and call the `select` function:

```js
<button key={number} className="number" onClick={() => select(number)}>
  {number}
</button>
```

Same for the right box, but then we call the `deselect` function:

```js
<button key={number} className="number" onClick={() => deselect(number)}>
  {number}
</button>
```

### Resetting the answer

Next to deselecting individual numbers, there is also a Reset button which should deselect all numbers. Let's implement that feature now.

First, let's create a `reset` function:

```js
function reset() {
  setChoices(initialChoices);
  setSelected([]);
  setResult();
}
```

What we do here is set `choices` to the value of `initialChoices`, which does not yet exist. Let's create that variable now and also use it to set the initial state for the `useState` call for `choices`:

```js
const initialChoices = [1, 2, 3, 4];
const [choices, setChoices] = useState(initialChoices);
```

So what happens here is that when the component is rendered for the first time it gets the value of `initialChoices`. When clicking the number buttons the state of `choices` changes. In the `reset` function we can restore the `initialChoices` again because we kept it in a separate variable.

### Submitting an answer

Now that we are able to select numbers, we want to submit our answer. This means the Done button needs functionality to determine our answer is correct.

What I am going to do is add up all the numbers in the `selected` array and compare that to the expected answer. The UI should show whether the answer is correct or incorrect, so that's a new state variable. The initial state is empty, because there is no result yet:

```js
const [result, setResult] = useState();
```

As soon as the Done button is clicked the `result` should change to either 'correct' or 'incorrect'. To determine the total of the `selected` numbers we reduce the array to one single value by adding up the numbers:

```js
function done() {
  const selectedTotal = selected.reduce((a, b) => a + b, 0);
  selectedTotal === answer ? setResult("correct") : setResult("incorrect");
}
```

To call the `done` function we add an `onClick` handler to the Done button:

```js
<button className="action" onClick={done}>
  Done
</button>
```

To give some feedback to the user, for now, we just display the value of `result`, but only when the game is finished, in other words: when `result` has a value:

```js
return (
  <div className="container">
    {result && (
      <h1>{result}</h1>
    )}

  /* etc. */
```

### Trying again after submitting an answer

After the app indicated the answer is correct or not, of course we would like to try again. For now, this means we want to reset the game.

Let's start with adding a Try Again button underneath the `result` we were already displaying. To make it look and work nicer we will put the result and the button in a [Modal]:

```js
return (
  <div className="container">
      {result && (
        <Modal>
          <h1>{result}</h1>
          <button className="action" onClick={reset}>
            Try again
          </button>
        </Modal>
      )}

  /* etc. */
```

### Finished?

Well, not entirely.

Although the app supports the infinite flow of answering a question, resetting it and trying again after either a correct or incorrect answer, it shows the same question every time, which is pretty boring of course. In my next blog post I will fix that.

And as you've probably noticed in the demo there are a few annoying UI bugs when clicking the numbers. For example, the order of the numbers does not stay the same, so you really need to pay attention where the buttons have ended up before clicking the next one. This is also something I will fix in that next blog post.

So stay tuned for Part 2! 😃

P.S. The source code for this app is on my GitHub: https://github.com/bouwe77/react-number-game-v1

[create react app]: https://create-react-app.dev
[on my github]: https://raw.githubusercontent.com/bouwe77/react-number-game-v1/main/src/styles.css
[modal]: https://raw.githubusercontent.com/bouwe77/react-number-game-v1/main/src/Modal.js
