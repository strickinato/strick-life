# class SessionsController < ApplicationController
#   def create
#     email = user_params[:email]
#     password = user_params[:password]
#
#     user = User.find_by_credentials(email, password)
#
#     if user
#       login!(user)
#       redirect_to root_url
#     else
#       flash.now[:errors] = "Invalid Email Or Password"
#       render :new
#     end
#   end
#
#   def new
#     @user = User.new
#     render :new
#   end
#
#   def destroy
#   end
#
#   private
#   def user_params
#     params.require(:user).permit(:password, :email)
#   end
# end
