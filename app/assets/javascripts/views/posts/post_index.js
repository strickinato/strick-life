StrickLife.Views.PostsIndex = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.collection, "sync", this.render);
    //this.listenTo(this.collection, "add", this.render);
  },

  template: JST["posts/index"],

  className: "post-area",

  render: function(){
    this.generateContent();
    var content = this.template({
      posts: this.collection
    });
    this.$el.html(content)
    // if(this.subviews()["#all-the-posts"] !== undefined) {
    //   this.subviews()["#all-the-posts"].sort(
    //     function(a, b) {
    //       debugger;
    //       a = new Date(a.post_date);
    //       b = new Date(b.post_date);
    //       debugger;
    //       return a>b ? 1 : a<b ? -1 : 0;
    //     });
    //   };
    //WORKING ON SORTING SUBVIEWS

    this.attachSubviews();

    return this;
  },

  generateContent: function() {
    var thisView = this;
    var allPosts = StrickLife.posts.toHash();
    var years = _.keys(allPosts).sort();

    for(var i = 0; i < years.length; i++){
      var year = years[i];
      var months = _.keys(allPosts[year]).sort();

      for(var j = 0; j < months.length; j++){
        var month = months[j]
        var dateString = StrickLife.MonthNames[month];
        dateString += " ";
        dateString += year;
        //do something with this dateString
        var days = _.keys(allPosts[year][month])

        for(var k = 0; k < days.length ; k++) {
          var day = days[k]
          var dayViewCollection = allPosts[year][month][day]
          var date = year + "-" + month +"-"+ day
          var dayView = new StrickLife.Views.DayMinView({
            dateString: dateString,
            date: date,
            collection: dayViewCollection
          });
          thisView.addSubview("#all-the-posts", dayView)
        }
      }
    }
  },


});
