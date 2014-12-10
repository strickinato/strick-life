Welcome To StrickLife
======================
StrickLife is a browser based lifelogging application inspired by DayOne for OSX built on Ruby on Rails and Backbone.js

Features
---------
StrickLife allows you to create posts representing different activities you do in your life. To each post, you can add a date you did it, related tags, a photo, and a location.

Posts can then be viewed on a calendar to create a log of your life, and by location so you can always see what you did and where you did it.

Technologies
------------
StrickLife's Backend is built on Ruby on Rails. It includes a taggable table to allow for more types of tags (like friends) to be added through polymorphic associations and even a taggable concern.

Extensibility is easy, though these features have yet to be implemented.

On the front end, StrickLife is a backbone.js application. The main index page is contains 3 layered deep nested subviews in order to cluster posts by month and by day. I've opted for a custom composite view rather than using Marionette.js

StrickLife takes advantage of a few libraries to enhance functionality:
Google Maps API
Google Geocoder
MarkerClusterer
CLNDR.js
Sticky-kit
Boostrap
