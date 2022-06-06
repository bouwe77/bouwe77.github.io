---
date: "2022-05-29"
title: "What (to me) is functional programming?"
summary: ""
categories:
  - "Functional programming"
  - "Personal"
---

### Switching from C# to JavaScript

When I started with React in 2019, I discovered functional programming (FP). In the JavaScript world, both on the client and the server, it's quite normal to just use functions instead of creating classes and instantiate them. Being a C# developer back then, this was very different for me. I was used to object oriented programming (OOP), its design patterns, and whatever you wanted to build with C#, it had to be a class.

So I started reading about FP. Only having functions was an intruiging idea for me, which, with JavaScript, you could very easily pass around. I liked the idea very much. Of course you can do similar things with C# as well, but you can hardly get around classes. Perhaps make them static, but they just feel so unnecessary then. Passing functions around can be done with delegates, but this also much more work.

More and more I realized I was really drawn towards functional programming, and also realized JavaScript had a lot to do with it. I can't explain what it is, C# is nice, and much more appealing to me than Java, but somehow I just love JavaScript so much. This, and my love for React, combined with that JavaScript grew into a mature language with ES6 and TypeScript, made me switch jobs in 2021. Now I work with React, TypeScript, and functional programming all day.

TypeScript is an important addition to JavaScript, coming from C#, because otherwise JavaScript's loose types are really a step back. With TypeScript you get type safety, without having to create classes.

> There is quite a specific difference between how C# and TypeScript handle types. C# types are nominal, so you have to use the exact type _name_ the code expects, while TypeScript types are structural, so only the _shape_ of the type is important. 💡

(ergens misschien iets over waarom ik classes onnodig vind, alhoewel ik er niet echt iets tegen heb?)

### Is it the paradigm or the language?

Let's take a step back.

I've mentioned the OOP and FP paradigms a few times now. But what are they? Both have their own rules, terminology, patterns, etc., and can even cause very religious debates. I will not dive into what the actual difference is between these paradigms, because there are many books, blog posts, and videos about that. Let me tell you what they mean to me.

For me, it is interesting to talk (blog) about this because I not only want to express my appreciation and shear joy for how I am coding these days, I also want to know where I stand:

The difference between OOP and FP, for me, really, really simply put, is that with OOP I instantiate classes, which often have their own state, can receive dependent instances of other classes through the constructor, and can be stateless, by making them static. With FP, I only have functions, which call each other, compose into other functions, and the state is... well, somewhere else, but more on that later.

I know classes and functions are not mutually exclusive when talking about OOP and FP, but in my experience they pretty much are.

But is FP for me just not using classes anymore, or is it more than that? Which of the typical FP aspects do I already use and which do I still have to learn? And which of the things do I choose not to learn or apply, because they go too far for my taste?

In the end, we are just writing software too satisfy a need, to implement requirements, right? If it works, it works. I am convinced there is no either/or, if you look at patterns within a paradigm, or even between paradigms. You can perfectly use OOP and FP interchangably.

However, having switched from C# to JS/TS, is so great for me, because I can now really use all these paradigms in a nicer way compared to C#. I hardly used any classes in the past year, but still, the language is not preventing me from doing that.

So I think switching languages has had an equal, or perhaps even greater impact on my refound joy in programming, than the paradigm(s) I use.

I will continue by talking about 3 things I've learned in the past years when switching from OOP to FP: Composition, declarative programming, and state. These things are very applicable to both OOP and FP.

### Composition

I remember starting with OOP, going from using inheritance for everything, to preferring **composition**, and hardly using inheritance anymore. In FP, composition is a huge, and very important aspect. I am learning a lot about FP composition with Eric Elliot's book Composing Software.

For example, ...

### Declarative programming

Another general concept, which I learned through React, is **declarative versus imperative programming**. This is also something that is not unique to FP, it also exists for OOP. However, the way you implement it is different of course.

...

### State

Finally, an interesting subject is **state**. With OOP, you instantiate an object from a class, and that object can hold its own state. If it doesn't, you might as well make it a static class, which has its own drawbacks. But how does state work with FP? Functions are stateless, they only know the things they get as input, and they return the result of what they've done with that input. So where is the state?

...

### Conclusion

I really liked writing this blog post, because it put some things into perspective for me. I think (hope) I did not say anything that is simply not true, but I am very sure I am not giving a full, complete picture of OOP and FP.

However, I am still learning, which is why I love my job, because you're never done learning. This blog post gave me some more direction towards the things I think I should dive in deeper.

For example, ... ... ... I won't promise I'll write a blog post about that, but it surely is a great way to learn new things and point myself into a direction becoming an even better developer, and having even more fun.

---

- Gave boeken/videos: Head First OOP, Composition JS Eric Elliott, talks Scott Wlaschin.
- State, hoe is dit anders tussen OOP en FP: aparte blog post? Rene zegt dat BL pure moet zijn en de datalaag state moet hebben toch?
- Boek Eric Elliott: Wat zijn onderwerpen die ik nog moet bekijken?
- Composition! Lijkt heel erg op de stap van inheritance naar composition.
- Imperative/declarative geldt ook voor beide toch?
- Ik kan me herinneren dat ik review commentaar kreeg op mijn code die niet echt OOP was. Heb ik dat nu niet ook met FP? Oftewel:
- Ook al ken je alle patterns, hoe architectureer je code in een echte FP app? Stephan Meijer weet dit wel denk ik.
-
