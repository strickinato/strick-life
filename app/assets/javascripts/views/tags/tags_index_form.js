StrickLife.Views.TagsIndexForm = Backbone.View.extend({
  initialize: function(options){
    this.listenTo(this.collection, "sync", this.render);
  },

  className: "nav-form-item",

  template: JST["tags/index_form"],

  render: function(){
    var content = this.template({
    });
    this.$el.html(content)
    this.addTypeAhead();

    return this;
  },

  events: {
    "click #tag-selection-icon" : "togglePopover",
  },

  togglePopover: function(event){
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
