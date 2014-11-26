StrickLife.Views.PostsIndex = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.collection, "sync", this.render)
    this.listenTo(this.collection, "sync", this.generateContent)
  },

  template: JST["posts/index"],

  render: function(){
    var content = this.template({
      posts: this.collection
    });
    this.$el.html(content)

    return this;
  },

  generateContent: function() {
    var allPosts = StrickLife.posts.toHash();
    var years = _.keys(allPosts).sort();

    for(var i = 0; i < years.length; i++){
      var months = _.keys(allPosts[years[i]]).sort();
      for(var j = 0; j < months.length; j++){
        var DateString = StrickLife.MonthNames[months[j]];
        DateString += " ";
        DateString += years[i];
        console.log(DateString)
      }
    }
  },


});
