module Api
  class TagsController < ApiController
    def index
      @tags = [];
      current_user.posts.includes(:tags).each do |post|
        tagArray = post.tags
        @tags += tagArray
      end
      @tags.uniq!
      
      render :index
    end
  end
end
