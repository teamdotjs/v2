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
      session[:user] = {
        value: user.as_json(only: [:id, :name, :email, :birthday]),
        expires: 1.day.from_now
      }
      render json: { 'logged_in': true, user: session[:user] }
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
    session.delete(:user)
    render json: { 'logged_in': false }
  end

  # GET /api/auth/signed_in
  # Params:
  #   none
  # Success response:
  #   (1) Code: 200
  #   Content: { 'logged_in': true, user: { id: int, name: string, email: string, birthday: date } }
  #   (2) Code: 200
  #   Content: { 'logged_in': false }
  def signed_in
    if !session[:user].nil?
      render json: { 'logged_in': true, user: session[:user] }
    else
      render json: { 'logged_in': false }, status: :unauthorized # 401
    end
  end
end
