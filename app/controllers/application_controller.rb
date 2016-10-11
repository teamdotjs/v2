class ApplicationController < ActionController::API
  protected

  def signed_in?
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized if session[:user].nil?
  end

  def not_signed_in?
    render json: { 'logged_in': true } unless session[:user].nil?
  end
end
