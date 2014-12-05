StrickLife.Views.DayFullView = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.year = options.year
    this.month = options.month
    this.day = options.day
    this.date = this.year +"-"+ this.month +"-"+ this.day

    this.listenTo(StrickLife.posts, "sync", this.render);
    this.listenTo(StrickLife.posts, "add", this.addPost);

    this.collection.each(function(post){
      this.addPost(post)
    }.bind(this));


    this.injectDateIntoNav();
  },

  template: JST["days/day_full"],

  className: "row",

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addPost: function(model){
    if(model.get("post_date") === this.date) {
      var postView = new StrickLife.Views.PostFullView({
        model: model
      });
      this.addSubview(".full-day-post-container", postView)
    }
  },

  // generateSubviews: function(){
  //   this.collection.where({postDate: this.date}).each(function(model){
  //       this.addPost(model)
  //   }, this)
  // },
  //
  // filterCollection: function() {
  //   if(this.collection.length > 0) {
  //     var allPosts = this.collection.toHash()
  //     this.collection = allPosts[this.year][this.month][this.day]
  //   }
  // },
  //
  // generatePostViews: function() {
  //   var thisView = this;
  //   // this.collection.each(function(model))
  //   _.each(this.collection.models, function(model){
  //     var postView = new StrickLife.Views.PostFullView({
  //       model: model
  //     });
  //     thisView.addSubview(".full-day-post-container", postView)
  //   })
  // },


  injectDateIntoNav: function(){
    var dateString = "<p class='navbar-text'>" + this.year + "/" + this.month + "/" + this.day + "</p>";
    $('#context-nav-el').html(dateString);
  }

});
