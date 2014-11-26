StrickLife.Collections.Views = Backbone.CompositeView.extend({
  template: JST["days/day_min"],

  render: function(){
    var content = template();
    this.$el.html(content);

    return this;
  }
});
