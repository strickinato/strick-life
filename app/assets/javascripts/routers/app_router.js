StrickLife.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl
  },

  routes: {
    "":"index",
    "posts/new": "new"
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

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var dateString = yyyy + "-" + mm + "-" + dd
    this._swapView(view)
    var datePicker = $("#form-date-picker")
    datePicker.datepicker().datepicker('setDate', new Date());


  },



  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el)
    this._currentView = view;
  },
})
