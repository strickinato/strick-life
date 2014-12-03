StrickLife.Views.SingleTagItem = Backbone.View.extend({

  template: JST["tags/single_tag_item"],

  className: "single-tag-item",

  render: function(){
    debugger
    var content = this.template({
      tag: this.model
    });
    this.$el.html(content)

    return this;
  },
});
