class PracticesController < ApplicationController
  # { practice } = {
  #   'id': int,
  #   'type': '',
  #   'questions': [{
  #     'id': int,
  #     'type': '',
  #     'prompts': [''],
  #     'options': [{ 'value': '', 'is_correct': boolean }]
  #   }] }
  before_action :signed_in?

  # GET /api/lesson/:id/practice
  # Desc: return all practices in the lesson specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ practice }]
  # Error response:
  #   (1) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  #   (2) Code: 404
  #   Content: { 'errors': ['Not Found'] }
  def index
    render json: Lesson.find(params[:id]).practices
  end

  # GET /api/lesson/:id/practice/:p_id
  # Desc: return the practice specified by p_id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { practice }
  # Error response:
  #   (1) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  #   (2) Code: 404
  #   Content: { 'errors': ['Not Found'] }
  def show
    render json: Practice.find(params[:p_id])
  end
end
