---
date: "2020-11-06"
title: "What is a reducer?"
summary: ""
categories:
  - "JavaScript"
  - "useReducer"
  - "Functional programming"
---

# Waar ga ik het over hebben?

## Inleiding

- De reden van deze post is: wat is een reducer en waarom heet useReducer useReducer, wat reduce je dan?
- Past mooi in mijn ontdekkingstocht naar functioneel programmeren

## Map, filter, reduce

- map, filter en reduce heel kort om aan te geven dat reducer de swiss knife is, als map en filter niet voldoet

Resources:

- Mooi overzicht van map/filter/reduce: https://code.tutsplus.com/tutorials/how-to-use-map-filter-reduce-in-javascript--cms-26209
- Inspirerende manier van schrijven/uitleggen: https://medium.com/async-la/a-short-and-sour-guide-to-reducers-b5b54d3bb018
- MDN over JavaScript array.reduce: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

```js
const food = [
  { name: "Apple", kind: "Fruit", bla: "🍎" },
  { name: "Hamburger", kind: "Junk food", bla: "🍔" },
  { name: "Lolly", kind: "Candy", bla: "🍭" },
  { name: "Banana", kind: "Fruit", bla: "🍌" },
];
```

Met bovenstaande data:

- Met map array ombutsen zodat je alleen de emojis ziet.
- Met filter de appel eruit halen
- Met reduce een object maken waarbij kind de key is. Voorbeeld: https://youtu.be/1DMolJ2FrNY

## Immutability

- Uitleggen wat immutability is
- Waarom het belangrijk is: ...
- Dat reducers best complex kunnen worden vanwege immutability
- Dat Immer dit makkelijker maakt: https://youtu.be/C-hAqD6_OOk (Eric Elliott)

## useReducer

Nu we goed weten wat een reducer is: waarom heet useReducer zo?

Resources:

- https://daveceddia.com/usereducer-hook-examples/

Ook aangeven dat/hoe je een React reducer dus ook heel makkelijk kan unit testen, Eric Elliott noemt dit ook kort in zijn boek in de context van Redux, maar hetzelfde geldt voor useReducer: https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d

Alhoewel de vraag wel is wat dat voor waarde oplevert, aangezien zo'n reducer onderdeel is van de UI, oftewel een implementatiedetail, en je dus net zo goed het hele component kunt testen.

## Conclusion

...
