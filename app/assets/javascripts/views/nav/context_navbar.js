StrickLife.Views.ContextNavBar = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.$el = options.$el
  },

  template: JST["nav/context_navbar"],

  render: function(){
    var content = this.template();
    this.$el.html(content);

    return this;
  },

});
