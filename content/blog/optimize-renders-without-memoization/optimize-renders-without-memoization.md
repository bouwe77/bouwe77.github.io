---
date: "2021-12-28"
title: "Optimize renders without memoization"
summary: ""
categories:
  - "React"
  - "Performance"
---

### Introduction

In this blog post I want to introduce an alternative to the ways React offers to memoize components. Memoization is basically a caching mechanism, which let's you control when components should (or should not) be rerendered.

React is all about composition, and the more I use (and learn about) React I realize composition is a solution for many cases where often more complex solutions, for example memoization, seem appealing, while they are not always necessary.

But before I introduce an alternative for memoization, let's talk a bit more about what rendering and memoization are.

### Rendering

If you open your React app in the browser, React will render the components for you. In other words, React will _call_ your component functions, create React elements out of the JSX in those components, and then commit those elements to the browser DOM.

From then on, only the component(s) whose state has changed will be rerendered. React will then compare the created React elements of those rerendered components to the elements in the Virtual DOM to determine which changes actually need to be committed to the browser DOM.

State changes are the way to change the UI, and rendering is the way to apply those changes. This is how React works, and React does this very fast and efficient.

However, it is very well possible that the result of a rerender results in no changes need to be made to the DOM. And because it still takes some effort for React to render those elements, it can be beneficial to be at least a little bit mindful about this: Do my React components cause unnecessary rerenders?

### Unnecessary rerenders

An unnecessary rerender is a render that does not result in DOM changes that need to be committed.

Although not something that will happen quickly, or often, but unnecessary rerenders could even be the cause for performance problems. Especially in big, complex applications. Because again, React is very fast and efficient, but at some point it can just be too much.

There are many ways to prevent unnecessary rerenders, or even performance problems. Most notably by colocating state in the component where it is actually used, so only that component needs to be rerendered. And by making what needs to be rendered fast and efficient: If rendering your component takes 2 milliseconds, then it perhaps isn't such a big deal to render it a hundred times...

If these ways are not sufficient there is another trick to optimize renders and that is memoization.

### Memoizing components

By memoizing components you tell React to only rerender a component when the dependencies change.

There are 2 ways to memoize components in React, the first is the `React.memo` higher order component, which you use when defining a component function. You tell React to only rerender the component when the props changed that were passed into the component:

```js
//TODO...
```

This means that everyone who uses that component will always have a memoized component.

The second way is the `useMemo` hook. Use this hook when you have a component that itself is not memoized, but you want to memoize it in a specific situation, because that is necessary in the component where you use it. In other words, `useMemo` is a bit more flexible.

And this flexibility can be important, because why would you want to memoize something always, while it may not always be necessary. Of course, memoization reduces rerenders, but the fact it is being memoized costs resources. React not only has to do the actual memoization, it also has to be stored somewhere, which costs you memory.

Imagine, every time you are going for a walk you wear a rain suit, take your umbrella, etc. You could do that, because when it would rain you'll stay dry. But it takes effort to put on the rain suit, and it will make you sweat more. It is not without effort. So instead, just check the weather forecast, and only bother if it is necessary.

Anyway, now that you know a bit more about rendering and memoization, let's work with an example that has an unnecessary rerender, and solve that.

### An example

Check out the following example. Here we have ...

```js
//...
```

Let's add some state. Now you can ... Every time the state changes (in other words, the ...), this component is rerenderd:

```js
//...
```

Did you spot the unnecessary rerender? 😱

Although also the ... component gets rerendered when ... changes, it hasn't got anything to do with that state. So here we have an opportunity to optimize the rerenders.

Let's apply memoization with `useMemo` to optimize:

```js
//...
```

Now the ... component only rerenders when the dependencies of the `useMemo` call change. But an empty array is an empty array, and will always stay an empty array, so it will never be rerendered again.

Unless, and this is important, the internal state of the ... component changes of course. Then the ... component will be rerendered. So instead of saying the ... component will never be rerendered, I should have said, it will never be rerendered when the ... component is rerendered. 

It is no longer part of the render cycle of the ... component by using memoization.

### Composition

React is all about composition. This means ...

The reason I started this blog post by talking about rendering was not only because of the unnecessary ones. Rendering is also about composition: When you compose your components well, you can influence what and when is (or is not) rerendered.

Let me show you what I mean with composing well, by solving our unnecessary rerender by using composition instead of memoization:

```js
//...
```

Why does this solve my unnecessary rerender?

Like I just said, we don't want the ... component to rerender when the ... state of the ... component changes. And what I did here is move the ... component out of the ... component, so it no longer takes part in the ... component's render cycle. I moved it higher up in the component tree, by introducing the ... component. By the way, if I already would have a parent component, I could have moved it there as well.

The ... component still renders the ... component, but it gets the _already rendered_ JSX from the ... parent component, instead of JSX the ... component still had to render itself, which meant it became part of the ... component's render cycle.

Only when the ... component rerenders, the ... component is also rerendered, which is only for the initial render. The ... component has no state, and no parents that hve state, so it will never rerender because of a state change.

### Pass components as props

In the previous example I used React's `children` prop, but that is not always posible. 

For example, when your layout is a bit more complex and you want to position the children on specific places in the UI. Or when `children` is not specific enough if you want to control which, and how many, child components can be passed in.

In that case you can use _slots_, in other words, a specific prop for each child component you want to render.

I've adjusted the example we just used, and now we don't use the `children` prop anymore, but use the ... props instead:

```js
//...
```

Note how this is a more explicit approach compared to just using `children`, but the effect is the same: The child components are already rendered, are coming from outside of the ... component, and therefore are not part of the ... component's render cycle.

### Create the component outside of the parent component

A third and final example of an alternative to memoization is creating and rendering the component outside of the component:

```js
//...
```

Here we don't pass in the already rendered component as a prop, but instead just render the one that is defined outside of the ... component, and therefore also outside of its render cycle.

...
...
...

### Conclusion
