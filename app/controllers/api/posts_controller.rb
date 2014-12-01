module Api
  class PostsController < ApiController
    def index
      @posts = Post.where({user_id: current_user.id})
      render :index
    end

    def show
      @post = Post.find(params[:id])
      render :show
    end

    def update
      @post = Post.find(params[:id])

      if @post.update(post_params)
        render :show
      else
        render :json => @post.errors.full_messages, :status => 422
      end


    end

    def create
      @post = Post.new(post_params)

      if @post.save
        render :index
      else
        render :json => @post.errors.full_messages, :status => 422
      end

    end


    private
    def post_params
      params.require(:post).permit(:user_id, :body, :post_date)
    end
  end
end
