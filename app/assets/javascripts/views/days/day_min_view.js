StrickLife.Views.DayMinView = Backbone.CompositeView.extend({
  template: JST["days/day_min"],

  render: function(){
    debugger
    var content = this.template();
    this.$el.html(content);

    return this;
  },
});
