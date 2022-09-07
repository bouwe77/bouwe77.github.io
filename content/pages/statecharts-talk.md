---
title: "Statecharts Talk"
---

# Go / No Go

1. Zijn er goeie C# alternatieven, zodat wat ik vertel ook CONCEPTUEEL interessant is? Want als het alleen XState is dan is het mogelijk niet interessant/relevant genoeg ===> YES ✅

2. Snap ik echt de voordelen van state machines, klikt het bij mij? ===> ❓

3. Heb ik genoeg praktijkervaring? ===> ❓

### Leesvoer

- Dit zou wel eens een hele belangrijke rode draad kunnen worden: https://stately.ai/blog/you-dont-need-a-library-for-state-machines
- Overzichtelijk verhaal over de basisprincipes van state machines en statecharts: https://stately.ai/blog/introduction-to-state-machines-and-statecharts

<hr style="background-color:red; height: 10px">

# Actual presentation itself

### .C# .NET alternatieven voor XState:

Stateless

- GitHub https://github.com/dotnet-state-machine/stateless
- Tutorial https://www.youtube.com/watch?v=ev1gPZChEEM, en eventueel deze, maar hier is de vraag hoe nuttig/omslachtig een state machine is? https://www.youtube.com/watch?v=vBS4L1k0f1c
- Scott Hanselman over Stateless https://www.hanselman.com/blog/stateless-30-a-state-machine-library-for-net-core

Overig

- XState .NET https://xstatenetdocs.z6.web.core.windows.net/
- Azure Durable State Machines https://github.com/jplane/DurableStateMachines

### Random

- Wat is een state machine?

- Leuk (of zelfs grappig) voorbeeld

- Maar ook een wat complexer WG voorbeeld is leuk

### State machines vs statecharts

> Statecharts are a formalism for modeling stateful, reactive systems. Computer scientist
> David Harel presented this formalism as an extension to state machines in his 1987 paper

- XState is implementatie van SCXML (Statechart XML)
- Zijn er ook C# of andere implementaties van?

Verder uitzoeken...

### Imperative vs declarative?

...

### Wanneer een state machine/statechart gebruiken?

- "When there is a big diversity in points in time, when it is harder to reason about" https://youtu.be/1kJcnFBrk2I?t=4803
