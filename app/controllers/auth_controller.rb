class AuthController < ApplicationController
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

  private

  def payload(user)
    return nil unless user && user.id
    {
      auth_token: JsonWebToken.encode(user_id: user.id),
      user: { id: user.id, name: user.name, email: user.email }
    }
  end
end
