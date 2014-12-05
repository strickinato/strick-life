StrickLife.Views.PostFullView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST["posts/post_full"],

  className: "post-full clearfix",

  events: {
    "click" : "togglePhoto"
  },

  togglePhoto: function() {
    if (!this._photo) {
      this.$el.css("background-image", "url(" + this.model.get("picture_url") + ")")
      this._photo = true;
    } else {
      this.$el.css("background-image", "url('http://icons.iconarchive.com/icons/designcontest/outline/256/Camera-icon.png')")
      this._photo = false;
    }

  },

  render: function(){
    var content = this.template({
      post: this.model
    });
    if(this.model.get("picture_url")) {
      this.$el.css("background-image", "url('http://icons.iconarchive.com/icons/designcontest/outline/256/Camera-icon.png')")
    }
    this.$el.html(content)

    return this;
  },
});
