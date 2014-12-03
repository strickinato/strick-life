StrickLife.Views.SubmitButtonView = Backbone.View.extend({
  initialize: function(options){
    this.form = options.form;
  },

  template: JST["nav/submit_button"],

  className: "nav-form-item",

  render: function(){
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  events: {
    "click" : "submitForm"
  },

  submitForm: function() {
    this.form.createPost();
  },

});
