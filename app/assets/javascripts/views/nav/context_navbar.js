StrickLife.Views.ContextNavBar = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.$el = options.$el

  },

  logout: function(){
    alert('b')
    $.ajax({
      url: window.location.href.split('#')[0] + "session",
      type: "POST",
      method: "delete",
      success: function() { window.location.reload(true); }
    });
  },

  template: JST["nav/context_navbar"],

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.removeOldNavSubviews();
    this.attachSubviews();
    $("#logout-btn").on("click", this.logout)

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
