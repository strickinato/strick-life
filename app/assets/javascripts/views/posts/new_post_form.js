StrickLife.Views.PostsForm = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render)

    if (options.postTagCollection === undefined ) {
      this.postTagCollection = new StrickLife.Collections.Tags();
    } else {
      this.postTagCollection = options.postTagCollection;
    }
    debugger

  },
  className: "posts-form",
  template: JST["posts/form"],

  render: function(){
    var content = this.template({
      post: this.model,
    });
    this.$el.html(content)

    this.addSubmitButtonToNav();
    this.addDateTaggerToNav();
    this.addLocationTaggerToNav();
    this.addTagTaggerToNav();

    return this;
  },

//#MARKDOWN
  // initMarkDown: function() {
  //   var editor = new EpicEditor({
  //     textarea: "new-post-body",
  //     focusOnLoad: true,
  //   }).load();
  // },
  addTagTaggerToNav: function() {
    var view = new StrickLife.Views.TagsIndexForm({
      postTagCollection: this.postTagCollection,
      collection: StrickLife.tags
    });
    StrickLife.navView.addSubview("#context-area", view)
    view.addTypeAhead();
  },

  addDateTaggerToNav: function() {
    var view = new StrickLife.Views.DateSelectionView();
    StrickLife.navView.addSubview("#context-area", view)
    view.addDatePicker();
  },

  addLocationTaggerToNav: function(){
    var view = new StrickLife.Views.MapSelectionView();
    StrickLife.navView.addSubview("#context-area", view)
    view.createAutocomplete();
  },

  addSubmitButtonToNav: function(){
    var view = new StrickLife.Views.SubmitButtonView({
      form: this
    });
    StrickLife.navView.addSubview("#context-area", view);
  },

  tagName: "form",

  createPost: function() {
    //event.preventDefault();
    debugger
    var formData = this.$el.serializeJSON();
    formData = this.getUserData(formData);
    formData = this.getLocationData(formData);
    formData = this.getDateData(formData);
    formData = this.getTagData(formData);

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

  getUserData: function(formData){
    formData.post.user_id = parseInt(StrickLife.currentUser.id);

    return formData;
  },

  getLocationData: function(formData){
    formData.post.location_data = {};
    formData.post.location_data.latitude = StrickLife.currentCoords.lat()
    formData.post.location_data.longitude = StrickLife.currentCoords.lng()
    formData.post.location_data.address = StrickLife.currentAddress
    formData.post.location_data.place_id = StrickLife.currentPlaceId

    return formData;
  },

  getDateData: function(formData){
    formData.post.post_date = $("#nav-date-actual-date").val()
    return formData;
  },

  getTagData: function(formData) {
    formData.post.tags = [];
    debugger
  }

});
