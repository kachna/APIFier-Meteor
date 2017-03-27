import { Template } from 'meteor/templating';

// import object representing offers collcetion
import { Offers } from '../api/offers.js';

//import HTML part of template
import './listing.html';

// wehen templeate is created subscripte for data from offers collction
Template.listing.onCreated(function bodyOnCreated() {
  Meteor.subscribe('offers');
});

Template.listing.helpers({
  // helper to access data from offers collcetion
  offers: function() {
    return Offers.find({})
  }
})
