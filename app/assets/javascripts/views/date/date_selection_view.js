StrickLife.Views.DateSelectionView = Backbone.View.extend({
  initialize: function(options){
    this.postDate = options.postDate
  },

  template: JST["date/date_selection"],

  className: "nav-form-item",

  render: function(){
    var date = (!!this.postDate) ? new Date(this.postDate + "PST") : new Date()
    var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear()
    var actualToday = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
debugger
    var content = this.template({
      //post: this.model,
      defaultDate: today,
      actualDefaultDate: actualToday
    });
    this.$el.html(content);

    return this;
  },

  events: {
    "click #date-selection-icon" : "togglePopover"
  },


  togglePopover: function(event){
    var open = $(event.currentTarget).hasClass("selected");
    $(".nav-form-item a").each(function(item){
      $(this).removeClass("selected");
    });
    $(".expanded-view").each(function(item){
      $(this).hide();
    });
    if (!open) {
      $(event.currentTarget).addClass("selected")
      $("#date-expanded-view").show();
    }
  },

  addDatePicker: function() {
    this.$("#nav-date-picker").datepicker({
      altFormat: "yy-mm-dd",
      altField: "#nav-date-actual-date",
      defaultDate: 0,
    })
  }




});
