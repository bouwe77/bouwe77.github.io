---
title: XState React
---

# My notes about using XState with React

This page is about using XState with React, but I also have a page about [XState](/xstate).

# Some terminology

Service = ...
Interpreting = ...

# useMachine

Interprets the given machine and starts a service that runs for the lifetime of the component.

Returns an array of `[state, send, service]`.

# useInterpret

Use React Context for global state when using XState and React. To prevent re-renders because of React Context,
use `useInterpret`, which returns a service, a static reference to the running machine, which never changes.

# useActor

To use the service from Context elsewhere, call `useActor(service)`, which returns the `state` (and `context` as
part of it), every time it changes. In other words, with every change the component re-renders.

> `useActor` subscribes to emitted changes from an existing (e.g. from React Context) actor.

To have more control on re-renders, use a selector (`useSelector`) instead of `useActor` to define for which state
or context value you want the component to re-render.

The service coming from Context also returns the `send` function for sending events to the machine. If you already
call `useActor`, that will also return the `send` function.
