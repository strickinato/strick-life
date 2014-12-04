StrickLife.Views.MapSelectionView = Backbone.View.extend({
  initialize: function(options) {
    this.postLocation = options.postLocation
    if(!!this.postLocation) {
      this.postAddress = this.postLocation.address
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

  insertCurrentLocation: function() {
    var address
    if(!!this.postAddress) {
      address = this.postAddress
    } else if (!!StrickLife.currentAddress) {
      address = StrickLife.currentAddress
      this.postAddress = StrickLife.currentAddress
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

    google.maps.event.addListener(autocomplete, 'place_changed', function(location) {
      var place = autocomplete.getPlace();
      this.currentAddress = place.formatted_address;
      this.currentCoords = place.geometry.location;
      this.currentPlaceId = place.place_id;
      $("#current-location-view").trigger("locationLoad")
    });
  },

});
