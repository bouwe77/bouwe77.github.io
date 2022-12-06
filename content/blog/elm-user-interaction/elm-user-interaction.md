---
date: "2022-12-05"
title: "Elm: User interaction"
summary: ""
categories:
  - "Functional programming"
  - "Elm"
---

# Introduction

This is my third blog post about Elm. After writing about the language, I wrote about creating a web page with HTML. However, this was about rendering some HTML, but it didn't support any user interaction. So that's what we are going to do now.

When talking about user interaction in modern front end frameworks, _state_ is a very common topic. State is the data in your app that can (and will) change, which in turn makes the UI change as well. By separating state from UI, we can build declarative and flexible apps.

This means for Elm, we have to look into the so-called Elm Architecture, which defines how to structure Elm apps so we have this separation between state and UI. So let's build a very simple interactive app, while explaining and adhering to The Elm Architecture.

# ...

