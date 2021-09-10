---
title: The difference between `npm i` and `npm ci`
---

`npm i` installs the packages listed in the `package.json` file. This also means, depending on how version numbers are defined there (^, ~, etc.), packages will be updated.

When you have a separate, dedicated process for updating packages, running `npm i` locally is not necessary.

In that case you use `npm ci`, which installs package versions defined in `package-lock.json`. This is a deterministic approach, you know exactly what you get and everyone is using the same version.

