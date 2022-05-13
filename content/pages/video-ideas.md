---
title: Video ideas
---
# Bite-sized videos (max 5 minutes)

## Inspiratie en ideeën:
* Egghead.io
* Matt Pocock (hij heeft trouwens ook een Twitter thread over hoe hij dit doet)
* Livestreamen over the making of van die kleine video's
* Op YouTube zetten
* Eventueel meerdere videootjes vanuit YouTube in een WebinarGeek webinar verzamelen
* Achteraf inspreken?
* Bronnen: Ervaring bij WG, mijn eigen POC repo's, dingen die ik nog wil leren
* Heel erg vanuit een probleem redeneren, dus kijk, hier een probleem, en hoe gaan we dit oplossen?

## useEffect + RFC for useEvent Hook

Resources:
* Opinion Kent C. Dodds on May 13 2022: https://youtu.be/ZkujAieh9Iw?t=1827
* RFC from the React team: https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
* Reactathon talk by David K Piano Kourshid: https://youtu.be/Ck-e3hd3pKw?t=4013

## React
* Show don't tell: In plaats van een string in state, en o.b.v. conditioneel renderen, gewoon het component in state?
* useState updater form (kan ik een bug bedenken en hiermee fixen?)
* Optimization without memoization: Composition
* Composing hooks (Number API + Giphy search engine)
* React.Children + React.cloneElement, zodat je technische details zoals coordinaten weg kunt abstraheren
* Compound components met zo'n . in de naam
* React portal
* SVG
* Controlled vs uncontrolled: Ryan Florence legt dat goed uit in React Class Component Patterns - Controlled Custom Components: https://courses.reacttraining.com/courses/250055/lectures/3897312

useRef
* When to useRef (bug: stateful var, terwijl het ook een ref kan zijn)
* Een stukje JS+DOM naar React to porteren met useRef en zo, bijvoorbeeld Starfield
* Music player ergens in mijn cursusmateriaal

useEffect
* In the context van React: What are side effects? https://youtu.be/_oifJWkO_so, purity, idempotency, etc
* useEffect: Het is volgens mij nooit een probleem om alle dependencies toe te voegen die eslint aangeeft. Volgens mij is het misverstand dat dit soms niet moet. Voorbeeld bedenken. Mogelijke inspiratie is mijn vraag op Discord: https://discord.com/channels/715220730605731931/971163411020935198

Context
* Context omzetten naar Zustand, zodat de interface bijna niet verandert (toch?), maar dat je wel selectors kunt gebruiken.

* Derived state (definitie: state initialiseren vanuit props) is een anti-pattern, zie React docs
* Derived state zoals ik het ken: Lokale variabele die waarde uit andere state bepaald, zodat die waarde zelf niet state hoeft te zijn.
* Conditioneel derived state: switch case, if, function voor de return, of function aanroepen in de return JSX. Voorbeelden in WG code opzoeken. Dit wordt een video over mijn persoonlijke mening over wat ik mooi en duidelijk vind.
* Tip om sneller te zien wat een component eigenlijk doet: Ga eerst naar de JSX en dan pas naar de hooks
* Dingen abstracten naar components en hooks. Niet voor de herbruikbaarheid, maar voor de leesbaarheid. Zodat je dingen als black box kunt beschouwen en snel ziet wat het doet, en alleen (of pas) als je meer detail wilt ga je in die black box kijken.

## Testing-Library
* Algemene video over de verschillen tussen getBy, findBy, en queryBy
* Testing fetching data with useEffect, want dit slaat nergens op: https://youtu.be/yTZ-txdrHdY
* Wanneer is act() nou eigenlijk nodig? Ik heb het nooit gebruikt. Ben je een prutser als je dat wel doet? Volgens mij heb ik een test met een act() in mijn kanban projectje van 2021.
* WG situatie: await wait (for nothing), terwijl je gewoon moet achten op iets dat wordt gerenderd.
* Hoe kun je elementen benaderen die niet heel benaderbaar zijn? Bijvoorbeeld SVG elementen (zoals bij bunny hop), is dat die ene algemene role? 
* Integratie tests, zodat je veilig kunt refactoren, bijvoorbeeld van losse hooks naar custom hooks, of van een reducer naar een state machine.
* Hooks kun je beter testen vanuit een component in je test, i.p.v. met renderHook: https://kentcdodds.com/blog/how-to-test-custom-react-hooks

## React + XState
* Wanneer heb je een action/service nodig: Als de state machine niet kan (weten) wat er echt moet gebeuren omdat het UI is, terwijl de state machine niet in de UI zit. Dus dan delegeert de machine de daadwerkelijke implementatie aan de UI (React), zodat XState bepaalt (orchestreert) wanneer de action/service wordt aangeroepen.
* Difference between useReducer en XState: finite vs infinite
* Modelleren state machine kan lastig zijn, maar als je de state machine gewoon aanroept in je component, dan komt de implementatie van de machine misschien makkelijker. Dus een soort TDD-achtige approach, maar dan gewoon in je component, waarbij je de functie gaat aanroepen, zodat je weet wat je moet implementeren.
* Misschien in het algemeen een video over dat het gebruik van een functie helpt om zowel een goeie interface als implementatie te krijgen.
* Spaceship web socket connectie + events afhandeling ombouwen naar XState?

## Misc
* Temba introduction + demo

---

# Longer videos, tutorials

# Temba
* Introduction + demo
* Creating React app with Temba and deploy on Heroku

# Remix

* Habit Tracker

# React

* Ink https://github.com/vadimdemedes/ink
* useEffect complete walkthrough

# Bunny Hop

* React
* XState
* Framer Motion
