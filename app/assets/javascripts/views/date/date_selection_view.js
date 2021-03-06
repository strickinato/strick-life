StrickLife.Views.DateSelectionView = Backbone.View.extend({
  initialize: function(options){
    this.postDate = options.postDate
  },

  template: JST["date/date_selection"],

  className: "nav-form-item",

  render: function(){
    var date = (!!this.postDate) ? new Date(this.postDate + "PST") : new Date()
    var today = ("0" + (date.getMonth()+1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + "/" + date.getFullYear()
    var actualToday = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
    var content = this.template({
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
      $(this).slideUp(100);
    });
    if (!open) {
      $(event.currentTarget).addClass("selected")
      $("#date-expanded-view").slideDown(100);
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
