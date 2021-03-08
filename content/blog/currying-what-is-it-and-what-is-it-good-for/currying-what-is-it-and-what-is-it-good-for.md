---
date: "2021-03-08"
title: "Currying: What is it and what is it good for?"
summary: ""
categories:
  - "JavaScript"
  - "Functional programming"
---

#### Introduction

Every now and then I read a blog or watch a video about functional programming. I have become quite comfortable with some of the concepts, such as declarative programming, pure functions and higher order functions, which I use regularly when writing React or NodeJS code.

However, there are also concepts that I find really hard to grasp. But somehow they are also very appealing to me. Recently I realized the only way to finally understand these things is not only to try them out, but also, as an ultimate learning experience, write a blog post about it. So that's what I am going to do now about _currying_ and _partial application_.

When reading or watching videos about currying I noticed something that I also encountered with other concepts being explained, for example with the `useEffect` and `useRef` React hooks. And that is that people are starting right away with explaining _how_ to use that concept. The consequence is that I find it really hard to understand.

What I am missing is _why_ you would use such a concept. So what works best for me is that a problem or use case is introduced, it is solved in a way that is quite familiar for most people, which then shows the solution is not ideal, or even impossible. Then we are on the same page of what the problem is. And only after that the new concept is introduced, so it clearly shows which problem it is solving.

So that's what I am going to do in this blog post.

#### The problem:

https://youtu.be/F_N97iovVbQ
