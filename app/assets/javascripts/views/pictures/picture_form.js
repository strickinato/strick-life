StrickLife.Views.PictureSelectionView = Backbone.View.extend({
  initialize: function(options) {

  },

  template: JST["pictures/picture_selection"],

  render: function(){
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  className: "nav-form-item",

  events: {
    "click #picture-selection-icon" : "togglePopover",
    "change" : "getImage"
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
      $("#picture-expanded-view").slideDown(100);
    }
  },


  getPictureData: function(formData){
    formData.post.picture_url = this.imageUrl ? this.imageUrl : "";
    return formData;
  },

  getImage: function() {
    this.imageUrl = event.fpfile.url
    var string = "<img src='" + this.imageUrl +"'>"
    $("#current-picture-view").html(string);
  },

});
