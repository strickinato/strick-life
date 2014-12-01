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
    this.filterCollection();
    this.generatePostViews();
    this.injectDateIntoNav();

    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  filterCollection: function() {
    if(this.collection.length > 0) {
      var allPosts = this.collection.toHash()
      this.collection = allPosts[this.year][this.month][this.day]
    }
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

  injectDateIntoNav: function(){
    //To be turned into a view
    var dateString = "<p class='navbar-text'>" + this.year + "/" + this.month + "/" + this.day + "</p>";
    $('#context-nav-el').html(dateString);
  }

});
