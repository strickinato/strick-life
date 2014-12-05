StrickLife.Views.PostFullView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST["posts/post_full"],

  className: "post-full",

  events: {

  },

  displayPhoto: function() {
    $("img").slideDown()
  },
  hidePhoto: function() {
    $("img").slideUp()
  },

  render: function(){
    var content = this.template({
      post: this.model
    });
    if(this.model.get("picture_url")) {
      this.$el.css("background-image", "url(" + this.model.get("picture_url") + ")")
    }
    this.$el.html(content)

    return this;
  },
});
