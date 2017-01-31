class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound do |error|
    render json: { errors: [error.message], error_message: error.model + ' could not be found' },
           status: :not_found # 404
  end

  protected

  def signed_in?
    return if session_not_expired?
    render json: { errors: ['Unauthorized'], error_message: 'Unauthorized' },
           status: :unauthorized # 401
  end

  def not_signed_in?
    return unless session_not_expired?
    render json: { logged_in: true }
  end

  def session_not_expired?
    user_session = session[:user_id]
    return false unless user_session
    User.find(user_session[:value])
    user_session[:expires] >= 1.day.ago
  end
end
