---
date: "2021-03-25"
title: "What is a reducer?"
summary: ""
categories:
  - "JavaScript"
  - "useReducer"
  - "Functional programming"
---

### Introduction

Before I started with React I never heard of reducers. And even though I've become quite comfortable with the `useReducer` hook, partly because I wrote [a blog post about it], to be honest, I still hardly know what a reducer is and why the `useReducer` hook is called `useReducer`.

This blog post will answer these questions and it also fits nicely in me exploring [functional programming] concepts.

### Map, filter, reduce

When talking about _reducers_, you can't skip talking about _map_ and _filter_ too. These three concepts are the major ways of dealing with arrays in JavaScript. So if you have no clue what a reducer is, I have given you some context already, because we are talking about dealing with arrays in JavaScript today.

Check out the following `pets` object array:

```js
const pets = [
  { name: "Doug", kind: "dog", photo: "🐶" },
  { name: "Katy", kind: "cat", photo: "🐱" },
  { name: "Carl", kind: "cat", photo: "🐈" },
  { name: "Patti", kind: "parrot", photo: "🦜" },
];
```

Let's talk about `map` first. This is a method on a JavaScript array which allows you to transform an array into another array, where the number of items in the array stay the same.

Suppose we want to transform the `pets` array into an array that only holds the `photo` property of all the pets. This means we are going from an object array to a string array:

```js
const photos = pets.map((pet) => pet.photo);

// [ '🐶', '🐱', '🐈', '🦜' ]
```

This is _declarative_ code. We tell that we want to map the `pets` into a `photos` array and specify _which_ property we want by passing an arrow function to `map`. How the `map` method does this is not our concern.

The arrow function we pass to the `map` method is executed on each item in the array and that function returns how such an item should look like, which in this case is to only keep the `photo`.

But what if you don't want all pets, but only the _cats_. This is _filtering_, and can be achieved with the `filter` method:

```js
const cats = pets.filter((pet) => pet.kind === "cat");
```

The `filter` method also expects a function, but this time a function that returns a boolean. If that function returns `true` for an array item, that one is added to the new, filtered array. If it returns false, you won't see it in the new array.

Finally, you can also combine array methods, suppose you want the photos of all cats:

```js
const catPhotos = pets
  .filter((pet) => pet.kind === "cat")
  .map((cat) => cat.photo);

// [ '🐱', '🐈' ]
```

There are more array methods in JavaScript, but with these two you'll get very far. However, what if you need a very specific operation on an array, one that can't be achieved using the `map` and/or `filter` method? That's where the `reduce` method comes in.

### Reduce

What the `reduce` method does is transform an array into a single value. That value can be anything: another array, a number, an object, etc. This method is so flexible you can even implement the `map` or `filter` methods with it.

Suppose we want to know how many cats we have. First some imperative code:

```js
let countCats = 0;
for (pet of pets) {
  if (pet.kind === "cat") countCats++;
}
```

And now declaratively, with the `reduce` method:

```js
const reducer = function (total, pet) {
  if (pet.kind === "cat") return total + 1;
  return total;
};
const initialValue = 0;

let countCats = pets.reduce(reducer, initialValue);

console.log(countCats); // 2
```

You might notice this code is longer than the imperative code. That is mainly because I want to keep it simple for now. That is also the reason why I am counting cats with a reducer, while that can also be done with the `map` method.

However, I can imagine this reduce code still does not make much sense, so let me explain.

We call `pets.reduce()` and it returns the number of cats. The `reduce` method wants to know 2 things: First what it should do _for each item_ in the array, i.e. the `reducer` function. The second argument is the initial value of the value that `pets.reduce` will return, which is 0 in our case, because there are 0 cats, unless the `reducer` function finds one.

> The arguments to a reducer are officially called the Accumulator and the Current Value, but I like to give them more descriptive names, in this case `total` and `pet` respectively.
>
> By the way, a reducer has some more (optional) parameters, which you might need depending on your use case. Check out the [Array.prototype.reduce() documentation on MDN] for more info.

