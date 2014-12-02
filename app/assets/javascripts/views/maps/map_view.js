StrickLife.Views.MapView = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.initMap)
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
    this.map = new google.maps.Map(mapSpot, mapProp);
    this.addMarkers();
  },

  addMarkers: function() {

    var markers = [];
    _.each(this.collection.models, function(model){
      var latLng = new google.maps.LatLng(model.get("latitude"), model.get("longitude"))
      var marker = new google.maps.Marker({'position': latLng});
      markers.push(marker);
    });
    debugger
    var markerCluster = new MarkerClusterer(this.map, markers)

  },

});
