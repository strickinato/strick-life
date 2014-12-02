StrickLife.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl
  },

  routes: {
    "":"index",
    "posts/new": "new",
    "date/:year/:month/:day" : "singleDay",
    "posts/:id/edit" : "edit",
    "map":"map"
  },

  index: function() {
    var view = new StrickLife.Views.PostsIndex({
      collection: StrickLife.posts
    });

    this._swapView(view)
  },

  new: function() {
    var post = new StrickLife.Models.Post();
    var view = new StrickLife.Views.PostsForm({
      model: post,
      collection: StrickLife.posts
    });

    this._swapView(view);
  },

  singleDay: function(year, month, day) {
    var view = new StrickLife.Views.DayFullView({
      collection: StrickLife.posts,
      year: year,
      month: month,
      day: day
    });

    this._swapView(view)
  },

  edit: function(id){
    var post = StrickLife.posts.get(id)
    var view = new StrickLife.Views.PostsForm({
      model: post,
      collection: StrickLife.posts
    });

    this._swapView(view)
  },

  map: function(){
    var locations = new StrickLife.Collections.Locations();
    locations.fetch();
    var view = new StrickLife.Views.MapView({
      collection: locations
    });
    this._swapView(view)

    google.maps.event.trigger(view.map, 'resize');
    view.map.setCenter( view.lastCenter );

  },


  _swapView: function(view) {
    var nav = $("#contextual-navbar")
    StrickLife.navView = new StrickLife.Views.ContextNavBar({
      $el: nav
    });
    StrickLife.navView.render().$el;

    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el)
    this._currentView = view;
  },
})
