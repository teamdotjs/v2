class ApplicationController < ActionController::API
  attr_reader :current_user

  protected

  def authenticate_request!
    if user_id_in_token?
      @current_user = User.find(auth_token[:user_id])
    else
      render json: { errors: ['Not Authenticated'] }, status: :unauthorized
    end
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Not Authenticated'] }, status: :unauthroized
  end

  def payload(user)
    return nil unless user && user.id
    {
      auth_token: JsonWebToken.encode(user_id: user.id),
      user: { id: user.id, name: user.name, email: user.email }
    }
  end

  def signed_in?
    render json: { 'logged_in': false } if session[:jwt].nil?
  end

  def not_signed_in?
    render json: { 'logged_in': true } unless session[:jwt].nil?
  end

  private

  def http_token
    @http_token ||= session[:jwt]
  end

  def auth_token
    @auth_token ||= JsonWebToken.decode(http_token)
  end

  def user_id_in_token?
    http_token && auth_token && auth_token[:user_id].to_i
  end
end
