StrickLife.Views.MapSelectionView = Backbone.View.extend({
  initialize: function() {
  },

  template: JST["maps/map_selection"],

  render: function(){
    var content = this.template();
    this.insertCurrentLocation();
    this.$el.html(content);

    return this;
  },

  events: {
    "click #map-selection-icon" : "togglePopover",
    "locationLoad #current-location-view": "insertCurrentLocation"
  },

  insertCurrentLocation: function() {
    var address
    if (StrickLife.currentAddress !== undefined ) {
      address = StrickLife.currentAddress
    } else {
      address = "loading address..."
    };
    setTimeout(function(){
      $("#current-location-view").html(address)
    }.bind(this),0)
  },

  togglePopover: function(event){
    $(event.currentTarget).toggleClass("selected")
    $("#location-expanded-view").toggle();
  },

  createAutocomplete: function() {
    var input = document.getElementById("map-search-box")
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function(location) {
      var place = autocomplete.getPlace();
      StrickLife.currentAddress = place.formatted_address;
      StrickLife.currentCoords = place.geometry.location;
      StrickLife.currentPlaceId = place.place_id;
      $("#current-location-view").trigger("locationLoad")
    });
  },


});
