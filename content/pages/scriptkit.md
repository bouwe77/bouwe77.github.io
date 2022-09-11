---
title: ScriptKit
---

### Selected text

`await getSelectedText()` returns the selected text.

Do something with that text, and then possibly use `await setSelectedText(text)` to replace the selected text.

### HTTP requests

`await get(url)`

### Create JSON file of data

`inspect(data)` or with a filename `inspect(data, `myData.json`)`

### User input

`arg('What is your name?')`

### User input select from list of options

`arg` also accepts a 2nd argument for specifying which options to select, with an optional preview. The structure of these choices are:

```
{
    name: string
    description: string
    value: string
    preview: () => string
}
```

When you select an option, the `value` is returned.

### Run bash commands

Supply a command after the dollar sign: `$'command here'`

For example for opening a URL:

`await $'open https://bouwe.io'`

### Chrome Dev Tools

Open dev tools: `dev()`. Log things in the dev tools: `dev(stuff)`

### Open VS Code

`editor(path)`, which opens the preferred editor for the given file or folder path.

### Folders and files

`home()` refers to the home directory, and `home("blah")` refers to the "blah" folder inside the home directory.
