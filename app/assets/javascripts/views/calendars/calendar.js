StrickLife.Views.Calendar = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.render)
  },

  template: function() {
    var string = "<script type='text/template' id='calendar-template'>" +
      "<div class='clndr-controls row'>" +
      "<div class='clndr-control-button col-xs-4'><span class='clndr-previous-button'>previous</span></div><div class='month col-xs-4'><%= month %> <%= year %></div><div class='clndr-control-button col-xs-4 rightalign'><span class='clndr-next-button'>next</span></div>" +
      "</div>" +
      "<table class='clndr-table' border='0' cellspacing='0' cellpadding='0'>" +
      "<thead>" +
      "<tr class='header-days row'>" +
      "<% for(var i = 0; i < daysOfTheWeek.length; i++) { %>" +
      "<td class='header-day col-xs-2'><%= daysOfTheWeek[i] %></td>" +
      "<% } %>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "<% for(var i = 0; i < numberOfRows; i++){ %>" +
      "<tr class='row'>" +
      "<% for(var j = 0; j < 7; j++){ %>" +
      "<% var d = j + i * 7; %>" +
      "<td class='<%= days[d].classes %> col-xs-2'><div class='day-contents'><%= days[d].day %>" +
      "</div></td>" +
      "<% } %>" +
      "</tr>" +
      "<% } %>" +
      "</tbody>" +
      "</table>";
      "</script>";
    return string
  },

  initCal: function() {
    this.eventsArray = this.createPostDays();
    $('#main').clndr({
      template: $("#calendar-template").html(),
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
    var content = this.template();
    this.$el.html(content)

    return this;

  },
});
