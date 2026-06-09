# Developer Guide

This project is a custom static site generator for [bouwe.io](https://bouwe.io). Source content lives in `content`, templates live in `templates`, generator code lives in `src`, and the generated GitHub Pages output is written to `docs`.

## Prerequisites

- Node.js and npm
- Git

Install dependencies after cloning:

```sh
npm install
```

## Run Locally

Start the local preview server:

```sh
npm run preview
```

This runs `node src/preview.js`, generates the site into `docs`, serves it with Express, and watches `content`, `templates`, and `src` for changes. Open:

```text
http://localhost:2234
```

When a watched file changes, the preview server rebuilds the static output automatically.

## Build the Site

Generate the static site once:

```sh
npm run publish
```

This deletes and recreates `docs`, copies files from `content/static`, renders Markdown content, creates category pages, redirects, and RSS/Atom feeds.

## Create Content

Scaffold a new blog post or page interactively:

```sh
npm run create
```

Blog posts are created under `content/blog/<slug>/<slug>.md`. Pages are created under `content/pages/<slug>.md`.

## Content Structure

- `content/blog`: blog posts, one folder per post
- `content/pages`: standalone Markdown pages
- `content/static`: static assets copied directly into `docs`
- `templates`: HTML templates used by the generator
- `src/allCategories.json`: category choices used by the interactive content creator

Blog post folders whose names start with `_` are generated but excluded from public blog listings.

## Deployment

The site is hosted with GitHub Pages from the generated `docs` directory. After changing content, templates, or generator code, run:

```sh
npm run publish
```

Then commit the source changes and generated `docs` output together.

The helper script `commit-publish.sh` creates an empty `[publish]` commit and pushes it. Use it only when you need to trigger a publish without changing files.

## Dependency Updates

Run the dependency update helper:

```sh
npm run update
```

Review and test the result locally with `npm run preview` before committing dependency changes.
