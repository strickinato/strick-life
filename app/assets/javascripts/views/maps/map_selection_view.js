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
    "locationLoad #current-location-view": "insertCurrentLocation"
  },

  getAddress: function() {
    if (this.currentAddress !== undefined) {
      console.log(this.currentAddress)
      return this.currentAddress
    } else if (StrickLife.currentAddress) {
      console.log("StrickLife.current")
      return StrickLife.currentAddress
      this.postAddress = StrickLife.currentAddress
    } else {
      return "loading address..."
    };
  },

  insertCurrentLocation: function() {
    var address = this.getAddress()
    console.log(address)
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

  getLocationData: function(formData){
    formData.post.location_data = {};
    formData.post.location_data.latitude = this.currentCoords.lat()
    formData.post.location_data.longitude = this.currentCoords.lng()
    formData.post.location_data.address = this.currentAddress
    formData.post.location_data.place_id = this.currentPlaceId

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
      console.log(place)
      $("#current-location-view").trigger("locationLoad")
    });
  },

});
