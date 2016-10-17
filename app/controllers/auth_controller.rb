class AuthController < ApplicationController
  before_action :not_signed_in?, only: :login
  before_action :signed_in?, only: :logout

  # POST /api/auth/login
  # Request body params:
  #   email (string)
  #   password (string)
  # Success response:
  #   Code: 200
  #   Content: { 'logged_in': true, user: { id: int, name: string, email: string, birthday: date } }
  # Error response:
  #   Code: 401
  #   Content: { errors: ['Invalid Username/Password'] }
  def login
    user = User.find_by_email(params[:email].downcase)
    if user && user.authenticate(params[:password])
      session[:user_id] = {
        value: user.id,
        expires: 1.day.from_now
      }
      render json: { 'logged_in': true, user: user.as_json(only: [:id, :name, :email, :birthday]) }
    else
      render json: { errors: ['Invalid Username/Password'] }, status: :unauthorized # 401
    end
  end

  # POST /api/auth/logout
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { 'logged_in': false }
  def logout
    session.delete(:user_id)
    render json: { 'logged_in': false }
  end

  # GET /api/auth/signed_in
  # Params:
  #   none
  # Success response:
  #   (1) Code: 200
  #   Content: { 'logged_in': true, user_id: int }
  #   (2) Code: 200
  #   Content: { 'logged_in': false }
  def signed_in
    if session_not_expired?
      render json: { 'logged_in': true, user_id: session[:user_id][:value] }
    else
      render json: { 'logged_in': false }, status: :unauthorized # 401
    end
  end
end
