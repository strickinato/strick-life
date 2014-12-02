StrickLife.Views.PostsForm = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render)

  },
  className: "posts-form",
  template: JST["posts/form"],

  render: function(){
    var date = new Date();
    var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear()
    var actualToday = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
    var content = this.template({
      post: this.model,
      defaultDate: today,
      actualDefaultDate: actualToday
      });
    this.$el.html(content)
    this.$('#form-date-picker').datepicker({
      altFormat: "yy-mm-dd",
      altField: "#form-date-actual-date",
      defaultDate: 0
    });

    this.addMapToNavbar();


    return this;
  },

  addMapToNavbar: function(){
    var view = new StrickLife.Views.MapSelectionView();
    StrickLife.navView.addSubview("#context-area", view)
    view.createPopover();
  },

  tagName: "form",

  events: {
    "click button": "createPost"
  },

  createPost: function(event) {
    event.preventDefault();

    var formData = this.getFormData()
    var formView = this;



    this.model.set(formData.post);
    if (this.model.isNew()) {
      this.collection.create(this.model, {
        success: function(model){
          Backbone.history.navigate("#", {trigger: true});
        },
        wait: true
      })
    } else {
      this.model.save({},{
        success: function(model) {
          formView.collection.fetch();
          var string = "date/" + formView.model.get("post_date").split("-").join("/")
          Backbone.history.navigate(string, {trigger: true})
        },
        error: function(){
          alert('hi')
        }
      });
    }
  },

  getFormData: function(){
    var formData = this.$el.serializeJSON();
    formData.post.user_id = parseInt(StrickLife.currentUser.id);
    formData.post.location_data = {};
    formData.post.location_data.latitude = StrickLife.currentCoords.lat()
    formData.post.location_data.longitude = StrickLife.currentCoords.lng()
    formData.post.location_data.address = StrickLife.currentAddress
    formData.post.location_data.place_id = StrickLife.currentPlaceId

    return formData
  },

});
