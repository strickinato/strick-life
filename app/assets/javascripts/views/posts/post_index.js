StrickLife.Views.PostsIndex = Backbone.CompositeView.extend({
  initialize: function(options){
    this.listenTo(this.collection, "sync", this.render);

    this.addTour();
  },

  template: JST["posts/index"],

  className: "post-area",

  render: function(){
    this.inputMonthViews();
    var content = this.template({
      posts: this.collection
    });
    this.$el.html(content)
    this.attachSubviews();
    this.makeItSticky();

    return this;
  },

  inputMonthViews: function(){
    var thisView = this;
    var allPosts = this.collection.toHash();
    var years = _.keys(allPosts).sort(function(a, b){
      return parseInt(a) - parseInt(b);
    });

    for(var i = 0; i < years.length; i++){
      var year = years[i];
      var months = _.keys(allPosts[year]).sort(function(a, b){
        return parseInt(a) - parseInt(b);
      });


      for(var j = 0; j < months.length; j++){
        var month = months[j]

        var monthView = new StrickLife.Views.MonthView({
          month: month,
          year: year,
          postsThisMonth: allPosts[year][month]
        });
        thisView.addSubview("#all-the-posts", monthView)
      }
    }
  },

  makeItSticky: function() {

    $(".sticky-month-header").stick_in_parent({
      offset_top: 50,
    });
  },

  addTour: function(){
    var tour;

    tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows',
        scrollTo: true
      }
    });

    tour.addStep('first-step', {
      text: 'This step is attached to the right of the <code>.example-css-selector</code> element.',
      attachTo: '#side-add-new-post right',
      buttons: [
      {
        text: 'Next',
        action: tour.next
      }
      ]
    });

    tour.start();
  },
});
