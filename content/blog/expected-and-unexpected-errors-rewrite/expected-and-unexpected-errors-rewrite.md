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

### Mijn presentatie

Errors, faults, exceptions, geef het beestje maar een naam, ik bedoel dat er iets keihard uitknalt: Runtime errors...

Please try again? Heeft dat wel zin?

APIs geven een response code. Websites knallen er keihard uit, of geven een vriendelijke error.

We willen liever geen errors.

Het geeft een verkeerde indruk en het maakt dingen onbruikbaar en/of het is niet duidelijk wat/of je er aan kunt doen en aan wie het ligt.

Geen errors betekent niet dat er niks aan de hand is: Worden errors niet geswallowed?

Wordt er wel goed getest? Doet alles het wel, ondanks dat er geen errors optreden?

Runtime errors dus, en die treden meestal op tussen systemen en/of vanwege de communictie tussen systemen, bijvoorbeeld backends, frontends, databases, netwerk, enz.

Je wilt errors weten, dus opvangen en loggen, nuttige feedback geven, en het is een deel van de functionaliteit van je app, dus je kunt het testen.

Er zijn twee soorten errors: Dingen die nu (even) niet werken, dus tijdelijk.

Ze zijn tijdelijk, herstelbaar, liggen vaak buiten de betreffende applicatie, kunnen gefixt worden zonder code veranderingen, hoeven misschien niet gelogd te worden, want als dingen eruit liggen dan merk je dat door monitoring wel.

En dingen die helemaal niet werken, hoe vaak je het ook probeert met het request of de handeling die je doet. Dit zijn bugs.

Er is getest, maar toch werkt het niet, het probleem ligt binnen de applicatie, er is ee codeaanpassing of deployment nodig, logging is superbelangrijk om hier achter te komen. Voorbeelden: ontbrekende/slechte input validation, slecht getest, slechte docs, verkeerde versie gedeployed, enz.

Waarom is deze onderverdeling belangrijk?

Hierdoor bepaal je hoe en waar je ze afhandelt:

Expected errors handel je af dichtbij waar ze op kunnen treden, en omdat je het specifiek bouwt kan (moet) het ook getest worden. Een voorbeeld om dit af te handlen is het left/right monad (dinges) pattern.

Unexpected errors kun je niet voorspellen, dus handel je zo laat mogelijk af, in een catch-all. Ze moeten gelogged worden, zodat je het tenminste weet en er wat mee kunt.

Het kan zijn dat je je code kunt verbeteren en daardoor van unexpected errors expected errors kan maken.

Als errors optreden in UIs kun je error boundaries gebruiken om zoveel mogelijk van de app te laten werken. Als je de oorzaak van een (expected) error weet kun je een retry mechanisme aanbieden.

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
