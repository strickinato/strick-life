StrickLife.Views.ContextNavBar = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.$el = options.$el
  },

  template: JST["nav/context_navbar"],

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.removeOldNavSubviews();
    this.attachSubviews();

    return this;
  },

  removeOldNavSubviews: function() {
    if(this.subviews("#context-area").length > 0){
      _.each(this.subviews()["#context-area"].slice(0), function(subview){
        this.removeSubview('#context-area', subview);
      }.bind(this))
    }
  }

});
