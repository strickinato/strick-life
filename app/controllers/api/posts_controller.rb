module Api
  class PostsController < ApiController
    def index
      @posts = Post.all
      render :index
    end

    def show
      @post = Post.find(params[:id])
      @tags = @post.tags
      @friends = @post.friends
      render :show
    end
  end
end
