StrickLife.Views.PostsIndex = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.collection, "sync", this.render)
    this.listenTo(this.collection, "add", this.addAndGroupPosts)
  },

  template: JST["posts/index"],

  render: function(){
    var content = this.template({
      posts: this.collection
    });
    this.$el.html(content)

    return this;
  },

  addAndGroupPosts: function() {
    var allPosts = StrickLife.posts.toHash();
    console.log(allPosts)
  },


});
