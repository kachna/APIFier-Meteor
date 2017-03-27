---
date: 2017-03-27
title: How to Build Simple Meteor Application
layout: post
---

### Meteor features
[Meteor](http://www.meteor.com) is full stack JavaScript framework for rapid development of modern web applications.

#### JavaSctipt only
Wit back-end build on [Node.js](https://nodejs.org/en/) Meteor can share same code between back-end and front-end. End's are synchronized over [DDP](https://github.com/meteor/meteor/blob/master/packages/ddp/DDP.md) protocol. Execution of identical code on both sites cause same state of environment at same time.

#### MongoDB
Meteor supports only MongoDB as data storage. MongoDB is so called [noSQL](https://en.wikipedia.org/wiki/NoSQL) document database. In this type of database data are sored in documents made by key-value pairs which can be nested. If you are traditional supporter of good old SQL it is time to change way of thinking. If you have no idea what [SQL](https://www.w3schools.com/sql/sql_intro.asp) it's your advantage now.

#### Optimistic UI
Optimistic UI is concept where front-end do not wait for result from back-end and try to calculate it by itself. Mostly the front-end's result is right and when back-end send its result finally, nothing will happen because everything is done already. If the result is differs front-end simply change it.

Optimistic UI fight against overlays, spinners and freezies of UI. For example (from [UX Planet](https://uxplanet.org/optimistic-1000-34d9eefe4c05)) modern mobile communicator application using Optimistic UI concept. When user sends the message application display it as send and append small sign that something is happening on background. UI is not blocked and user can prepare another message. If first message is delivered back-end inform front-end (the mobile application) and the sign disappears. If delivery was unsuccessful sign can change to exclamation mark sign and user knows that there were problem.

![Working... overlay](https://cdn-images-1.medium.com/max/600/1*N5tK8JB0MmRb04ONghE5mg.gif)
![Optimitic UI](https://cdn-images-1.medium.com/max/600/1*KE0p_NCjeeV0Sk9ZAIuE8g.gif)

What is most exciting on Optimistic UI is form fillings. Remember the corporates software usually based on some Java application servers where you fill a field and have to wait until server confirm, that field is filled right and value properly saved and after all of that, than you can change another field? So much waiting, so much pain! Optimistic

UI do not block anything. It is sending changes to back-end as you do them, calculates result on front-end too (e-mail validation, phone number, ...) and displaying results as done. If server's result differs from front-end's one or it is not confirmed (delivered, saved) UI just warn the user to solve that situation somehow (message, sign, change of background color of field, ...). No more waiting!

Meteor has advantage in using Optimistic UI because it has back-end and front-end written in JavaScript. The *code* (for validation of input or calculation of something and so on) is written once and it runs on server and on client too. So the server and client calculate the result same way. Only available data (server has direct access to database) differs. This *once written code* connected with identical *calculation environment* saves lot of time, lot of asynchronous debugging and lot of stress.

#### Cordova
[Cordova](https://cordova.apache.org/) integration easily turns any Meteor application into multi-platform mobile application. Using Meteor framework only by JavaScript, only by once written code powerful interactive web and mobile applications can by build. OK, some HTML and CCS also needed.


### Meteor tutorial

Before building any project in Meteor it is good to start with their [step by step tutorial](https://www.meteor.com/tutorials/blaze/creating-an-app). It describes all basic concepts and framework's structure on simple TODOs application. Tutorial provide all necessary information for future work.

### Basics

#### Create and Run Application
If you have finished simple [TODOs tutorial](https://www.meteor.com/tutorials/blaze/creating-an-app) you should have everything ready for work. If you did somehow skip it, jump to [Quick start](https://guide.meteor.com/#quickstart) section of [Meteor Guide](https://guide.meteor.com/) (another great source). Now you are ready to create application:

    $ meteor create aggregator

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

#### Meteor's MongoDB
Start Meteor again. In project folder run command:

    $ meteor

During *meteor* server run you can access to Meteor's internal MongoDB database. From another console (command line window or shell or whatever) run in home application folder:

    $ meteor mongo

It start MongoDB interactive shell where you can manage you project internal database. The data itself are stored in

    .meteor/local/db

You can also use external graphical tool like [Robomongo](https://robomongo.org/) to manage projects internal database. To see MongoDB connection string use:

    $ meteor mongo --url

#### Import Crawled Data

Now you are able to handle project database. Time to import date crawled by [Currys TVs crawler](./easy-crawler-using-APIFier). Prepare your simplified JSON results file (APIFier account -> Crawlers -> Currys TVs -> View runs -> *choose successful run* -> Simple JSON) and import data to DB using [*mongoimport* tool](https://docs.mongodb.com/manual/reference/program/mongoimport/) (remember - meteor server is still running):  

    $ mongoimport -h localhost:3001 --db meteor --collection offers --jsonArray --file /path/to/currys_result.json

The result can be checked in Robomongo or in *meteor mongo* shell by command:

    meteor:PRIMARY> db.offers.find({})

If everything is fine result of this command shows you all offers crawled by [Currys TVs crawler](./easy-crawler-using-APIFier).

### Project File Structure
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

### Building Aggregator Application

#### Collections
Back to code. Fallowing previous [Project File Structure](#project-file-structure) chapter create new file:

    imports/api/offers.js

In file define interface to all aggregated offers in DB.

{% highlight javascript linenos %}

// import Meteor's Mongo Collection interface package
import { Mongo } from 'meteor/mongo';

// export offers collcetion to be able to import it in other files
export const Offers = new Mongo.Collection('offers');

// on server-side enable data from offers collecion for client-side
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('offers', function offersPublication() {
    return Offers.find({});
  });
}

{% endhighlight %}

#### Listing template
Application can access data. Next step is display data to user. Create file and write [Blaze]() template into it:

    imports/api/listing.js

    {% highlight javascript linenos %}

    import { Template } from 'meteor/templating';

    // import object representing offers collection
    import { Offers } from '../api/offers.js';

    //import HTML part of template
    import './listing.html';

    // wehen templeate is created subscribte for data from offers collection
    Template.listing.onCreated(function bodyOnCreated() {
      Meteor.subscribe('offers');
    });

    Template.listing.helpers({
      // helper to access data from offers collection
      offers: function() {
        return Offers.find({})
      }
    })

    {% endhighlight %}

Also append HTML part of template.

    imports/api/listing.html

    {% highlight handlebars linenos %}

    <template name="listing">
      <ul>
        {{#each offers}}
          {{> offer}}
        {{/each}}
      </ul>
    </template>

    <template name="offer">
      <li>
        <div>
          <a href="{{url}}">{{ type }}</a>
        </div>
      </li>
    </template>

    {% endhighlight %}

#### Import to Client and server
Because Meteor runs only code in *client* and *server* folder you wrote code which is never run. To force application work you have to first **import offers collection to server** to publish data from DB for clients second **display listing template to user**, which means create layout, import listing template to client folder and put it into layout.

    server/main.js

    {% highlight javascript linenos %}

    // import object representing offers collection
    import { Offers } from '../api/offers.js';

    {% endhighlight %}    


    client/main.js

    {% highlight javascript linenos %}

    // import listing template
    import '../imports/ui/listing.js';

    {% endhighlight %}    


    client/main.js

    {% highlight handlebars linenos %}

    <head>
      <title>LCD TVs Offer Aggregator</title>
    </head>

    <body>
      <header>
        <h1>LCD TVs Offer Aggregator</h1>
      </header>

      {{> listing}}

    </body>

    {% endhighlight %}    

#### List of all offers
Now go back to your browser and watch

    http://localhost:3000/

If everything works no restart should be needed and you can watch your crawled ([previously imported](#import-crawled-data)) data. If there is problem you should get infromation about it in browser or in console (where *$ meteor* is running).

![Aggregator application - List of all offers]({{ site.github.url }}/assets/img/screenshots/aggregator-offers-listing.jpg)    
