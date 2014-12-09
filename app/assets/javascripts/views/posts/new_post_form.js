StrickLife.Views.PostsForm = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render)

    if (options.postTagCollection === undefined ) {
      this.postTagCollection = new StrickLife.Collections.Tags();
    } else {
      this.postTagCollection = options.postTagCollection;
    }



  },
  className: "posts-form",

  template: JST["posts/form"],

  render: function(){
    var content = this.template({
      post: this.model,
    });
    this.$el.html(content)


    StrickLife.navView.removeOldNavSubviews();
    this.addSubmitButtonToNav();
    this.addDateTaggerToNav();
    this.addLocationTaggerToNav();
    this.addTagTaggerToNav();
    this.addPictureSelectionViewToNav();
    this.addTour();

    return this;
  },

  addPictureSelectionViewToNav: function() {
    this.pictureFormView = new StrickLife.Views.PictureSelectionView({
      model: this.model
    });
    StrickLife.navView.addSubview("#context-area", this.pictureFormView)
  },

  addTagTaggerToNav: function() {
    this.taggerView = new StrickLife.Views.TagsIndexForm({
      postTagCollection: this.postTagCollection,
      collection: StrickLife.tags
    });
    StrickLife.navView.addSubview("#context-area", this.taggerView)
    this.taggerView.addTypeAhead();
  },

  addDateTaggerToNav: function() {
    re = /[?&]date=(.*)/
    url = location.href
    var postDate

    if (re.test(url)) {
      var matches = url.match(re)
      postDate = matches[1]
    } else {
      postDate = this.model.get("post_date")
    }

    this.daterView = new StrickLife.Views.DateSelectionView({
      postDate: postDate
    });
    StrickLife.navView.addSubview("#context-area", this.daterView)
    this.daterView.addDatePicker();
  },

  addLocationTaggerToNav: function(){
    this.locaterView = new StrickLife.Views.MapSelectionView({
      postLocation: this.model.get("location")
    });
    StrickLife.navView.addSubview("#context-area", this.locaterView)
    this.locaterView.createAutocomplete();
  },

  addSubmitButtonToNav: function(){
    this.buttonSubmitView = new StrickLife.Views.SubmitButtonView({
      form: this
    });
    StrickLife.navView.addSubview("#context-area", this.buttonSubmitView);
  },

  tagName: "form",

  createPost: function() {
    var formData = this.$el.serializeJSON();
    formData = this.getUserData(formData);
    formData = this.locaterView.getLocationData(formData);
    formData = this.getDateData(formData);
    formData = this.getTagData(formData);
    formData = this.getPictureData(formData);

    var formView = this;

    this.model.set(formData.post);
    if (this.model.isNew()) {
      this.collection.create(this.model, {
        success: function(){
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

  getPictureData: function(formData) {
    formData.post.picture_url = this.pictureFormView.pictureUrl
    return formData
  },

  getDateData: function(formData){
    formData.post.post_date = $("#nav-date-actual-date").val()
    return formData;
  },

  getTagData: function(formData) {
    formData.post.all_tags = "";
    _.each(this.postTagCollection.models, function(tag){
      formData.post.all_tags += tag.toJSON().name
      formData.post.all_tags += ", "
    });
    var num = (formData.post.all_tags.length - 2)
    formData.post.all_tags = formData.post.all_tags.slice(0, num)
    return formData
  },

  addTour: function(){
    var tour;

    tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows',
      }
    });

    Shepherd.on("complete", function(){
      StrickLife.visitedNew = true;
    });
    Shepherd.on("cancel", function(){
      StrickLife.visitedNew = true;
    });

    tour.addStep('new-post-tags', {
      text: 'There are lots of options to add to a post. Add a picture...',
      attachTo: '#picture-selection-icon bottom',
      buttons: [
      {
        text: 'Skip',
        action: tour.cancel
      },
      {
        text: 'Next',
        action: tour.next
      }
      ]
    });

    tour.addStep('new-post-tags', {
      text: '...or add tags...',
      attachTo: '#tag-selection-icon bottom',
      buttons: [
      {
        text: 'Skip',
        action: tour.cancel
      },
      {
        text: 'Next',
        action: tour.next
      }
      ]
    });

    tour.addStep('new-post-location', {
      text: '...or change your location...',
      attachTo: '#map-selection-icon bottom',
      buttons: [
      {
        text: 'Skip',
        action: tour.cancel
      },
      {
        text: 'Next',
        action: tour.next
      }
      ]
    });

    tour.addStep('new-post-date', {
      text: '...change the date.',
      attachTo: '#date-selection-icon bottom',
      buttons: [
      {
        text: 'Skip',
        action: tour.cancel
      },
      {
        text: 'Next',
        action: tour.next
      }
      ]
    });

    tour.addStep('new-post-submit', {
      text: 'Click here when you are finished.',
      attachTo: '#date-selection-icon bottom',
      buttons: [
      {
        text: 'Skip',
        action: tour.cancel
      },
      {
        text: 'Next',
        action: tour.next
      }
      ]
    });


    if(StrickLife.visitedIndex == false) {
      tour.start();
    }
  },

});
