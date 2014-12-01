StrickLife.Views.MapSelectionView = Backbone.View.extend({
  initialize: function(options) {
  },

  template: JST["maps/map_selection"],

  render: function(){
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  initMap: function() {
    var mapProp = {
      zoom:5,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    var mapSpot = document.getElementById("selection_gmap")
    var map = new google.maps.Map(mapSpot, mapProp);
  }

});
