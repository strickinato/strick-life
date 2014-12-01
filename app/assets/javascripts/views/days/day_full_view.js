StrickLife.Views.DayFullView = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.year = options.year
    this.month = options.month
    this.day = options.day

    this.listenTo(this.collection, "sync", this.filterCollection);
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

  filterCollection: function() {
    var allPosts = this.collection.toHash()
    debugger
    this.collection = allPosts[this.year][this.month][this.day]
    this.render();
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
