---
date: "2024-07-12"
title: "Simplifying Frontend Development with Temba: A Quick Backend Solution"
summary: "Temba is a library I created to help developers quickly spin up a backend web API"
categories:
  - "Temba"
  - "APIs"
---

As a frontend developer, you're often focused on crafting the perfect client-side experience. Whether you're working with React, Vue, Svelte, or any other framework, sometimes the last thing you want to deal with is setting up a backend. Maybe you're experimenting with an app idea, learning a new frontend technology, or just need a place to store data temporarily. That's where my project, [Temba][temba], comes into play.

### What is Temba?

[Temba][temba] is a library I created to help developers like you quickly spin up a backend web API, allowing you to concentrate on building the frontend. It's available on [NPM](https://www.npmjs.com/package/temba), and it's designed to be simple and straightforward to use. 

With [Temba][temba], you can create a local HTTP server running on Node with just one command in the terminal. This means you can get back to focusing on your frontend while [Temba][temba] handles the backend.

> [Temba][temba] is an alternative for [json-server](https://github.com/typicode/json-server#readme). However, next to JSON file storage, [Temba][temba] also supports MongoDB databases.

### Example

Running the following JavaScript with Node is all you need to get your server running:

```js
import { create } from "temba";

const server = create();

server.start();
```

### How Does Temba Work?

Once you've got your HTTP server running, you can start issuing HTTP requests for **any resource** using the standard methods `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`. 

For example, you can send a `POST` request to the `/products` resource with a JSON payload representing a product. When you `GET` the `/products` resource again, you'll see the product you added in the response.

### Flexibility and Customization

[Temba][temba] is incredibly flexible. You can create any resource you need, not just products. This flexibility allows you to tailor your backend to the specific needs of your frontend application. The data is stored in **memory** by default, which means it's temporary and will be lost when you restart the server. However, if you need to persist data, you have options to save it to a **JSON file** or even a **MongoDB database**.

Let's store our data in MongoDB:

```js
const config = {
  connectionString: 'mongodb://localhost:27017/myDatabase',
}

const server = temba.create(config)

server.start();
```

### Configuration and Control

While [Temba][temba] works out of the box without any configuration, you have the option to customize it further. You can:

* **Restrict Resources**: Limit the server to only handle specific resources, like products. Any other resource requests will then return a 404 error: [Docs](https://github.com/bouwe77/temba/blob/main/README.md#allowing-specific-resources-only)
* **Validate Data**: Define **JSON Schema** for your resources to ensure that the data meets certain criteria before it's accepted: [Docs](https://github.com/bouwe77/temba/blob/main/README.md#json-schema-request-body-validation)
* **Intercept Requests and Responses**: Modify or validate the request body before it hits the database, or alter the response body before it's sent back to the client: [Docs](https://github.com/bouwe77/temba/blob/main/README.md#intercepting-requests)

### Hosting and Deployment

[Temba][temba] also supports hosting your server alongside your frontend application. By configuring the location of your static site within [Temba][temba], you can deploy both the frontend and backend together on fullstack platforms like Heroku or Fly.

### When to Use Temba

[Temba][temba] is ideal for learning, prototyping, or when you're focused on the frontend and don't want to be bogged down by backend concerns. It's not an enterprise solution but rather a convenient tool for getting started quickly on small projects. As your project grows, you might transition to a more robust backend, but [Temba][temba] is a great starting point.

### My Personal Use Case

I use [Temba][temba] as the backend for my own To Do app, which helps me track tasks for home, garden, and personal projects. It's been a valuable tool for me, and I draw inspiration for [Temba's roadmap](https://github.com/bouwe77/temba/issues) from my own experiences and needs.

### Extensibility

If [Temba][temba] doesn't meet your specific needs, you can extend it with **Express routers**. This allows you to add custom routes and functionality to your [Temba][temba] server. 

### Open Source

Of course [Temba][temba] is open source and available on [GitHub](https://github.com/bouwe77/temba#readme), so you're welcome to contribute or suggest improvements.

### Conclusion

[Temba][temba] is a practical alternative to [json-server](https://github.com/typicode/json-server#readme) with the added benefit of database storage. It's designed to keep things simple and let you focus on what you do best: building amazing frontend experiences. Give [Temba][temba] a try, and let me know how it works for you. Your **feedback** is invaluable in shaping the future of this project.

[temba]: https://bouwe.io/temba
