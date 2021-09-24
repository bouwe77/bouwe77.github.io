---
date: "2019-05-30"
title: "Render Props Part III - A flexible and reusable Toggle component"
summary: ""
categories:
  - "React"
  - "render props"
  - "useEffect"
---

### Introduction

This is my third post about the [render props] pattern. I am still learning this pattern and to
really solidify what I learn I am blogging about it as it forces me to explain the what,
why and how.

In [Part 1] I created a Toggle component and showed how you can use the render props pattern
to separate the toggle functionality from how the toggle UI looks.

In [Part 2] I tried to use the Toggle in a form. The problem I faced was that the Toggle
implementation from [Part 1] did not allow me to actually use the current toggle value.
For example, saving the current toggle state in the component that uses the Toggle.
The solution I came up with was to [lift up] (as in _move_) state from the Toggle component
up to the component that uses the Toggle component.

Although lifting up state is good practice, I was not completely satisfied with this
solution for this specific use case. Because I made the Toggle component a _stateless_
component it means it depends on a _stateful_ parent component whether the Toggle ever
gets re-rendered. And also I want to make the Toggle component more flexible, reusable
and independent so I could potentially use it in a lot of different apps or even publish
it to NPM.

So for this post my goal is to make the Toggle component stateful again (like I did in
[Part 1]) but also be able to update the current toggle state in the component that renders
the Toggle component.

### Plumbing

First, let's create a starting point. This is the stateful Toggle component I created in [Part 1]:

```js
function Toggle(props) {
  const [on, setOn] = useState(false);

  return <>{props.render(() => setOn(!on), on)}</>;
}
```

> What this component does is receive a prop called `render` ("render prop"), which
> is a function that defines the UI of the toggle component.

Here is an example of such a function, a checkbox that let's the user indicate whether it wants
to subscribe to a newsletter:

```js
function renderCheckbox(toggle) {
  return (
    <>
      <input type="checkbox" onChange={toggle} />
      Subscribe to newsletter
    </>
  );
}
```

This function receives two arguments: the function to call when the toggle takes place and
the current on state.

In the App component we render a form that uses the Toggle component and pass the `renderCheckbox`
function. Also we add state so we know the user wants to subscribe or not.

```js
function App() {
  const [subscribe, setSubscribe] = useState(false);

  function save(event) {
    event.preventDefault();
    //todo: yet to be implemented
  }

  return (
    <form onSubmit={save}>
      <Toggle render={renderCheckbox} />
      <br />
      <button type="submit">Save</button>
    </form>
  );
}
```

And this works, when the user clicks (changes) the checkbox the `on` state in the Toggle
component is updated and both the Toggle component and its children (the checkbox in this case) are
re-rendered.

However, the App component wants to know the toggle state too so it knows whether the user wants to
subscribe or not.

### Callback props to the rescue

So therefore I let the Toggle component receive a second prop: an `onToggle` callback function.
This function is called when a toggle occurs. I refactored the Toggle component so the toggle function
does both updating the local on state and calling the onToggle with this on state. Note that the onToggle
prop is not required as you can see in the [propTypes].

```js
function Toggle({ render, onToggle }) {
  const [on, setOn] = useState(false);

  function toggle() {
    setOn(!on);
    if (onToggle) onToggle(on);
  }

  return <>{render(toggle)}</>;
}

Toggle.propTypes = {
  render: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
};
```

Nice, the Toggle component seems ready to receive an extra function which allows components that use the
Toggle to handle their own logic when a user toggles.

In the form of the App component, we create the `changeSubscription` function that updates the
subscribe state. That function is passed to the Toggle component via the onToggle prop:

```js
function App() {
  const [subscribe, setSubscribe] = useState(false);

  function changeSubscription(on) {
    setSubscribe(on);
  }

  /* ...snip... */

  return (
    <form onSubmit={save}>
      <Toggle render={renderCheckbox} onToggle={changeSubscription} />
      <br />
      <button type="submit">Save</button>
    </form>
  );
}
```

### Testing

With this in place the current state of the Toggle should be reflected in the current subscription
state in the App component.

_However, it does not work!_

What should happen is that the toggle function in the Toggle component updates the on state and then calls the
onToggle function and passes in that current on state. However, it does not pass the current state, but the previous
state... That is because [React processes state updates asynchronously]. This means you never know for sure if
and when the state update is finished. So here the onToggle function is called to early.

Back in the _olden days_ of [class components] you would use `setState` to update state. Besides
passing the state you want to change you can also pass a callback function that React will call when it
finished updating that state. However, when using the useState hook this callback mechanism does no longer
exist. The fact that you want to do something with an updated state value is considered a side effect and
therefore you have to use the `useEffect` hook.

### Using the useEffect hook

[UseEffect] hooks are called initially after mounting the component and then after each render. It receives
two arguments, the first is required and is the function that must be called by React for that side effect.
The second argument is optional and is an array of all variables the side effect is dependent on. That means
that the function that is passed to useEffect is only called if either one of these dependent variables value
is changed.

In our case the side effect needs to be called when the on variable changes, so we add a useEffect
function to the Toggle component. Also we can get rid of the toggle function we created earlier and move the
setOn back to where we call the render function:

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

And whad'ya know, it works!

### Conclusion

What we have achieved with this solution is that the on state in the Toggle component is always in sync
with the subscribe state in the App component. However, keeping state in sync is optional, we have made
the Toggle more flexible and reusable.

The flow of the Toggle component is now as follows:

1. The Toggle component is rendered by App and calls the render prop, which renders the checkbox.
1. The user clicks the checkbox which raises the onChange event, which calls the setOn in the Toggle component.
1. Because setOn changes the on variable the useEffect is called.
1. The effect causes the onToggle from the App component to be called which updates the subscribe state in the
   App component.
1. After clicking the Save button the current subscribe state can be stored wherever you like.

To watch or play around with the full code of this blog post, please check out this [CodeSandbox] or the [Github repo].

Although I am very satisfied with this solution and even more what I learned from it, there are still some
improvements to make, so stay tuned for yet another (and hopefully last) blog post about the render props pattern.

[render props]: /categories/render-props
[part 1]: /day-4-render-props
[part 2]: /render-props-part-ii-using-the-toggle-component
[class components]: https://reactjs.org/docs/state-and-lifecycle.html
[lift up]: https://reactjs.org/docs/lifting-state-up.html
[proptypes]: https://reactjs.org/docs/typechecking-with-proptypes.html
[react processes state updates asynchronously]: https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
[useeffect]: https://reactjs.org/docs/hooks-effect.html
[codesandbox]: https://codesandbox.io/s/ksjne
[github repo]: https://github.com/bouwe77/react-render-props-3
