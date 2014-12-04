StrickLife.Views.MapSelectionView = Backbone.View.extend({
  initialize: function(options) {
    this.postLocation = options.postLocation

  },

  template: JST["maps/map_selection"],

  render: function(){
    var content = this.template();

    this.insertCurrentLocation();

    this.$el.html(content);

    return this;
  },

  className: "nav-form-item",

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
    var open = $(event.currentTarget).hasClass("selected");
    $(".nav-form-item a").each(function(item){
      $(this).removeClass("selected");
    });
    $(".expanded-view").each(function(item){
      $(this).hide();
    });
    if (!open) {
      $(event.currentTarget).addClass("selected")
      $("#location-expanded-view").show();
    }
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
