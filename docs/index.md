---
title: How to Build Aggregator Web Appliation based on Node.js using Meteor and APIFier
layout: default
---


##  How to Build Aggregator Web Application based on Node.js using Meteor and APIFier

## About

JavaScript is here in full power and ruling the web (God save us!). Dynamic web pages are full of it and Node.js is backbone of many servers. I didn't choose it but I have to use it. It is time to stand up and face to JavaScript.

... TODO: Crawling what is it, why we need it ...

In this series of posts I want to show you how easy is built simple web application aggregating offers from many different e-commerce websites. I will use only JavaScript for coding web application and also for crawlers downloading data.

Let me introduce main tools:

## APIFier

[APIFier](http://www.apifier.com) is service providing hosted crawlers for any purposes you can imagine. Crawlers are configured via simple JavaScript function which is injected to destination page. This concept let you manipulate complete DOM, extract all data presented on the page, scroll the page, control dynamic elements, fill and send forms even login and much more. See [Example crawlers](https://www.apifier.com/) on APIFier​'s homepage.

## Meteor
[Meteor](http://www.meteor.com) is full stack JavaScript framework using [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) on back-end. It supports [Angular](https://angularjs.org/), [Blaze](http://blazejs.org/) and [React](https://facebook.github.io/react/) frameworks on front-end. Meteor's front-end adopts concept of Optimistic UI trough DDP([intro](https://meteorhacks.com/introduction-to-ddp/), [specification](https://github.com/meteor/meteor/blob/master/packages/ddp/DDP.md)) and [Minimongo](https://github.com/meteor/meteor/blob/master/packages/minimongo/README.md) to improve user experience. To make it simple as possible [Blaze](http://blazejs.org/) will be used in this tutorial because it is easy to learn and enough powerful for most web design cases.

### Table of Contents:

1. JavaScript basics
2. [How to Setup and Run Easy Crawler using APIFier](./easy-crawler-using-APIFier)
3. How to Build Simple Meteor Application
4. How to Control Crawler from Web Application
6. Meteor Application Hosting
5. More Crawlers
7. [Speedup crawler](./speedup-crawler)
