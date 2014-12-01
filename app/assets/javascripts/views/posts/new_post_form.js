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
    $("#context-nav-el").html(view.render().$el)
    //view.initMap();
    view.createAutocomplete();
  },

  tagName: "form",

  events: {
    "click button": "createPost"
  },

  createPost: function(event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();
    var formView = this;

    //Change as they come
    formData.post.user_id = 1;

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
          //Navigate back to newly saved day-- perhaps change POSTVIEW
          var string = "date/" + formView.model.get("post_date").split("-").join("/")
          debugger
          Backbone.history.navigate(string, {trigger: true})
        },
        error: function(){
          alert('hi')
        }
      });
    }
  }
});
