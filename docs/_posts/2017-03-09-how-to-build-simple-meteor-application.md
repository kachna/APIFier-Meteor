---
date: 2017-03-12
title: How to Simple Meteor Application
layout: post
---

### Meteor features
[Meteor](http://www.meteor.com) is full stack JavaScript framework for rapid development of modern web applications. Thanks to [Cordova](https://cordova.apache.org/) integration can be Meteor web application easily turned into multi-platform mobile application too. Using Meteor framework only by JavaScript only once written code  powerful interactive web and mobile applications can be build.


With back-end build on [Node.js](https://nodejs.org/en/) Meteor can share same code between back-end and front-end. Execution same code on both sites cause same state of environment at same time. End's are synchronized over [DDP](https://github.com/meteor/meteor/blob/master/packages/ddp/DDP.md) protocol. Meteor supports only MongoDB as data storage. MongoDB is so called [noSQL](https://en.wikipedia.org/wiki/NoSQL) document database. In this type of database entity data are sored in documents made by key-value pairs which can be nested. If you are traditional supporter of good old SQL it is time to change way of thinking. If you have no idea what SQL is it's your advantage now.

#### Optimistic UI
Optimistic UI is concept where front-end do not wait for result from back-end and try to calculate it by itself. Mostly the front-end's result is right and when back-end send its result finally, nothing will happen because everything is done already. If the result is differs front-end simply change it.

Optimistic UI fight against overlays with spinners. For example (from [UX Planet](https://uxplanet.org/optimistic-1000-34d9eefe4c05)) modern mobile communicator application using Optimistic UI concept. When user sends the message application display it as send and append small sign that something is happening on background. UI is not blocked and user can prepare another message. If first message is delivered back-end inform front-end (the mobile application) and the sign disappears. If delivery was unsuccessful sign can change to exclamation mark sign and user knows that there were problem.

![Working... overlay](https://cdn-images-1.medium.com/max/600/1*N5tK8JB0MmRb04ONghE5mg.gif)
![Optimitic UI](https://cdn-images-1.medium.com/max/600/1*KE0p_NCjeeV0Sk9ZAIuE8g.gif)

What is most exciting on Optimistic UI is form fillings. Remember the corporates software usually based on some Java application servers where you fill a field and have to wait until server confirm, that field is filled right and value properly saved and after all of that than you can change another field? So much pain! Optimistic UI do not block anything. It sends changes to back-end as you do them. If server's result differs from front-end's one or it is not confirmed (delivered, saved) UI just warn the user to solve that somehow. No more waiting!

Meteor has advantage in using Optimistic UI because it has back-end and front-end written in JavaScript. The *code* (for validation of input or calculation of something and so) is written once and it runs on server and on client too. So the server and client calculate the result same way only available data (server has direst access to database) differs. This *once written code* connected with identical *calculation sequence* saves time and lot of stress.


### Meteor tutorial

Before building any project in Meteor it is good to start with their [step by step tutorial](https://www.meteor.com/tutorials/blaze/creating-an-app). It describes all basic concepts and framework's structure on simple TODOs application. Tutorial provide all necessary information for future work.

### Building the Aggregator

Back to code. Because you finished simple [TODOs tutorial](https://www.meteor.com/tutorials/blaze/creating-an-app) you should have everything ready for work. If you did somehow skip it jump to [Quick start](https://guide.meteor.com/#quickstart) section of [Meteor Guide](https://guide.meteor.com/) (another great source). Now you are ready to create application:

    meteor create aggregator

Some Meteor's npm package downloading fallows. [npm](https://www.npmjs.com/) (Node.js package manager) is JavaScript package manager for organizing and distributing code. When application is created Meteor should suggests to you:

    To run your new app:                          
      cd aggregator                               
      meteor npm install                          
      meteor  

So fallow the lead. After all that open your favorite web browser and visit

    http://localhost:3000/

![Meteor fresh new applicaiton screen]({{ site.github.url }}/assets/img/screenshots/meteor-welcome.jpg)    
