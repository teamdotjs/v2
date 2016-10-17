class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  protected

  def signed_in?
    return if session_not_expired?
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  end

  def not_signed_in?
    return unless session_not_expired?
    render json: { 'logged_in': true }
  end

  def session_not_expired?
    user_session = session[:user_id]
    user_session && user_session[:expires] >= 1.day.ago
  end

  private

  def render_not_found
    render json: { 'errors': ['Not Found'] }, status: :not_found # 404
  end
end
