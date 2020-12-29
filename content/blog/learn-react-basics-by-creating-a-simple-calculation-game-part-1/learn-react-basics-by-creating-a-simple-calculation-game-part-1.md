---
date: "2020-12-22"
title: "Learn React basics by creating a simple calculation game (Part 1)"
summary: ""
categories:
  - "React"
  - "simple calculation game"
---

This is part 1 of a series of blog posts where I'll explore some basic React principles. I do that by building a simple calculation game. Our 6 year old daughter likes this game a lot. 😄

Topics this blog post will cover are JSX, conditional rendering, mapping arrays to JSX, event handling and updating state of arrays and other values with the `useState` hook.

### Demo

<img alt="screenshot of the simple calculation game" src="/demo.png" width="400" style="border:1px solid #ccc"/>

The objective of the game is to select (click) the numbers in the box on the left that add up to the given number. When you made a mistake, click the numbers in the box on the right to move them back to the left. When ready (de)selecting numbers, click Done and the app will tell whether your attempt was correct or incorrect. To start all over again while playing, click the Reset button.

Wanna give it a try yourself? https://react-simple-calculation-game.netlify.app.

### Let's start building

I'll build this app using [Create React App]. In this blog post I won't go into CSS styling, but if you're interested, the CSS stylesheet I'll use can be found [on my GitHub].

To keep it simple the app will consist of one component, the `App` component. Let's start with some basic plumbing of the different sections of the game and apply the CSS I've prepared:

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
    {selected.map((number, index) => (
      <button key={index} className="number">
        {number}
      </button>
    ))}
  </div>
</div>
```

I added a `key` prop to each button to React can uniquely identifiable each element and prevent the warning "Each child in a list should have a unique "key" prop.". In the `choices` array the numbers are (and will always be) unique, because that is how the app works. However, the numbers in the `selected` array are not guaranteed to be unique as you are allowed to select the same number multiple times. That is why I use an `index` here, which is fine for my code, but not always is a good idea.

> Check out this _egghead.io_ lesson to learn more about the `key` prop and using indexes: https://egghead.io/lessons/react-use-the-key-prop-when-rendering-a-list-with-react

Next, when clicking a number in the left box we want to have it appear in the right box and when clicking a number in the right box we want to have it disappear again. Technically this means a number from the `choices` array is added or removed from the `selected` array. To reflect changes to the `selected` array in the UI, we need to change that array from a hard-coded constant to a stateful value with the `useState` hook:

```js
const answer = 3;
const choices = [1, 2, 3, 4];
const [selected, setSelected] = useState([]);
```

Note that we did not make `answer` and `choices` stateful, because these values do not change (yet).

Now that we got the `setSelected` function from `useState` to update the state, let's implement functions to add and remove numbers from the `selected` array:

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

What happens in these functions is that a number is added to the `selected` array using the spread operator and it is removed from `selected` by finding the first occurrence of the number and remove it.

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
  setSelected([]);
}
```

### Submitting the answer

Now that we are able to select numbers, we want to submit our answer. This means the Done button needs functionality to determine our answer is correct.

What I am going to do is add up all the numbers in the `selected` array and compare that to the expected answer. The UI should show whether the answer is correct or incorrect, so that's a new state variable. The initial state is empty, because there is no result yet:

```js
const [result, setResult] = useState();
```

As soon as the Done button is clicked the `result` should change to either 'correct' or 'incorrect'. To determine the total of the `selected` numbers we reduce the array to one single value by adding up the numbers:

```js
function done() {
  const selectedTotal = selected.reduce((a, b) => a + b, 0);
  selectedTotal === answer ? setResult("correct!") : setResult("incorrect...");
}
```

To call the `done` function we add an `onClick` handler to the Done button:

```js
<button className="action" onClick={done}>
  Done
</button>
```

When resetting, `result` needs to be cleared too so we add that to the `reset` function:

```js
function reset() {
  setSelected([]);
  setResult();
}
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

Although the app supports the infinite flow of answering a question, resetting it and trying again after either a correct or incorrect answer, it shows the same question every time, which is pretty boring of course. In my next blog post I will fix that using the `useEffect` hook.

~~So stay tuned for Part 2! 😃~~ Part 2 is finished, so [continue reading].

P.S. The source code for this app is on my GitHub: https://github.com/bouwe77/react-simple-calculation-game

[create react app]: https://create-react-app.dev
[on my github]: https://github.com/bouwe77/react-simple-calculation-game/blob/main/src/simple-calculation-game/App.module.css
[modal]: https://github.com/bouwe77/react-simple-calculation-game/blob/main/src/simple-calculation-game/Modal.js
[continue reading]: /learn-react-basics-by-creating-a-simple-calculation-game-part-2
