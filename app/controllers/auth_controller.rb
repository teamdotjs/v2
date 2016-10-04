class AuthController < ApplicationController
  before_action :not_signed_in?, only: :authenticate_user
  before_action :signed_in?, only: :invalidate_user

  def authenticate_user
    user = User.find_by_email(params[:email].downcase)
    if user && user.authenticate(params[:password])
      session[:jwt] = {
        value: payload(user),
        expires: 1.day.from_now
      }
      render json: { 'logged_in': true }
    else
      render json: { errors: ['Invalid Username/Password'] }, status: :unauthorized
    end
  end

  def invalidate_user
    session.delete(:jwt)
    render json: { 'logged_in': false }
  end

  def signed_in
    render json: { 'logged_in': !session[:jwt].nil? }
  end
end
