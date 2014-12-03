StrickLife.Views.DateSelectionView = Backbone.View.extend({

  template: JST["date/date_selection"],

  className: "nav-form-item",

  render: function(){
    var date = new Date();
    var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear()
    var actualToday = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
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
    $(event.currentTarget).toggleClass("selected")
    $("#date-expanded-view").toggle();
  },

  addDatePicker: function() {
    this.$("#nav-date-picker").datepicker({
      altFormat: "yy-mm-dd",
      altField: "#nav-date-actual-date",
      defaultDate: 0
    })
  }




});
