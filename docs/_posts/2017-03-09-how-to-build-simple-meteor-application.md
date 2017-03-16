---
date: 2017-03-12
title: How to Simple Meteor Application
layout: post
---

### Meteor features
[Meteor](http://www.meteor.com) is full stack JavaScript framework for rapid development of modern web applications.

#### Cordova integration
Thanks to [Cordova](https://cordova.apache.org/) integration can be Meteor web application easily turned into multi-platform mobile application too. Using Meteor framework only by JavaScript only once written code  powerful interactive web and mobile applications can be build.

### JavaSctipt only
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

As you know from [tutorial](https://www.meteor.com/tutorials/blaze/creating-an-app) new application containing some packages good for quick prototyping and cool wow effects. For building real application you need to remove them. First stop running *meteor* command and:

    $ meteor remove insecure
    $ meteor remove autopublish

### Import to MongoDB
Start Meteor again. In project folder run command:

    $ meteor

During *meteor* server run you can access to Meteor's internal MongoDB database. From another console (command line window or shell or whatever) you can run in application folder:

    $ meteor mongo

It start MongoDB interactive shell where you can manage you project internal database. The data itself are stored in

    ./.meteor/local/db

You can also use external graphical tool like [Robomongo](https://robomongo.org/) to manage projects internal database. To see MongoDB connection string use:

    $ meteor mongo --url

You are able to handle project database now. Time to import date crawled by [Currys TVs crawler](./easy-crawler-using-APIFier). Prepare your simplified JSON results file end execute (meteor server is still running):  

    mongoimport -h localhost:3001 --db meteor --collection offers --jsonArray --file /path/to/currys_result.json

The result can be checked in Robomongo or in *meteor mongo* shell by command:

    meteor:PRIMARY> db.offers.find({})

If everything is fine result of this command shows you all offers crawled by [Currys TVs crawler](./easy-crawler-using-APIFier).


### Project file structure
Next step is prepare right directory structure of project. Meteor has a system of automatic loading of JavaScript modules form directories using [ES2015](https://guide.meteor.com/structure.html#es2015-modules) module [*import* and *export*](https://guide.meteor.com/structure.html#intro-to-import-export). Detail information are in [Application Structure](https://guide.meteor.com/structure.html) -> [File Structure](https://guide.meteor.com/structure.html#javascript-structure) sub-chapter of [Meteor guide](https://guide.meteor.com/). In short:

**client/main.js** - Entry point (automatically loaded file by framework). All client code should be imported here.

**server/main.js** - Entry point (automatically loaded file by framework). All server code should be imported here.

**imports** - All application's code should be stored here. Import directory is not automatically loaded and files from it can be included to client, server or both.

**imports/api** - Good place for collections and its publications and methods handling them.

**imports/startup** - [Routes](https://guide.meteor.com/routing.html), configuration, opening connections and so on.

**imports/ui** - Right place for layouts, [reusable components](https://guide.meteor.com/ui-ux.html#components), pages and others.

**public** - Files from *public* folder are served as they are. No processing by framework. Put images, logos and another static files here.

**private** - Files from *private* are no served anywhere. They are not even accessible via import. Files in this folder can be loaded only through [Assets API](http://docs.meteor.com/api/assets.html) only.

There are more special folders but these listed are most important. All of them are listed in Meteor guide.

*server* and *client* directories including *main.js* files are already there so create missing directories.

    mkdir imports
    mkdir imports/api
    mkdir imports/startup
    mkdir imports/ui  
