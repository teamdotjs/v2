class UsersController < ApplicationController
  before_action :not_signed_in?, only: :create

  def create
    user = User.new(user_params)
    if user.save
      session[:jwt] = {
        value: payload(user),
        expires: 1.day.from_now
      }
      render json: { 'logged_in': true }
    else
      render json: { errors: user.errors.full_messages }
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
