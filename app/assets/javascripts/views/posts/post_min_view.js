StrickLife.Views.PostMinView = Backbone.View.extend({
  initialize: function(){
    this.shortenedBody = this.model.escape("body").slice(0,140)
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST["posts/post_min"],

  className: "post-min",

  render: function(){
    var content = this.template({
      post: this.model,
      text: this.shortenedBody
    });
    this.$el.html(content)

    return this;
  },
});
