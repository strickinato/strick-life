StrickLife.Views.MapView = Backbone.View.extend({
  initialize: function(options) {
  },

  template: JST["maps/map"],

  render: function(){
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  initMap: function() {
    var mapProp = {
      center:new google.maps.LatLng(37.508742,-122.120850),
      zoom:5,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    var mapSpot = document.getElementById("gmap")
    var map = new google.maps.Map(mapSpot, mapProp);
  }

});
