module Api
  class PostsController < ApiController
    def index
      @posts = Post.where({user_id: current_user.id}).includes(:tags, :friends, :location)
      render :index
    end

    def show
      @post = Post.find(params[:id])
      render :show
    end

    def update
      @post = Post.find(params[:id])
      @post.all_tags = params[:all_tags]

      if @post.update(post_params)
        render :show
      else
        render :json => @post.errors.full_messages, :status => 422
      end
    end

    def create
      @post = Post.new(post_params)
      @post.all_tags = params[:all_tags]
      loc = Location.where(address: location_params[:address]).first_or_create do |location|
        location.place_id = location_params[:place_id]
        location.latitude = location_params[:latitude]
        location.longitude = location_params[:longitude]
      end

      @post.location_id = loc[:id]
      # if location
      #   @post.location_id = location.id
      # else
      #   location = Location.new(location_params)
      #   if location.save
      #     @post.location_id = location.id
      #   else
      #     render :json => @post.errors.full_messages, :status => 422
      #   end
      # end

      if @post.save
        render :index
      else
        render :json => @post.errors.full_messages, :status => 422
      end
    end


    private
    def post_params
      params.require(:post).permit(:user_id, :body, :post_date, :all_tags)
    end
    def location_params
      params.require(:location_data).permit(:longitude, :latitude, :address, :place_id)
    end
  end
end
