StrickLife.Views.DateSelectionView = Backbone.View.extend({

  template: JST["date/date_selection"],

  className: "nav-form-item",

  render: function(){
    var content = this.template();
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
    this.$("#nav-date-picker").datepicker()
  }




});
