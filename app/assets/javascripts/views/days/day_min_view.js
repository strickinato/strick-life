StrickLife.Views.DayMinView = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.year = options.year;
    this.month = options.month;
    this.day = options.day;
    this.date = this.year + "-" + this.month +"-"+ this.day

    this.generatePostViews();
  },

  template: JST["days/day_min"],

  className: "row",

  render: function(){
    var content = this.template({
      day: this.day
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  events: {
    "click .post-min" : "goToDay"
  },

  goToDay: function(event){
    var linkString = "date/" +
    this.year + "/" +
    (0 + this.month).slice(-2) + "/" +
    (0 + this.day).slice(-2)
    
    Backbone.history.navigate(linkString, {trigger: true})
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
