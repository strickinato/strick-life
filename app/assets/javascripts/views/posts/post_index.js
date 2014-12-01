StrickLife.Views.PostsIndex = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["posts/index"],

  className: "post-area",

  render: function(){
    this.renderContextMenu();

    this.inputMonthViews();
    var content = this.template({
      posts: this.collection
    });
    this.$el.html(content)

    this.attachSubviews();
    $(".sticky-month-header").stick_in_parent({
      offset_top: 50,
      spacer: false
    })

    return this;
  },

  renderContextMenu: function() {
    $('#navbar-context-el').html("")
  },

  inputMonthViews: function(){
    var thisView = this;
    var allPosts = StrickLife.posts.toHash();
    var years = _.keys(allPosts).sort();

    for(var i = 0; i < years.length; i++){
      var year = years[i];
      var months = _.keys(allPosts[year]).sort();

      for(var j = 0; j < months.length; j++){
        var month = months[j]

        var monthView = new StrickLife.Views.MonthView({
          month: month,
          year: year,
          postsThisMonth: allPosts[year][month]
        });
        thisView.addSubview("#all-the-posts", monthView)
      }
    }
  },
});
