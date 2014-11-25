StrickLife.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl
  },

  routes: {
    "":"index"
  },

  index: function() {
    var view = new StrickLife.Views.PostsIndex({
      collection: StrickLife.posts
    });

    this._swapView(view)
  },


  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el)
    this._currentView = view;
  },
})
