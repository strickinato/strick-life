window.StrickLife = {
  MonthNames: {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
  },
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

    var nav = $("#contextual-navbar")
    var view = new StrickLife.Views.ContextNavBar({
      $el: nav
    });
    view.render().$el;
    Backbone.history.start();
  }
};

$(document).ready(function(){
  StrickLife.initialize();
});
