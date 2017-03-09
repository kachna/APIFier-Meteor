---
date: 2017-03-09
title: How to Simple Meteor Application
layout: post
---

### Meteor

#### Optimistic UI
Optimistic UI is concept where front-end do not wait for result from back-end and try to calculate it by itself. Mostly the front-end's result is right and when back-end send its result finally, nothing will happen because every is already done. If the result is differs front-end simply change it.

For example (from [UX Planet](https://uxplanet.org/optimistic-1000-34d9eefe4c05)) modern mobile communicator application using Optimistic UI concept. When user sends the message application display it as send and append small sign that something is happening on background. UI is not blocked and user can prepare another message. If first message is delivered back-end inform front-end (the mobile application) and the sign disappears. If delivery was unsuccessful sign can change to exclamation mark sign and user knows that there were problem.

![Working... overlay](https://cdn-images-1.medium.com/max/600/1*N5tK8JB0MmRb04ONghE5mg.gif)
![Optimitic UI](https://cdn-images-1.medium.com/max/600/1*KE0p_NCjeeV0Sk9ZAIuE8g.gif)

What is most exciting on Optimistic UI is form fillings. Remember the corporates software usually based on some Java application servers where you fill a field and have to wait until server confirm, that field is filled right and value properly saved and after all of that than you can change another field? So much pain! Optimistic UI do not block anything. It sends changes to back-end as you do them. If server's result differs from front-end's one or it is not confirmed (delivered, saved) UI just warn the user to solve that somehow. No more waiting!

Meteor has advantage in using Optimistic UI because it has back-end and front-end written in JavaScript. So *the code* (for validation of input or calculation of something and so) is written once and it runs on server and on client too. So the server and client calculate the result same way only available data (server has direst access to database) differs. This *once written code* connected with identical *calculation sequence* saves time and lot of stress.
