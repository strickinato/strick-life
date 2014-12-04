StrickLife.Views.Calendar = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.initCal)
  },

  template: JST["calendars/calendar"],

  initCal: function() {
    this.eventsArray = this.createPostDays();
    $('#main').clndr({
      events: this.eventsArray,
      clickEvents: {
        click: function(target) {
          console.log(target);
        },
        onMonthChange: function(month) {
          console.log('you just went to ' + month.format('MMMM, YYYY'));
        }
      },
    });
  },

  createPostDays: function() {
    var eventArray = []
    _.each(this.collection.models, function(model){
      var day = {
        date: model.get("post_date")
      };
      eventArray.push(day)

    }.bind(this));

    return eventArray
  },

  className: "calendar-container",

  render: function(){
    return this;
  },
});
