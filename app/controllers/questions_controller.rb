class QuestionsController < ApplicationController
  before_action :signed_in?

  # POST /api/question/:id/submit_answer
  # Desc: return true/false if answer provided is correct
  # Request body params:
  #   value
  # Success response:
  #   Code: 200
  #   Content: true/false
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Question with 'id'=int'],
  #              error_message: 'Question could not be found' }
  def submit_answer
    option = Option.find_by_question_id_and_value!(params[:id], params[:value])
    render json: option.is_correct
  end
end
