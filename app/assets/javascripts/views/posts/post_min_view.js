StrickLife.Views.PostMinView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click .post-min-tags li": "goToTag();"
  },

  shortenText: function(){
    if( this.model.get("body").length > 160 ) {
      return this.model.escape("body").slice(0,160) + "..."
    } else {
      return this.model.escape("body");
    }
  },


  template: JST["posts/post_min"],

  className: "post-min clearfix",

  render: function(){
    this.text = this.shortenText()
    var content = this.template({
      post: this.model,
      text: this.text
    });
    this.$el.html(content)

    return this;
  },

  goToTag: function(){
    alert('hi')
  },
});
