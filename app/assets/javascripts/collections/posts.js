StrickLife.Collections.Posts = Backbone.Collection.extend({
  url:"api/posts",
  model: StrickLife.Models.Post,
  comparator: function(model) {
    return model.get("post_date") * -1
  },

  toHash: function(){
    var postHash = {};
    var mainCollection = this;
    _(this.models).each(function(post) {
      var currentDay = post.get("post_date")
      var year = parseInt(post.get("post_date").slice(0, 4));
      var month = parseInt(post.get("post_date").slice(5, 7));
      var day = parseInt(post.get("post_date").slice(8, 10));


      if (postHash[year] === undefined) {
        postHash[year] = {};
      }
      if (postHash[year][month] === undefined) {
        postHash[year][month] = {};
      }
      if (postHash[year][month][day] === undefined) {
        var filterModels = mainCollection.models
        var dayPosts =  _.filter(filterModels, function(post){
          return (post.get("post_date") === currentDay)
        })
        postHash[year][month][day] = new StrickLife.Collections.Posts(dayPosts)
      }
    });
    return postHash
  }
});
