class UsersController < ApplicationController
  before_action :not_signed_in?, only: :create

  # POST /api/user/create
  # Request body params:
  #   name (string)
  #   email (string)
  #   password (string)
  #   password_confirmation (string)
  #   birthday (isodate)
  # Success response:
  #   Code: 200
  #   Content: { 'logged_in': true, user: { id: int, name: string, email: string, birthday: date } }
  # Error response:
  #   (1) Code: 409
  #   Content: { errors: { 'email': ['has already been taken', ...], ... } }
  #   (2) Code: 400
  #   Content: { errors: { 'name': [...], 'email': [...], 'password': [...], 'birthday': [...] } }
  def create
    birthday = params[:user][:birthday]
    params[:user][:birthday] = Date.strptime(birthday, '%m/%d/%Y') unless birthday.nil?
    user = User.new(user_params)
    if user.save && user.authenticate(params[:password])
      session[:user] = {
        value: user.as_json(only: [:id, :name, :email, :birthday]),
        expires: 1.day.from_now
      }
      render json: { 'logged_in': true, user: session[:user] }
    elsif user.errors['email'] && user.errors['email'].include?('has already been taken')
      render json: { errors: user.errors }, status: :conflict # 409
    else
      render json: { errors: user.errors }, status: :bad_request # 400
    end
  end

  # GET /api/user/email_taken
  # Query params:
  #   email (string)
  # Success response:
  #   Code: 200
  #   Content: { true/false }
  # Error response:
  #   (1) Code: 400
  #   Content: { errors: ['Email not provided'] }
  def email_taken
    if !params[:email].nil?
      user = User.find_by_email(params[:email].downcase)
      render json: !user.nil?
    else
      render json: { errors: ['Email not provided'] }, status: :bad_request # 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :birthday)
  end
end
