module Api
  class LocationsController < ApiController
    def create
      @location = Location.new(location_params)

      if @location.save
        render :index
      else
        render :json => @location.errors.full_messages, :status => 422
      end
    end

    def index
      @posts = [];
      current_user.posts.each do |post|
        loc = post.location
        @locations << loc unless @locations.include?(loc)
      end
      render :index
    end


    private
    def location_params
      params.require(:location).permit(:longitude, :latitude, :place_id, :address)
    end
  end
end
