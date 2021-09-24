---
date: "2019-09-18"
title: "Render Props Part IV - Keep It Simple Stupid"
summary: ""
categories:
  - "React"
  - "render props"
  - "useEffect"
---

### Introduction

I wrote several blog posts about my learning process of the render props pattern.
With every blog post I learned something new, but also made mistakes. But that's
what learning is about. And because I am learning in public, it kind of forces
me to fix things that could be better.

In my [previous post] (part 3) about the render props pattern, I thought I kind of
finished my implementation of the `Toggle` component. However, I used the `useEffect`
hook, which is a great learning experience, but now, a few months later, I realized
in this case, it is not necessary to use `useEffect` for what I wanted to achieve.

In this blog post I will explain you why.

### Do you haz teh codez?

Sure, this is my `Toggle` component from [part 3]:

```js
function Toggle({ render, onToggle }) {
  const [on, setOn] = useState(false);

  function doToggle() {
    setOn(!on);
  }

  useEffect(() => {
    if (onToggle) onToggle(on);
  }, [on]);

  return <>{render(doToggle)}</>;
}
```

The `Toggle` component receives two props. The first is the `render` prop, which
is the function that renders the UI. That `render` function is returned by the
`Toggle` component, because that is what React components do, they always return
a piece of UI.

When calling the `render` function in the return the `doToggle` function is passed.
That function is called when the user toggles the UI. When a toggle takes place
the `on` state of the `Toggle` component is inversed, true becomes false and false
becomes true.

The `useEffect` responds to the fact the value of the `on` state and calls the second
prop that is passed in the `Toggle` component: the `onToggle`. This is a callback
function passed by the component that uses the `Toggle` component. What typically happens
when calling the `onToggle` is that there happens some kind of state change in the
component that uses the `Toggle` component.

### Why useEffect?

As soon as the `on` state value changes, I use the `useEffect` to pass that new state
value to the callback function so the parent component also can use that new value.

I thought I had to "wait" for the state change to really have happened before I
could call the callback function, because that's the moment I know the new state
value for sure.

However, at the moment I set the new `on` value with `setOn`, I already know the
new value! It's right there in the code where I pass it to `setOn`! 8-|

DOH!!!

So why not call the callback right away with that same value:

```js
function Toggle({ render, onToggle }) {
  const [on, setOn] = useState(false);

  function doToggle() {
    setOn(!on);
    onToggle(!on);
  }

  return <>{render(doToggle)}</>;
}
```

> **Oh, and by the way...**
> There was also a bug in my `useEffect` code. The `useEffect` is calling the `onToggle`
> callback function which makes it a dependency and therefore should be added to
> the dependency array. However, we've removed the `useEffect` entirely, so that's
> not an issue anymore.

### How I figured this out

After writing [part 3] it kept on disturbing me I had to use such a complicated
solution for such a common and simple problem. So I started googling arround and
stumbled upon [this Reddit post].

There Mr Dan Abramov himself explains why you can not have the new state value right
away. And also that this is not a problem most of the times as you define the new state
value yourself and then can do with it whatever you want.

He explains with code that looks something like this:

```js
const [count, setCount] = useState(0);

function handleClick() {
  setCount(42);
  // you can't expect this to somehow immediately change the count, we even declared it with const :-)
  console.log(count); // 0
  // but on next render, count will be 42
}
```

I think the code comments explain a lot. :)

### Conclusion

By writing this blog I not only learned something new, I also fixed crappy code and, last
but not least, have a better understanding of the `useState` and `useEffect` hooks.

And I realized that learning in public can be a bit awkward, but more importantly, learning
by sharing is a great way to solidify what you learn.

To see the code, check out [this CodeSandbox] or the [Github repo].

[previous post]: /render-props-part-iii-a-flexible-and-reusable-toggle-component
[part 3]: /render-props-part-iii-a-flexible-and-reusable-toggle-component
[this reddit post]: https://www.reddit.com/r/reactjs/comments/a3y76f/react_hooks_setstate_gotcha/eba1fh0/
[this codesandbox]: https://codesandbox.io/s/github/bouwe77/react-render-props-4/tree/master/
[github repo]: https://github.com/bouwe77/react-render-props-4
