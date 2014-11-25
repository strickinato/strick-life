module Api
  class PostsController < ApiController
    def index
      @posts = Post.all
    end
  end
end
