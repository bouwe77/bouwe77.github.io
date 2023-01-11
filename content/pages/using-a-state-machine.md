---
date: "2023-01-09"
title: "Using a state machine"
summary: ""
categories:
  - "State machines"
---

### Introduction

In this series about introducing state machines I will start with writing about how to use (call) a state machine.

If you don't know what a state machine is, or how to create one, this might sound strange. How can I use something when I haven't even build it yet?

Well, I think by calling state machines, you first start thinking about _what_ you want to achieve with them, and only then, after that, _how_ you want build them. Building a state machine can be challenging, while using it is pretty straightforward.

Also by calling it first, you can determine it is even usable, and you can define the requirements to determine if it works. So what we are basically doing here is kind of a test driven approach, which is very beneficial when you know _what_ you want, but not necessarily yet _how_.

### A light switch

Let's keep it simple and build a light switch. At any given point in time, the light is either on or off. It can not be something else than on or off, and it can also not be both on and off at the same time. Also, we need to have a way to know, or to ask, the light switch whether it is currently on or off.

This means on and off are the _finite states_ of our state machine.

Let's start coding by using the light switch and asking it whether it is on or off:

```
const lightSwitch = new LightSwitch()
console.log(lightSwitch.state) // "off"
```

> I am using an object oriented approach here, because I think it's the easiest to begin with introducing state machines.
> Personally I prefer and use state machines in a more functional coding style, so I will definitely do some writing about that later.

### Switching on or off

OK, so the light is off. How do we switch it on? Let's call a `switchOn` method on the `lightSwitch` object. Oh, and while we are at it, let's also switching it off again:

```
const lightSwitch = new LightSwitch()
console.log(lightSwitch.state) // "off"

lightSwitch.switchOn()
console.log(lightSwitch.state) // "on"

lightSwitch.switchOff()
console.log(lightSwitch.state) // "off"
```

`switchOn` or `switchOff` are the only inputs our state machines expects. When calling them, the state of our light switch machine _transitions_ from one state to the other.

### ... transitions

When implementing state machines, it is very common to only define what you do want to happen. There is no need to prevent things from happening, or even to throw errors when a state machines gets unexpected inputs.

So for example, when the light is on, and you call `switchOn` again, nothing should happen, because it is already on. And of course the same for `switchOff`.

To make our code even nicer, let's have `switchOn` and `switchOff` return the state the light switch is in, after calling them:

```
const lightSwitch = new LightSwitch()
console.log(lightSwitch.state) // "off"

let state = lightSwitch.switchOn()
console.log(state) // "on"
lightSwitch.switchOn()
console.log(lightSwitch.state) // "on"

lightSwitch.switchOff()
console.log(lightSwitch.state) // "off"
state = lightSwitch.switchOff()
console.log(state) // "off"
```

With this, we can determine the current state anytime, by calling the `lightSwitch.state` getter, but we also get it back after changing the state.

### Testing

As we have specified how to use the `LightSwitch`, and also what we expect from it, let's turn our code into a poor man's test suite by calling `console.assert`:

```
const lightSwitch = new LightSwitch()
console.assert(lightSwitch.state === "off", "light should be off")

let state = lightSwitch.switchOn()
console.assert(state === "on", "light should be on")
lightSwitch.switchOn()
console.assert(lightSwitch.state === "on", "light should be on")

lightSwitch.switchOff()
console.assert(lightSwitch.state === "off", "light should be off")
state = lightSwitch.switchOff()
console.assert(state === "off", "light should be off")
```

So whenever an assertion fails, the message passed as second argument to `console.assert` is written to the console. If the assertion passes, nothing is written to the console. When running this code, no news is good news.

### Implementing the light switch

Our "test suite" of course does not work, because we haven't implemented the `LightSwitch` class yet. Here is a nice and simple implementation:

```
type LightSwitchState = "on" | "off";

class LightSwitch {
  private _state: LightSwitchState;

  constructor() {
    this._state = "off";
  }

  public switchOn(): LightSwitchState {
    if (this._state !== "on") this._state = "on";
    return this._state
  }

  public switchOff(): LightSwitchState {
    if (this._state !== "off") this._state = "off";
    return this._state
  }

  public get state(): LightSwitchState {
    return this._state;
  }
}
```

### Conclusion

All our tests pass, so we are done, right? Well yes, but maybe this implementation is a bit overkill. I mean, is it really necessary to build a light switch as a state machine?

Probably not. And then I haven't even used the state pattern yet, which is the official way of building state machines when you are doing object oriented programming. That would make our code even longer.

The state pattern, and of course state machines in general, really shine if you need to implement more complex behavior. But I hope this simple example gave you a nice intro into state machines.


