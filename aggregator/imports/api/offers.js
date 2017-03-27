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
