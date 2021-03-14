---
date: "2021-03-21"
title: "Currying Part 2 (Working Title)"
summary: ""
categories:
  - "Functional programming"
  - "JavaScript"
  - "Currying"
---

OK, wat gaan we hier doen?

- Uitleggen dat we met currying het probleem oplossen dat een functie weliswaar 1 return waarde heeft, maar wel een onbekend aantal parameters kan hebben. Door elke functie maar 1 parameter te geven kun je elke functie aan elke andere functie knopen.
  Dit kan zowel composition, chaining, ... zijn.

- Roman numerals voorbeeld maken

- Hierbij moet ik sowieso chaining van partially applied functions toepassen. In JS doe je dit door de functies elkaar genest te laten aanroepen, van binnen naar buiten. Dit kun je echter ook doen met een helper function, zo legt Eric Elliot uit.

- Laten zien dat je deze in een array.map kan gebruiken, wat met ietsje minder code kan dan als het een gewone function was geweest.

- Composen van partially applied functions, dus van meerdere 1 function maken. Nog even kijken wat hierbij een goed voorbeeld is.
