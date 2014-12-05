StrickLife.Views.PostFullView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST["posts/post_full"],

  className: "post-full",

  render: function(){
    var content = this.template({
      post: this.model
    });
    this.$el.html(content)

    return this;
  },
});
