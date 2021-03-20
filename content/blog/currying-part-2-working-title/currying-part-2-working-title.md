---
date: "2021-03-21"
title: "Currying Part 2 (Working Title)"
summary: ""
categories:
  - "Functional programming"
  - "JavaScript"
  - "Currying"
---

- Al met al is deze blog post een uitwerking van https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983 en dan vooral vanaf "Why do we curry?"

- Composen van partially applied functions, dus van meerdere 1 function maken. Nog even kijken wat hierbij een goed voorbeeld is.

#### Introduction

I find currying an intruiging pattern, just like many other of the concepts of functional programming. But for me, and I have also heard this from others, there are some challenges with currying: What is it and what is it good for? This was the title of my previous blog post about currying, but after finishing it, I realized I mainly covered the _what_ part, and not entirely the _what is it good for_ part.

So if you don't know what currying is, please read [Part 1] where I try to explain it and which also contains some links to other resources that explain currying very well.

#### Why currying?

In my previous blog post I wrote how currying, combined with partial application, allows composing new functions with lesser key strokes. While this is true, it is not the most important reason to use currying:

```js

```

The most important reason to use currying is it allows you to use another way of composing, which is combining multiple functions into one function, also known as piping.


#### Roman numerals

Inspired by Scott Wlaschin's great talk [The Power of Composition], I chose to make a function that transforms a decimal number into a Roman numeral.

Before I knew anything about functional programming I would probably write it like this:

```js
//...
```

Note how this code is not functional. It contains a lot of _imperative_ code, in other words, code that exactly tells _how_ to transform the number into a Roman numeral. You have to look closely to determine what's actually happening. And the same goes for when you have to change this code.

Of course we need to write code that takes care of the _how_, but let's take a functional approach. Let's write code that achieves the exact same thing, but now with a _declarative_ approach:

By just looking at the names of the functions you can see what's going on much quicker. This code is easier to reason about and as a consequence easier to change.

> Easy to reason about? Yes, that is pretty subjective, but I think we can agree on the fact the functional code contains less nitty gritty details and still does the same thing?

Hier nest ik dus de function calls van binnen naar buiten.

#### Composing

Hier de compose toepassen:

```js
const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x);
```

So what I can do now is this:

```js
const decimaltoRomanNumeral = compose(
  replace_XXXXX_with_L,
  replace_VV_with_X,
  replace_IIIII_with_V,
  replicateIs
);
```

Note how I still pass the replace function in the reverse, just like when I nested the function calls, this will call the last function, `replicateIs` first, followed by `replace_IIIII_with_V`, etc.

#### Piping

Although the previous compose example works, it would make more sense to specify the functions in the order we want them to be called.

In functional programming languages like Haskell or F#, you would use _piping_, which is way to chain multiple function calls:

```
//voorbeeld Haskell of F#
```

Uitleggen wat in de code hierboven gebeurt.

However, this is not (yet) possible in JavaScript.

> Hier een link naar da proposal.

But what we can do is write a `pipe` function, that looks quite similar to the `compose` we made earlier:

```js
const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);
```

Notice the slight difference with `compose`: We use `reduce` instead of `reduceRight`.

> I have already written about the useReducer hook in React and now am using reducers as well. However, "iets met dat ik nog niet goed genoeg weet wat reducers nou eigenlijk precies zijn en hoe ze werken". Fun fun function had een goeie uitleg en Eric Elliott ongetwijfeld ook... Dus dat wordt dan mijn volgende blog post...

With this `pipe` function we can change the ... ... like this:

```js
const decimaltoRomanNumeral = pipe(
  replicateIs,
  replace_IIIII_with_V,
  replace_VV_with_X,
  replace_XXXXX_with_L
);
```

So that is the difference between composing and piping: The _order_ in which you specify which functions are composed together.

#### Iets over map

Volgens mij is een mooi voorbeeld dat ik een array van decimals heb en die dan kan ombutsen naar roman numerals...

...

#### Conclusion

Iets zeggen over dat we code declaratief hebben gemaakt, het gaat er om dat je allemaal functions maakt en die aanroept, zodat het een leesbaar geheel wordt van stapjes die elkaar aanroepen.

Huge shoutout enz.enz. [Curry and Function Composition] by Eric Elliott.

[the power of composition]: https://youtu.be/rCKPgu4DvcE
[curry and function composition]: https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
