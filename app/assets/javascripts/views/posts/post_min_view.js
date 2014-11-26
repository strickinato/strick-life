StrickLife.Views.PostMinView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST["posts/post_min"],

  className: "post-min",

  render: function(){
    var content = this.template({
      posts: this.collection
    });
    this.$el.html(content)

    return this;
  },
});
