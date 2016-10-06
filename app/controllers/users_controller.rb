class UsersController < ApplicationController
  before_action :not_signed_in?, only: :create

  def create
    birthday = params[:user][:birthday]
    params[:user][:birthday] = Date.strptime(birthday, '%m/%d/%Y') unless birthday.nil?
    user = User.new(user_params)
    if user.save
      session[:jwt] = {
        value: payload(user),
        expires: 1.day.from_now
      }
      render json: { 'logged_in': true }
    elsif user.errors.full_messages.include? 'Email has already been taken'
      render json: { errors: user.errors.full_messages }, status: :conflict # 409
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request # 400
    end
  end

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
