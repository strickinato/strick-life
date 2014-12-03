StrickLife.Views.TagsIndexForm = Backbone.CompositeView.extend({
  initialize: function(options){
    this.currentTags = options.postTagCollection

    var view = this
    _.each(this.currentTags.models, function(model){
      debugger
      view.selectTag(model)
    })

    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "selected", this.selectTag);
  },

  className: "nav-form-item",

  template: JST["tags/index_form"],

  render: function(){
    var content = this.template({
    });
    this.$el.html(content)
    this.addTypeAhead();
    this.attachSubviews();

    return this;
  },

  events: {
    "click #tag-selection-icon" : "togglePopover",
    //"click #current-tags-view li" : "removeTag"
  },

  selectTag: function(model) {
    debugger
    var tagView = new StrickLife.Views.SingleTagItem({
      parentView: this,
      model: model
    });
    this.addSubview("#current-tags-view", tagView);
  },

  removeTag: function(event) {
    debugger
    $(event.currentTarget)
  },

  togglePopover: function(event){
    $(event.currentTarget).siblings().removeClass("selected")
    $(event.currentTarget).toggleClass("selected")
    $("#tags-expanded-view").toggle();
  },

  addTypeAhead: function() {
    var typeahead = new Backbone.Typeahead({
      collection: this.collection
    });
    $('#tag-search-box').html(typeahead.render().el);
  },
});
