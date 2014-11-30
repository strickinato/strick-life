StrickLife.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl
  },

  routes: {
    "":"index",
    "posts/new": "new",
    "date/:year/:month/:day" : "singleDay"
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



  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el)
    this._currentView = view;
  },
})
