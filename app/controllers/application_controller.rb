class ApplicationController < ActionController::API
  protected

  def signed_in?
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized if session[:user_id].nil?
  end

  def not_signed_in?
    render json: { 'logged_in': true } unless session[:user_id].nil?
  end
end
