StrickLife.Views.MapSelectionView = Backbone.View.extend({
  initialize: function(options) {
    this.postLocation = options.postLocation
    if(!!this.postLocation) {
      this.currentAddress = this.postLocation.address
    }

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
    "locationLoad #current-location-view": "setLocationData",
    "placesPicked #current-location-view": "insertCurrentLocation"
  },

  getAddress: function() {
    if (this.currentAddress !== undefined) {
      return this.currentAddress
    } else if (StrickLife.currentAddress) {
      this.setLocationData()
      return StrickLife.currentAddress
      this.postAddress = StrickLife.currentAddress
    } else {
      return "loading address..."
    };
  },

  insertCurrentLocation: function() {
    var address = this.getAddress()
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
      $(this).slideUp(100);
    });
    if (!open) {
      $(event.currentTarget).addClass("selected")
      $("#location-expanded-view").slideDown(100);
    }
  },

  setLocationData: function(){
    this.currentLat = StrickLife.currentCoords.lat();
    this.currentLng = StrickLife.currentCoords.lng();
    this.currentAddress = StrickLife.currentAddress;
    this.currentPlaceId = StrickLife.currentPlaceId;
    this.insertCurrentLocation();
  },

  getLocationData: function(formData){
    formData.post.location_data = {};
    formData.post.location_data.latitude = this.currentLat;
    formData.post.location_data.longitude = this.currentLng;
    formData.post.location_data.address = this.currentAddress;
    formData.post.location_data.place_id = this.currentPlaceId;

    return formData;
  },

  createAutocomplete: function() {
    var input = document.getElementById("map-search-box")
    var autocomplete = new google.maps.places.Autocomplete(input);
    var view = this

    google.maps.event.addListener(autocomplete, 'place_changed', function(location) {
      var place = autocomplete.getPlace();
      view.currentAddress = place.formatted_address;
      view.currentCoords = place.geometry.location;
      view.currentPlaceId = place.place_id;
      $("#current-location-view").trigger("placesPicked")
    });
  },

});
