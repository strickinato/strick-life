window.StrickLife = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    StrickLife.posts = new StrickLife.Collections.Posts();
    StrickLife.posts.fetch();

    new StrickLife.Routers.AppRouter({
      $rootEl: $("#main")
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  StrickLife.initialize();
});
