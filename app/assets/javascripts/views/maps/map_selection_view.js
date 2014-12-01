StrickLife.Views.MapSelectionView = Backbone.View.extend({
  initialize: function(options) {
  },

  template: JST["maps/map_selection"],

  events: {
  },

  render: function(){
    var content = this.template();

    this.$el.html(content);
    return this;
  },

  createPopover: function() {
    $('#map-selection-icon').editable({
      type:'text',
      title: 'Enter Location'
    })
  },

  createAutocomplete: function() {
    var input = document.getElementById("map-search-box")
    debugger
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      alert('yay');
    });
  }



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
