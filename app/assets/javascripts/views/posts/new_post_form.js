StrickLife.Views.PostsForm = Backbone.View.extend({
  className: "posts-form",
  template: JST["posts/form"],

  render: function(){
    var date = new Date();
    var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear()
    var content = this.template({defaultDate: today});
    this.$el.html(content)
    this.$('#form-date-picker').datepicker({
      altFormat: "yy-mm-dd",
      altField: "#form-date-actual-date",
      defaultDate: 0
    });
    // setTimeout(appendDatePicker, 0);
    // var appendDatePicker = function() {
    //   var datePicker = this.$("#form-date-picker")
    //   datePicker.datepicker({
    //     altFormat: "yy-mm-dd",
    //     altField: "#form-date-actual-date"
    //   }).datepicker('option', 'setDate', new Date());
    // };
    // setTimeout(appendDatePicker, 0);

    return this;
  },

  tagName: "form",

  events: {
    "click button": "createPost"
  },

  createPost: function(event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();

    //Change as they come
    formData.post.user_id = 1;
    formData.post.post_id = 1;

    this.model.set(formData);
    if (this.model.isNew()) {
      this.collection.create(this.model, {
        success: function(model){
          StrickLife.posts.add(model);
          Backbone.history.navigate("#", {trigger: true});
        }
      })
    } else {
      this.model.save({},{
        success: function() {
          this.collection.fetch();
        }
      });
    }
  }
});
