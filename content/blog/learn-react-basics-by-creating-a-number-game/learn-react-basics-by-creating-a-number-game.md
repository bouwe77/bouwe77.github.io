---
date: "2020-12-22"
title: "Learn React basics by creating a number game"
summary: ""
categories:
  - "React"
---

This is part 1 of a series of blog posts where I'll explore some basic React principles. I do that by building a simple calculation game. Our 6 year old daughter likes this game a lot. 😄

(samenvatting wat we gaan behandelen)

### Demo

Check out this GIF to see what we are going to build:

<img alt="Demo" src="/demo.gif" width="640"/>

So the objective of the game is to select (click) the numbers in the box on the left that add up to the given number. When you made a mistake, click the numbers in the box on the right to move them back left. When ready (de)selecting numbers, click Done and the app will tell whether your attempt was correct or incorrect. To start all over again, click the Reset button.

Wanna give it a try yourself? https://react-number-game-v1.netlify.app

### Let's start building

I'll build this app using [Create React App]. In this blog post I won't go into CSS styling, but if you're interested, the CSS stylesheet I'll use can be found [on GitHub].

To keep it simple, the app will consist of one component, the `App` component. Let's start with some basic plumbing of the different sections of the game and apply the CSS I've prepared:

```js
import React from "react";

export default function App() {
  const answer = 3;
  const choices = [1, 2, 3, 4];
  const chosen = [];

  return (
    <div className="app">
      <div className="full-width">
        Choose numbers that add up to:
        <br />
        <span className="answer">{answer}</span>
      </div>

      <div className="side-by-side">
        <div className="numbers">
          {/* this is the box on the left which will contain numbers to choose from */}
        </div>
        <div className="numbers">
          {/* this is the box on the right which will contain the chosen numbers */}
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

### Choosing numbers by clicking on them

Note how I created and display a variable named `answer` which contains the number we'll have to add up to. Also variables for the numbers to choose from (`choices`) and the chosen numbers (`chosen`) have been added. However, these are not displayed yet, so let's do that now by mapping over them and rendering a button for each number:

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
    {chosen.map((number) => (
      <button key={number} className="number">
        {number}
      </button>
    ))}
  </div>
</div>
```

> Dynamic elements that are rendered with `map` should always contain a `key` prop with a unique identifier so React can keep track of which element is which.
> See ...

Next, we want to click on a number so it moves from the left to the right box, or vice versa. Technically this means a number moves from the `choices` array to the `chosen` array, or vice versa. So to reflect changes to these arrays in the UI, we need to change these arrays from hard-coded contants to stateful values with the `useState` hook:

```js
const answer = 3;
const [choices, setChoices] = useState([1, 2, 3, 4]);
const [chosen, setChosen] = useState([]);
```

Note that we did not make `answer` stateful, because this value does not (yet) change.

Now that we got the `setChoices` and `setChosen` functions from `useState` to update the state, let's implement functions to move numbers between these two arrays:

```js
function choose(number) {
  setChoices(choices.filter((c) => c !== number));
  setChosen([...chosen, number]);
}

function unchoose(number) {
  setChoices([...choices, number]);
  setChosen(chosen.filter((c) => c !== number));
}
```

To the number buttons in the left box we add an `onClick` handler and call the `choose` function:

```js
<button key={number} className="number" onClick={() => choose(number)}>
  {number}
</button>
```

Same for the right box, but then we call the `unchoose` function:

```js
<button key={number} className="number" onClick={() => unchoose(number)}>
  {number}
</button>
```

### Submitting an answer

Now that we are able to choose numbers, we want to submit our answer. This means the Done button needs functionality to determine our answer is correct.

What I am going to do is add up all the numbers in the `chosen` array and compare that to the expected answer. The UI should show whether the answer is correct or incorrect, so that's a new state variable. The initial state is "playing", indicating the game is still being played:

```js
const [status, setStatus] = useState("playing");
```

As soon as the Done button is clicked the `status` should change to either 'correct' or 'incorrect'. To determine the total of the chosen number we reduce the array to one single value:

```js
function done() {
  const result = chosen.reduce((a, b) => a + b, 0);
  result === answer ? setStatus("correct") : setStatus("incorrect");
}
```

To call the `done` function we add an `onClick` handler to the Done button:

```js
<button className="action" onClick={done}>
  Done
</button>
```

To give some feedback to the user, for now, we just display the value of `status`:

```js
return (
  <div className="app">
    {status}

    /* etc. */
```

### Resetting the answer

...zeggen dat we de reset button nog moeten maken en dat we nadat we een corrct of incorrect antwoord hebben gegeven nog een keer willen proberen...

...beide is eigenlijk hetzelfde (voor nu)...

...de Modal komt er nu bij...

...Ook komt nu pas de aparte `initialState` variabele

### Finished

...vertellen dat de app het doet...

However, the app has some issues. First of all, it's pretty boring the game let's you solve the same puzzle over and over again, so the numbers need to become random. Furthermore, as you might have noticed in the demo, when choosing a number, the buttons in the left box are moving places, which is kind of unexpected and not very user friendly. These two things I will solve in my next blog post!

OPLOSSING VOOR DEZE 2 ISSUES:

- De getallen zijn nog statisch (randomizer functie maken en de initiële array onthouden met useRef)
- Het verspringen van de knoppen als je iets kiest (choices array moet zelfde grootte houden en worden opgevangen met null waardes?)

> LET OP: Op het laatst alle puntkomma's uit de code verwijderen!

[create react app]: https://create-react-app.dev
[on github]: https://raw.githubusercontent.com/bouwe77/react-number-game-v1/main/src/styles.css
