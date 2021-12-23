---
title: SVG Canvas, Viewport, ViewBox
---

## Canvas

Canvas is oneindig groot.

## Viewport

Viewport is fysieke deel wat je ziet, de grootte van je scherm of window bijvoorbeeld.

Vergelijk met een raam waar je doorheen kijkt. Het raam kan groot of klein zijn, maar hetgeen je door het raam ziet heeft zijn
eigen positie en afmetingen. Dus als je het raam (viewport) groter maakt, dan zie je _meer_, maar niet groter of kleiner.

De grootte van de viewport definieer je door het SVG element een width en height te geven.

Dus of je nou in- of uitzoomt, dan verandert de viewport niet, die heeft vaste afmetingen.

Als je de positie en/of afmetingen van een vorm wijzigt dan verandert de vorm op het CANVAS en kan dus buiten de viewport vallen of groter dan de viewport worden.

## Viewbox

Viewbox bepaalt wat er in de viewport te zien is. De Viewbox property van een SVG heeft 4 nummers,
de eerste twee bepalen waar de viewbox begint en de laatste twee bepalen de grootte ten opzichte van
de grootte van de viewport, zodat je kunt in- en uitzoomen.

### Panning (opschuiven)

Panning bepaal je met de eerste twee cijfers van de viewbox property:

1. X coordinaat van wat je ziet
2. Y coordinaat van wat je ziet

Dus als ze beide 0 zijn dan beginnen zowel de viewport als viewbox linksbovenin.
Als je deze coordinaten groter of kleiner maakt dan schuift de viewbox (het deel wat je ziet) op: Panning

### Zooming

Zooming bepaal je met de laatste 2 cijfers van de viewbox property:

3. Breedte van de viewbox
4. Hoogte van de viewbox

Als de afmatingen van de viewport en viewbox gelijk zijn dan zie je alles op 100%. Je probeert dan een viewbox in te passen
in de viewport en omdat ze gelijk zijn past dan gewoon.

Echter, als je de viewbox groter maakt, dan probeer je nog steeds die viewbox in je viewport te proppen, met als gevolg dat de
vormen in je SVG _kleiner_ worden: Uitzoomen dus.

En als je de viewbox kleiner maakt, dan past het makkelijk en dus wordt de viewbox uitgerekt en worden de vormen _groter_: Inzoomen dus.