Our `reducer` function expects 2 parameters, `total` and `pet`, which are supplied by `pets.reduce`. On the first iteration `total` is 0 (the initial value) and `pet` is our sweet dog Doug. `reducer` returns the total of 0, because Doug is not a cat.

On the second iteration, `total` is still 0, but `pet` is Katy the cat, so `reducer` will return 1. On the third iteration we encounter another cat, so `total` becomes 2 and on the final iteration `total` is 2 and remains 2, because Patti is a parrot.

Now that we know how the reducer example counts the cats, let me show you a shorter version of that code using arrow functions:

```js
let countCats = pets.reduce(
  (total, pet) => (pet.kind === "cat" ? total + 1 : total),
  0
);
```

Of course it's up to you how short (and clear) you want your code to be, but I can assure you the more you use reducers the more you'll get used to very concise code like this.

Let's look at a more complex reducer, where we create an object where the plural form of `kind` is the key and each key has an array of pets, which only contain the `name` and `photo` properties:

```js
{
  dogs: [{ name: 'Doug', photo: '🐶' }],
  cats: [
    { name: 'Katy', photo: '🐱' },
    { name: 'Carl', photo: '🐈' },
  ],
  parrots: [{ name: 'Patti', photo: '🦜' }],
}
```

This is how we could achieve that with the `reduce` method:

```js
const petsObject = pets.reduce((obj, pet) => {
  const key = pet.kind + "s";
  obj[key] = obj[key] || [];
  obj[key].push({ name: pet.name, photo: pet.photo });
  return obj;
}, {});
```

The initial value of the object the reducer creates is `{}`, i.e. an empty object. Each pet is passed into the reducer, determines the key, adds that key to the object and pushes the pet to that array.

### useReducer

The `useReducer` hook in React, why is it called like that? Well, like the name implies, it uses a reducer. So where we just saw how the `reduce` method on a JavaScript array uses a reducer function, the `useReducer` hook also uses a reducer function.

Realizing this took away a lot of confusion on my side already, because apparantly reducing things in React has nothing to do with arrays!

But still, what are we reducing? When reducing pets, the reducer function received an accummalator, i.e. the value that eventually becomes the end result, and it received the pet, which, depending on what was going on with that pet, influenced the accumalator.

So we have some state, the accumalator, and something that influences how that state changes. Thinking of how `useReducer` works, that sounds familiar.

Now let's look at a simple reducer, which can be used by the `useReducer` hook:

```js
function countReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}
```

In React we could use this reducer to update the state of the component. Check out [my blog post about useReducer] or the [React docs] on how to do that. However, because it's a reducer, we can also use it on a JavaScript array.

In this case the array contains the _actions_ we want to perform and the initial value for the `reduce` method is the initial _state_:

```js
const result = [
  { type: "increment" },
  { type: "increment" },
  { type: "decrement" },
  { type: "increment" },
].reduce(countReducer, { count: 0 });

console.log(result); // 2
```

The initial value is an object with a `count` property that has the value 0. The array contains 3 increment and 1 decrement actions, so the end result is 2.

This is a very nice trick to unit test the reducer in isolation if you'd want that. However, I don't think I would unit test my reducers like that, because I agree with [Kent C. Dodds] it is better to test a React component as a whole and [consider the reducer as an implementation detail].

### Conclusion

There you have it, I, and hopefully you too, know now what a reducer is and what the `useReducer` hook has got to do with it.

If you want to check out the code in this blog post, please check out this gist: https://gist.github.com/bouwe77/587a0fd9211a2310ca087abb92031e2a

[a blog post about it]: learn-react-basics-by-creating-a-simple-calculation-game-part-3
[my blog post about usereducer]: learn-react-basics-by-creating-a-simple-calculation-game-part-3
[functional programming]: categories/functional-programming
[array.prototype.reduce() documentation on mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
[react docs]: https://reactjs.org/docs/hooks-reference.html#usereducer
[kent c. dodds]: https://kentcdodds.com
[consider the reducer as an implementation detail]: https://kentcdodds.com/blog/testing-implementation-details
