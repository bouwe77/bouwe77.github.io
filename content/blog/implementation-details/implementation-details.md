---
date: "2023-09-12"
title: "Implementation details"
summary: "..."
categories:
  - "Architecture"
  - "Testing"
  - "State machines"
---

When developing software, but even more so when _testing_ software, you don't always need to know all of the details of how things work, and what exactly happens under the hood. 

These things that you don't know (or care) how they work are the _implementation details_ of the thing that you _do_ know (or care) about.

Of course the border between these things depends, and might even be different depending on what kind of task you are working on, but looking at software like this really ... ... ...

### Testing

This is for a big part how _testing_ works. When testing, you verify if the software meets the requirements. You don't need to (or maybe not even should) know how it exactly works, also to have a .... This often helps to improve the quality of software, as you might think of things to verify, that the developers forgot because they were so into all of the implementation details.

An example of this is UI testing a web application, which verifies if users see the expected things and can interact with it. Probably HTML, CSS, and Javascript and/or some kind of framework is used to implement that. However, from a testing perspective this does not matter, we just want to test whether the UI and behavior is as expected. This is why it is important why we should not test which CSS classes are used, or which functions are being called. (dit moet wat korter)

A way of preventing this is by using Test Driven Development, because then tests are less likely to be polluted with implementation details, because there aren't any yet. As you build the test and the implementation, and you go from _red_ to _green_, the test is done. When you then change the implementation details in the _refactor_ step, your black box test will keep on showing it still works, without knowing the details of how that is achieved.

This also makes you tests resiliant to change, as we improve the implementation details in the future, and have the tests as a safeguard to tell us if it still works.

This only really works if you write integration tests at a functional level, so only test the bigger functional blocks in your application. In those tests you verify the requirements of that functionality, without caring (and testing) too much all of the functions that are used to meet those requirements.

This is why I think unit testing each and every function because of code coverage is a waste of time, because these functions could be gone soon, and also don't really say much about whether a user is able to use our software.

### Coding

When coding, this principle also applies. For example, when creating abstractions. By creating functions or classes that implement some behavior, you can call them elsewhere, which basically makes those abstractions black boxes from the caller's point of view. You can look into the implementation details, but don't really need to, because by looking at the name, arguments and type definition of that abstraction, you can already figure out what it does.

...

(iets over dat deze grens kan verschuiven, afhankelijk van waar je mee bezig bent e waarschijnlijk hoe technisch dit is)

### Why is this useful?

- Je kunt niet alles weten 🤯
- Focus
- Ready for change

