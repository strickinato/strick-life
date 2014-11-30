StrickLife.Views.MonthView = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.dateString = options.dateString;
  },

  template: JST["months/month"],

  className: "single-month-view",

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
