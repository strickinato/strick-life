StrickLife.Views.DayMinView = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.date = options.date;
    this.dateString = options.dateString;
    this.day = this.date.slice(8);
    this.generatePostViews();
  },

  template: JST["days/day_min"],

  className: "row",

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  generatePostViews: function() {
    var thisView = this;
    _.each(this.collection.models, function(model){
      var postView = new StrickLife.Views.PostMinView({
        model: model
      });
      thisView.addSubview(".day-post-container", postView)
    })
  },
});
