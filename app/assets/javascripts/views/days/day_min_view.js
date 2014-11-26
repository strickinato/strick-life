StrickLife.Views.DayMinView = Backbone.CompositeView.extend({
  initialize: function() {
    this.generatePostViews();
  },

  template: JST["days/day_min"],

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
