StrickLife.Views.SingleTagItem = Backbone.View.extend({
  initialize: function(options){
    this.parentView = options.parentView
  },


  events: {
    "click": "removeThisSubview"
  },

  removeThisSubview: function(){
    this.parentView.removeSubview("#current-tags-view", this)
  },

  template: JST["tags/single_tag_item"],

  className: "single-tag-item",

  tagName: "li",

  render: function(){
    var content = this.template({
      tag: this.model
    });
    this.$el.html(content)

    return this;
  },
});
