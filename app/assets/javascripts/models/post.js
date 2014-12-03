StrickLife.Models.Post = Backbone.Model.extend({
  urlRoot: "api/posts",

  tags: function() {
    if (!this._tags) {
      this._tags = new StrickLife.Collections.Tags([], { post_id: this.id });
    }
    return this._tags
  },

  parse: function(payload) {
    if (payload.tags) {
      this.tags().set(payload.tags, {parse: true});
      delete(payload.tags);
    }

    return payload;
  }
});
