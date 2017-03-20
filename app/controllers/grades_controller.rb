class GradesController < ApplicationController
  # { grade } = {
  #   id: int,
  #   question: { id: int, prompt: '' },
  #   value: '',
  #   duration: int, (in seconds)
  #   is_correct: true/false
  # }
  before_action :signed_in?
  before_action :correct_user?, only: [:course]

  # GET /api/grade
  # Desc: return all grades for current user
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { grade }
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  def index
    user = User.find(session[:user_id][:value])
    render json: Grade.where(user: user)
  end

  # POST /api/grade
  # Desc: return true/false if answer provided is correct
  # Request body params:
  #   question_id (int)
  #   value (string)
  # Success response:
  #   Code: 200
  #   Content: true/false
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Question with 'id'=int'],
  #              error_message: 'Question could not be found' }
  def create
    question = Question.find(params[:question_id])
    user = User.find(session[:user_id][:value])
    grade = Grade.create(user: user, question: question, value: params[:value])
    render json: grade.as_json['is_correct']
  end

  # GET /api/grade/course/:id
  # Desc: return all grades for course specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ user: { user }, grades: [{ grade }] }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 403
  #   Content: { errors: ['Forbidden'], error_message: 'Forbidden' }
  #   (3) Code: 404
  #   Content: { errors: ['Couldn't find Course with 'id'=int'],
  #              error_message: 'Course could not be found' }
  def course
    grades = []
    @course.students.each do |student|
      grades << { user: student, grades: Grade.where(user: student) }
    end
    render json: grades
  end

  private

  def correct_user?
    @course = Course.find(params[:id])
    return if @course.instructor_id == session[:user_id][:value]
    render json: { errors: ['Forbidden'], error_message: 'Forbidden' }, status: :forbidden # 403
  end
end
