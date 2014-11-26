StrickLife.Views.PostsForm = Backbone.View.extend({
  template: JST["posts/form"],

  render: function(){
    var content = this.template();
    this.$el.html(content)

    return this;
  },

  tagName: "form",

  events: {
    "click button": "createPost"
  },

  createPost: function(event) {
    event.preventDefault();

    var formData = this.$el.serializeJSON();

    formData.post.user_id = 1;
    formData.post.post_id = 1;

    this.model.set(formData);
    if (this.model.isNew()) {
      this.collection.create(this.model, {
        success: function(){
          alert('created');
          Backbone.history.navigate("#");
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
