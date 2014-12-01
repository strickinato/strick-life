StrickLife.Views.MapSelectionView = Backbone.View.extend({
  initialize: function(options) {
    this.getLocationData();
  },

  template: JST["maps/map_selection"],

  events: {
  },

  render: function(){
    var content = this.template();

    this.$el.html(content);
    return this;
  },

  // createPopover: function() {
  //   $('#map-selection-icon').editable({
  //     type:'text',
  //     title: 'Enter Location'
  //   })
  // },

  createAutocomplete: function() {
    var input = document.getElementById("map-search-box")
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      alert('yay');
    });
  },

  getLocationData: function() {
    var x = document.getElementById("current-location-view");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  },

  showPosition: function(position) {
    alert("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);

    $("#current-location-view").html("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
  },



  // initMap: function() {
  //   var mapProp = {
  //     zoom:5,
  //     mapTypeId:google.maps.MapTypeId.ROADMAP
  //   };
  //   var mapSpot = document.getElementById("selection_gmap")
  //   var map = new google.maps.Map(mapSpot, mapProp);
  //
  // },

});
