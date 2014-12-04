StrickLife.Models.Post = Backbone.Model.extend({
  urlRoot: "api/posts",

  tags: function() {
    if (!this._tags) {
      this._tags = new StrickLife.Collections.Tags([], { post_id: this.id });
    }
    return this._tags
  },

  location: function() {
    if (!this._location) {
      this._location = new StrickLife.Models.Location();
    }
    return this._location
  },

  parse: function(payload) {
    if (payload.tags) {
      this.tags().set(payload.tags, {parse: true});
      delete(payload.tags);
    }
    if (payload.location) {
      this.location().set(payload.location, {parse: true});
      delete(payload.location);
    }
    
    return payload;
  }
});
