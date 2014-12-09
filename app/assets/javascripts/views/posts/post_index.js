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
      }
    });
    tour.addStep('welcome-info', {
      title: "Welcome To StrickLife",
      text: 'StrickLife remembers your whole life. Click continue to learn how it works.',
      buttons: [
      {
        text: 'Skip Tour',
        action: tour.cancel
      },
      {
        text: 'Continue',
        action: tour.next
      }
      ]
    });
tour.addStep('new-post-info', {
      text: 'Whenever you experience an important life event, add a post.',
      attachTo: '#side-add-new-post right',
      buttons: [
      {
        text: 'End Tour',
        action: tour.cancel
      },
      {
        text: 'Next',
        action: tour.next
      }
      ]
    });
    tour.addStep('index-info', {
      text: 'You can always return to your posts here.',
      attachTo: '#side-see-all-posts right',
      buttons: [
      {
        text: 'End Tour',
        action: tour.cancel
      },
      {
        text: 'Next',
        action: tour.next
      }
      ]
    });
    tour.addStep('map-info', {
      text: 'StrickLife organize your posts by location',
      attachTo: '#side-see-the-map right',
      buttons: [
      {
        text: 'End Tour',
        action: tour.cancel
      },
      {
        text: 'Next',
        action: tour.next
      }
      ]
    });
    tour.addStep('calendar-info', {
      text: '...or, see a calendar of everything you\'ve done!',
      attachTo: '#side-see-the-calendar right',
      buttons: [
      {
        text: 'End Tour',
        action: tour.cancel
      },
      {
        text: 'Get Started',
        action: tour.next
      }
      ]
    });

    tour.start();
  },
});
