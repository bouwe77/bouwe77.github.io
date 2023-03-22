---
title: TypeScript
---

INTRO

* Experience with TS?

* Experience with other languages?

* First and foremost: TS is a developer tool, an end user will not directly run it

JS vs TS

* JS is dynamically typed and interpreted

* TS is statically typed and compiled

* Nominal (C#/Java) vs structural (TS, even classes) typing

* You can but not always must the type: inference
  Explicit vs implicit type definitions

* Write as little TS as possible

COMPILATION / TRANSPILATION

* TS compiles to JS before it can run somewhere
(users only benefit from TS implicitely)

* Compilation happens once, either locally or on CI

* Compile time (TS) vs runtime (JS)

* Types get deleted when transpiled to JS
  (if your code has type errors it won't compile, so if it compiles it must be (kinda) good...)

* The JS target version is configured

BENEFITS of TS

* Better understanding of your code

* Prevent bugs at compile time

* Improves tooling, for example navigation and intellisense in VS Code

* But it has a learning curve

* Job security


STARTING / MIGRATING

1. Install typescript as dev dependency
2. `tsc --init` (creates tsconfig.json)
3. Notable settings:
    - Target
    - AllowJs
4. commands in package.json
5. eslint

RUNNING YOUR APP

* TS can "lie" when using external systems

* Input checking (runtime)
