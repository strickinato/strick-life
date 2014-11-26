StrickLife.Collections.Posts = Backbone.Collection.extend({
  url:"api/posts",
  model: StrickLife.Models.Post,
  comparator: function(model) {
    return model.get("post_date") * -1
  }
});
