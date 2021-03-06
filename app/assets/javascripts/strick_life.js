window.StrickLife = {
  MonthNames: {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
  },
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    StrickLife.posts = new StrickLife.Collections.Posts();
    StrickLife.posts.fetch();

    StrickLife.tags = new StrickLife.Collections.Tags();
    StrickLife.tags.fetch();

    StrickLife.visitedIndex = false;
    StrickLife.visitedNew = false;


    this.consoleLogHello();
    this.getLocationData();

    new StrickLife.Routers.AppRouter({
      $rootEl: $("#main")
    });

    Backbone.history.start();
  },

  getLocationData: function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        var geocoder = new google.maps.Geocoder();
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        geocoder.geocode({'latLng': latLng}, function(results, status){
          var place = results[0];
          StrickLife.currentAddress = place.formatted_address;
          StrickLife.currentCoords = place.geometry.location;
          StrickLife.currentPlaceId = place.place_id;
          $("#current-location-view").trigger("locationLoad")
        })
      });
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  },

  consoleLogHello: function() {
    console.log("Hi, welcome to StrickLife. I'm glad to see you're checking under the hood. Just thought I'd mention that I'm currently looking for a job as a developer. Shoot me an email at aaronstrick@gmail.com if you're hiring!")
  }

};


$(document).ready(function(){
  if(StrickLife.currentUser !== undefined) {
    StrickLife.initialize();
  }
});
