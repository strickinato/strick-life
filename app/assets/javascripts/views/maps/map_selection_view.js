StrickLife.Views.MapSelectionView = Backbone.View.extend({

  template: JST["maps/map_selection"],

  render: function(){
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  createAutocomplete: function() {
    var input = document.getElementById("map-search-box")
    var autocomplete = new google.maps.places.Autocomplete(input);


    google.maps.event.addListener(autocomplete, 'place_changed', function(location) {
      var place = autocomplete.getPlace();
      StrickLife.currentAddress = place.formatted_address;
      StrickLife.currentCoords = place.geometry.location;
      StrickLife.currentPlaceId = place.place_id;
    });
  },


  createPopover: function() {
    //
    // var tmp = $.fn.popover.Constructor.prototype.show;
    // $.fn.popover.Constructor.prototype.show = function () {
    //   tmp.call(this);
    //   if (this.options.callback) {
    //     this.options.callback();
    //   }
    // };

    var mapView = this;
    $('#map-selection-icon').popover({
      content: function() {
        return $("#location-expanded-view").html()
      }
    });
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
