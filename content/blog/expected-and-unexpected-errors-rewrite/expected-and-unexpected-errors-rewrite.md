---
date: "2022-04-08"
title: "Expected and Unexpected Errors (rewrite)"
summary: ""
categories:
  - "Architecture"
  - "Testing"
  - "Error handling"
---

> This is a rewrite of a blog post you might have read earlier.

### Introduction

...

### Feedback van mijn presentatie

Mijn interpretatie van en de belangrijkste zaken uit de feedback van mijn lightning talk.

#### Nick

In de UI kun je een retry aanbieden als je weet dat het een expected (tijdelijke) error is.

#### Matthijs

Vanuit de client bekeken:

- 400 response: De client doet iets verkeerd
- 500 response: Op de server kan een bug zijn (unexpected) of er kan iets uitliggen (expected)

Intern op de server worden expected en unexpected errors apart afgehandeld (mijn punt van dit verhaal), maar de response die de server 500 teruggeeft is sowieso 500 dan.

#### Rich

Bij APIs wil je heel duidelijk zijn dat er errors zijn en waarom. Omdat vooral developers met een API werken en die willen meer detail hebben zodat ze weten hoe ze het moeten oplossen en of het onze of hun schuld is.

Bij UIs ga je daar anders mee om: Minder detail en meer "begeleiding".

#### Ilya

Monads: Return result, either left (error) or right (success)

Dus als het expected is dan return je een "left". Als het unexpected is, dan laat je het gaan. Dit zijn exceptions die je op het hoogste niveau pas opvangt.

Het gaat erom wat je verwacht, maar ook waar je om geeft, wat de moeite waard is om af te vangen. Er zijn zelfs errors die niet eens in je catch-all komen omdat ze dusdanig ernstig zijn.

Dus in mijn codevoorbeeld laat ik de unexpected errors niet door.

### Andere interessante dingen

https://twitter.com/GeePawHill/status/1512466622677721091?s=20&t=fV0w1IPvMG-Nh7FGDgJmSg
