---
title: XState
---

# Introduction

This page is about XState, but I also have a page about using [XState with React](/xstate-react).

# State, events, and transitions

Elke state is een object.

De machine config wil weten welke `states` er zijn: object van alle state objecten

En wil weten wat de `initialState` is.

Tot slot krijgt de machine nog een `id`:

```js
const active = {};
const inactive = {};

const machineConfig = {
  id: "myMachine",
  states: [active, inactive],
  initial: "active",
};

const myMachine = Machine(machineConfig);
```

Met events ga je van de ene state naar de andere: transition

Op een state object definieer je een event transitie met `on`:

```js
const ACTIVE = {
  on: {
    TOGGLE: "inactive",
  },
};
```

De event is `TOGGLE` en de state moet dan `inactive` worden, wat dus weer een ander state object is.

De `inactive` string is een shorthand voor:

```js
{
  target: "inactive";
}
```

Je gebruikt de object notatie als je meer wilt definiëren voor de transitie.

# Services

A service is an interpreted machine i.e. an **instance** of a machine.

```js
const service = interpret(myMachine).start();
```


Via de service kun je events sturen:

```js
service.send("TOOGLE");
```

Je kunt via de service ook op transitions reageren:

```js
service.onTransition((state) => console.log(state.value));
```

Dus elke keer als de state verandert via een sent event, wordt de nieuwe state gelogged.

Om te controleren of de machine zich in een bepaalde state bevindt gebruik je `state.matches`:

```js
service.onTransition((state) => {
  if (state.matches("end")) console.log("This is the end");
});
```

# Sending events from within the machine

You can send events from within the machine, for example when you reach a specific state:

```js
    on: {
        SPEAK: {
            actions: send('ECHO')
        },
        ECHO: {
            actions: () => console.log('echo echo')
        }
    }
```

So when the 'Speak' event is sent, on the next tick of the machine 'ECHO' will be sent.

# Actions

Als de machine een bpaalde state bereikt kun je een action afvuren.

Door de transitie als een object te definiëren kun je een action meegeven:

```js
{
    target: 'inactive',
    actions: (ctx, e) => console.log('Hello World')
}
```

`actions` kan zowel een enkele function zijn als een array van functions.

Beter en mooier is om de `Machine` constructor een 2e argument (1e arg is machine config) mee te geven: het `options` object:

```js
const myMachine = Machine(
  {
    // ...
    states: {
      // ...
      active: {
        on: {
          TOGGLE: {
            target: "inactive",
            actions: ["logStuff"],
          },
        },
      },
    },
  },
  {
    actions: {
      logStuff: (ctx, e) => console.log("Hello World"),
    },
  }
);
```

In de transitie is de action een string die verwijst naar de action implementatie in het 2e (options) argument van de Machine.

Je kunt actions ook definiëren als een state wordt bereikt of verlaten:

```js
const myMachine = Machine({
    // ...
    states: {
        // ...
        active: {
            on: {
                TOGGLE: {
                    target: 'inactive',
                    actions: ['logStuff']
                }
            },
            entry: (ctx, e) => console.log('state entered'),
            exit: (ctx, e) => console.log('state exited'),
        }
    }
}, {
  actions: {
      logStuff: (ctx, e) => console.log('Hello World)
  }
})
```

# Internal transitions


Dus ik definieer een `on` buiten de states om. Je kunt dan, ongeacht de state, het event triggeren:

```js
const myMachine = Machine(
  {
    // ...
    states: {
      // ...
      quit: {
        entry: [(ctx, e) => log(ctx, e, "entry QUIT")],
        exit: [(ctx, e) => log(ctx, e, "exit QUIT")],
      },
    },
    // This transition applies to the whole machine, regardless of the current state.
    on: {
      QUIT: "quit",
    },
  },
  {
    actions: {
      // ...
    },
  }
);
```

Als je al op de QUIT state bent en kiest opnieuw 'quit' dan wordt de transitie toch weer opnieuw gemaakt. Je ziet dan de entry en exit logging.

Als je dat niet wilt, dan moet je een punt (.) voor de state naam zetten:

```js
// This transition applies to the whole machine, regardless of the current state.
on: {
  // Note the dot: once on this state and an event is triggered to transition to quit again,
  // the transition is not done again:
  QUIT: ".quit";
}
```

# Context / extended state / infinite state

hier was ik gebleven, video nummer 11...
