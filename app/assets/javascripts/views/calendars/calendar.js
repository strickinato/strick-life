StrickLife.Views.Calendar = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.addEvents)
  },

  template: function() {
    var string = "<div id='cal-container'>" +
      "<script type='text/template' id='calendar-template'>" +
      "<div class='clndr-controls row'>" +
      "<div class='clndr-control-button col-xs-4'><span class='clndr-previous-button'>previous</span></div><div class='month col-xs-4'><%= month %> <%= year %></div><div class='clndr-control-button col-xs-4 rightalign'><span class='clndr-next-button'>next</span></div>" +
      "</div>" +
      "<table class='clndr-table' border='0' cellspacing='0' cellpadding='0'>" +
      "<thead>" +
      "<tr class='header-days row'>" +
      "<% for(var i = 0; i < daysOfTheWeek.length; i++) { %>" +
      "<td class='header-day col-xs-7'><%= daysOfTheWeek[i] %></td>" +
      "<% } %>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "<% for(var i = 0; i < numberOfRows; i++){ %>" +
      "<tr class='row'>" +
      "<% for(var j = 0; j < 7; j++){ %>" +
      "<% var d = j + i * 7; %>" +
      "<td class='<%= days[d].classes %> col-xs-7'><div class='day-contents'><%= days[d].day %>" +
      "</div></td>" +
      "<% } %>" +
      "</tr>" +
      "<% } %>" +
      "</tbody>" +
      "</table>" +
      "</script>" +
      "</div>" +
      "<div id='modal-post-view' class='clearfix'><div>";
    return string
  },

  initCal: function() {
    this.eventsArray = this.createPostDays();

    var calView = this;
    StrickLife.cal = $('#cal-container').clndr({
      template: $("#calendar-template").html(),
      events: this.eventsArray,
      clickEvents: {
        click: function(target) {
          calView.redirectToNewPost(target)
        },
      },
      ready: function() {
        var self = this;
        $(this.element).on('mouseover', '.day', function(e) {
          var target = self.buildTargetObject(e.currentTarget, true);
          if ($(target.element).hasClass("event"))
            calView.showDayPosts.call(self, e, target)
        });
      },
    });
  },

  showDayPosts: function(e, target) {
    console.log(target)
    var models = target.events.map(function(event){
      return event.model
    });
    var posts = new StrickLife.Collections.Posts(models)
    var postsView = new StrickLife.Views.PostsIndex({
      collection: posts
    });

    $("#modal-post-view").html(postsView.render().$el).show();
    $(target.element).mousemove(function(move){
      $("#modal-post-view").show();
      $("#modal-post-view").css({
        top: (move.pageY + 50) + "px",
        left: (move.pageX + 0) + "px"
      });
    });
    $(target.element).mouseout(function(event){
      $("#modal-post-view").hide();
    });
  },

  redirectToNewPost: function(target) {
    var queryString = "?date=" + target.date._i
    console.log(queryString)
    Backbone.history.navigate("/posts/new" + queryString, {trigger: true})
  },

  addEvents: function() {
    StrickLife.cal.setEvents(this.createPostDays());
  },

  createPostDays: function() {
    var eventArray = []
    _.each(this.collection.models, function(model){
      var day = {
        model: model,
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
