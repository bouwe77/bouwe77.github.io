---
date: "2023-01-11"
title: "What is a finite state machine?"
summary: "Let's talk about state machines, a very nice way to structure application logic."
categories:
  - "State machines"
---

### Introduction

A finite state machine is a way of organizing and implementing logic.

I use state machines a lot at work for implementing complex logic and handling side effects. It's super fun to build them, and I am fascinated by how they work.

But first, let's take a step back and answer the question: What is a finite state machine and how do they work?

### State

For the logic to know when and what should be done, a state machine always is in a specific mode or condition at any moment in time, called a _state_. 

So if we would implement a light switch as a state machine, at any moment in time, the state is either `on` or `off`. It can not be `on` _and_ `off`, and it can also not be something else than `on` or `off`: The fact that we defined only these two limited and fixed states, makes it finite.

Let's start using our light switch state machine, which is `off` at the moment, so the current state is `off`. We can ask for the current state of the machine through the `state` property:

```
const lightSwitch = new LightSwitch()
console.log(lightSwitch.state) // OFF
```

> The code samples in this blog post are written in TypeScript and use classes, because I think (and hope) it's most simple and clear. However, you can use any language and paradigm to build state machines. More on this in my next blog post.

### Transitions and events

How can we switch it `on`? 

Changing the state from one to the other is called a _transition_. Transitions only happen inside the machine, they are encapsulated. The only way for the outside world to communicate with the machine is through sending events.

Sending events to a machine is a way to give it instructions. So in this case we could give it a `switch` event, so that the state becomes `on`. Just like with state, events are also fixed and predefined in the state machine. Because we use classes, `switch` is a method on our object:

```
const lightSwitch = new LightSwitch()
console.log(lightSwitch.state) // OFF

// Let's send the "switch" event:
lightSwitch.switch()

console.log(lightSwitch.state) // ON

// Of course we can call it again:
lightSwitch.switch()
console.log(lightSwitch.state) // OFF
```

What happens, or even if something happens at all when an event is sent to the machine is up to you, and can be done in many ways. Let me give you two examples of how to implement the light switch:

We could have one event, `switch`, to do two different state transitions. When it's `on`, the `switch` event transitions to `off`, and vice versa.

We could also have named our event `switchOn`, but then it would only apply (be implemented) in the `off` state. Then we'd need an additional `switchOff` event, which is only implemented in the `on` state:

```
const lightSwitch = new LightSwitch()
console.log(lightSwitch.state) // OFF

// Let's turn the switch on:
lightSwitch.switchOn()

console.log(lightSwitch.state) // ON

// Of course we can switch it off again:
lightSwitch.switchOff()
console.log(lightSwitch.state) // OFF
```

Using the `switchOn` and `switchOff` events is very explicit, compared to just `switch`, so depending on the use case we could choose either one of them. Or just both of course!

### Keep it simple

But what would happen if the state is `off` and you send the event `switchOff`?

```
const lightSwitch = new LightSwitch()
console.log(lightSwitch.state) // OFF

// Let's turn the switch off:
lightSwitch.switchOff()
console.log(lightSwitch.state) // OFF

// Let's turn the switch off again:
lightSwitch.switchOff()
console.log(lightSwitch.state) // OFF
```

As you can see, nothing! Well, unless you implement something of course, but the idea with state machines is to implement what should happen, and not what should not happen. This makes the behavior and design of the state machine consistent and simple.

If you want to prevent your software to send events that are not applicable, you can implement your UI, or whatever interface, to not do or allow that. Look at the real world, if your light is on, there is no physical way to turn it on again, or "more" on. The same can be achieved in your code, while still keeping the state machine nice and simple.

### Do you haz teh codez?

Here is the state machine implementation that would make all of the code above work:

```
type LightSwitchState = "on" | "off";

class LightSwitch {
  private _state: LightSwitchState;

  constructor() {
    this._state = "off";
  }

  public switch() {
    if (this._state === "on") this._state = "off"
    else this._state = "on"
    return this._state
  }
  
  public switchOn() {
    if (this._state !== "on") this._state = "on";
    return this._state
  }

  public switchOff() {
    if (this._state !== "off") this._state = "off";
    return this._state
  }

  public get state() {
    return this._state;
  }
}
```

You can also check out the code on this repl: [https://replit.com/@bouwe77/WornTrickySoftwareengineer#index.ts](https://replit.com/@bouwe77/WornTrickySoftwareengineer#index.ts) or on GitHub: [https://github.com/bouwe77/light-switch-state-machine](https://github.com/bouwe77/light-switch-state-machine)

The fact we are using a class here is a way to enable an important aspect of state machines: There is a distinction between the abstract definition of a state machine, and a running version of it, in this case the object instance of this class. The same can be achieved when not using classes, as I will explain in my next blog post.

This is just one way of implementing a state machine, but there are many more. In a next blog post I want to dive deeper into the various ways of how to implement state machines. There are a few patterns for it, and depending on your current codebase and preference you might favor one over the other.

### Conclusion

Now, you might wonder, why in the world would I implement a light switch as a state machine? Probably you would not, but I think it's a nice way to explain some concepts.

Designing state machines is great, but can be challenging. Having a good understanding of how state machines work is essential for designing and building logic that might need a state machine.

I hope you found this interesting, and if you have any questions or remarks, please reach out to me on Twitter, thanks very much!




