StrickLife.Views.MonthView = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.month = options.month;
    this.year = options.year;
    this.postsThisMonth = options.postsThisMonth
    var dateString = StrickLife.MonthNames[this.month];
    dateString += " ";
    dateString += this.year;
    this.dateString = dateString
  },

  template: JST["months/month"],

  className: "single-month-view",

  render: function(){
    this.inputDayViews()
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  inputDayViews: function() {
    var days = _.keys(this.postsThisMonth)
    var thisView = this;

    for(var i = 0; i < days.length ; i++) {
      var day = days[i]
      var dayViewCollection = this.postsThisMonth[day]
      var dayView = new StrickLife.Views.DayMinView({
        year: this.year,
        month: this.month,
        day: day,
        collection: dayViewCollection
      });
      thisView.addSubview(".day-views", dayView)
    }

  }

});
