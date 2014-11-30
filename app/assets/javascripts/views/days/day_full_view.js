StrickLife.Views.DayFullView = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.year = options.year
    this.month = options.month
    this.day = options.day

    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["days/day_full"],

  className: "row",

  render: function(){
    this.generatePostViews();
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  generatePostViews: function() {
    var thisView = this;
    _.each(this.collection.models, function(model){
      var postView = new StrickLife.Views.PostFullView({
        model: model
      });
      thisView.addSubview(".full-day-post-container", postView)
    })
  },
});
