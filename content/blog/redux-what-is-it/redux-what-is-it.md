---
date: "2021-04-04"
title: "Redux: What is it?"
summary: ""
categories:
  - "React"
  - "Redux"
---

# Inleiding

Redux wordt veel gevraagd in de markt dus ik moet weten wat het is en hoe het werkt.

Het doel van deze blog post is vooral goed te weten begrijpen wat het is, welke probleem het oplost en wat je wel of niet in Redux moet doen.

Maar ik begin met een stukje geschiedenis en de vraag of het wel nodig is. Maar ongeacht of het nodig ga ik er toch in duiken omdat dat handig, zowel als je wel of geen keuze hebt het te gebruiken.

Uitgangspunt is wel dat je weet wat een reducer is, dus verwijzen naar mijn blog posts daarover.

# Do I need Redux?

Er is echter ook scepsis van de React wereld en mij: Vroeger moest je wel Redux gebruiken, tenminste, dat zij men, bijvoorbeeld MPJ van Fun Fun Function en dus ben ik er zelf ook ooit mee begonnen.

Maar het bleek toch lastig als beginnende React dev, ook in combinatie met class components. Gelukkig kwamen hooks net op tijd uit en ben ik die eerst goed gaan leren.

Of je het nodig hebt kun je beter zelf beoordelen, maar het begint bij goed snappen waarvoor het is, en dat is waar deze blog post over gaat.

# Context

Eerst vertellen wat context is.

Het mooiste is om hier een heel klein voorbeeld-appje te introduceren, waarin zowel lokale als globale state zit.

Conceptueel waarschijnlijk: lokale useState state, context state vanwege compound components om prop drilling te voorkomen en dan globale, van de server afkomstige, Redux state?

Ergens in deze blog post moet ik ook het verhaal van react-query meenemen: UI state vs Server (?) state.

# Enter Redux

Hier ga ik de voorbeeld-app ombutsen naar Redux, waarbij ik alle (of gedeetelijke) context state overhevel naar Redux, met hopelijk een goed verhaal waarom.

Het voorbeeld moet wel een hele goeie reden/voorbeeld zijn voor typisch iets wat je in Redux stopt, zodat daar in de rest van de blog post geen discussie meer over is. Bovendien leer je dan überhaupt goed welk probleem je met Redux (of überhaupt state uit je components halen) oplost.

Want misschien kan ik 'm daarmee platslaan: Je haalt je state uit je components vandaan.

Waarom en welke state hevel je over? Dat wordt hier uitgelegd: https://blog.bitsrc.io/redux-react-alternatives-c1733793a339

# Next steps

In een volgende blog post thunk, saga enz. Hier alvast even kort noemen wat dit is.

En zoiets als redux-form, wat is dat en wat heb je daar nou aan?

# Alternatives for Redux

Nu we weten welk soort state in Redux thuishoort, en we dus besluiten dat bepaalde state sowieso niet door React useState/useContext laten afhandelen, wat zijn de alternatieven voor Redux?

React-query natuurlijk, maar wat nog meer? MobX? GraphQL? Recoil?

Ik weet nog niet hoe kwalitatief goed dit artikel is, maar wellicht een startpunt: https://blog.bitsrc.io/redux-react-alternatives-c1733793a339

# Conclusion

Ik denk dat weten wat Redux is, welk probleem het oplost en wat je wanneer, wel of niet in Redux stopt veel belangrijker is dan er heel veel ervaring mee te hebben.

... ... ...
