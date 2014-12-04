StrickLife.Views.PostFullView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST["posts/post_full"],

  className: "post-full",

  render: function(){
    var content = this.template({
      post_id: this.model.get('id'),
      text: this.model.escape('body')
    });
    this.$el.html(content)

    return this;
  },
});
