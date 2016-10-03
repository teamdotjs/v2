class AuthController < ApplicationController
  before_action :authenticate_request!, except: [:authenticate_user]

  def authenticate_user
    user = User.find_by_email(params[:email].downcase)
    puts "USER.PASSWORD: #{user}"
    puts "PARAMS[:password]: #{params[:password]}"
    if user && user.authenticate(params[:password])
      render json: payload(user)
    else
      render json: { errors: ['Invalid Username/Password'] }, status: :unauthorized
    end
  end

  def home
    render json: { 'logged_in': true }
  end

  private

  def payload(user)
    return nil unless user && user.id
    {
      auth_token: JsonWebToken.encode(user_id: user.id),
      user: { id: user.id, name: user.name, email: user.email }
    }
  end
end
