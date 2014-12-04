StrickLife.Views.PostsIndex = Backbone.CompositeView.extend({
  initialize: function(){
    //this.filterCollection = new StrickLife.Collections.Tags();
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["posts/index"],

  className: "post-area",

  render: function(){
    this.inputMonthViews();
    var content = this.template({
      posts: this.collection
    });
    this.$el.html(content)
    this.attachSubviews();
    this.makeItSticky();

    return this;
  },

  inputMonthViews: function(){
    var thisView = this;
    var allPosts = this.collection.toHash();
    var years = _.keys(allPosts).sort(function(a, b){
      return parseInt(a) - parseInt(b);
    });

    for(var i = 0; i < years.length; i++){
      var year = years[i];
      var months = _.keys(allPosts[year]).sort(function(a, b){
        return parseInt(a) - parseInt(b);
      });


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

  makeItSticky: function() {

    $(".sticky-month-header").stick_in_parent({
      offset_top: 50,
    });


  },
});
