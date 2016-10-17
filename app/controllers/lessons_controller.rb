class LessonsController < ApplicationController
  # { lesson } = { 'id': int, 'title': '', 'wordinfos': [{ wordinfo }] }
  before_action :signed_in?

  # GET /api/lesson/all
  # Desc: return all lessons created by current user
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ lesson }]
  # Error response:
  #   Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  def all
    render json: Lesson.where(owner_id: session[:user_id][:value])
  end

  # POST /api/lesson/
  # Desc: creates a new lesson for the current user
  # Request body params:
  #   title (string - optional - defaults to 'Untitled')
  # Success response:
  #   Code: 200
  #   Content: { lesson }
  # Error response:
  #   (1) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  def create
    lesson_params = { owner_id: session[:user_id][:value] }
    title = params[:title]
    lesson_params[:title] = title if title
    lesson = Lesson.create(lesson_params)
    render json: lesson
  end

  # GET /api/lesson/:lesson_id/add_word/:word_id
  # Desc: adds a word to a lesson
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { lesson }
  # Error response:
  #   (1) Code: 400
  #   Content: { 'errors': { 'wordinfo': [''] } }
  #   (2) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  #   (3) Code: 404
  #   Content: { 'errors': ['Lesson not found'] }
  #   (4) Code: 404
  #   Content: { 'errors': ['Word not found'] }
  def add_word
    begin
      lesson = Lesson.find(params[:lesson_id])
    rescue ActiveRecord::RecordNotFound
      render json: { 'errors': ['Lesson not found'] }, status: :not_found # 404
      return
    end
    begin
      word = Wordinfo.find(params[:word_id])
    rescue ActiveRecord::RecordNotFound
      render json: { 'errors': ['Word not found'] }, status: :not_found # 404
      return
    end
    begin
      lesson.wordinfos << word
    rescue ActiveRecord::RecordInvalid => e
      render json: { 'errors': e.record.errors }, status: :bad_request # 400
      return
    end
    render json: Lesson.find(lesson.id)
  end

  # GET /api/lesson/:lesson_id/remove_word/:word_id
  # Desc: removes a word from a lesson
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { lesson }
  # Error response:
  #   (1) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  #   (2) Code: 404
  #   Content: { 'errors': ['Lesson/word pair not found'] }
  def remove_word
    render json: { 'lesson': 'remove_word' }
  end

  # GET /api/lesson/:id
  # Desc: return lesson specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { lesson }
  # Error response:
  #   (1) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  #   (2) Code: 404
  #   Content: { 'errors': ['Not Found'] }
  def show
    render json: Lesson.find(params[:id])
  end

  # PATCH /api/lesson/:id
  # Desc: updates lesson specified by id
  # Request body params:
  #   title (string)
  # Success response:
  #   Code: 200
  #   Content: { lesson }
  # Error response:
  #   (1) Code: 400
  #   Content: { 'errors': { 'title': [''] } }
  #   (2) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  #   (3) Code: 404
  #   Content: { 'errors': ['Not Found'] }
  def update
    lesson = Lesson.find(params[:id])
    lesson.title = params[:title]
    if lesson.save
      render json: lesson
    else
      render json: { errors: lesson.errors }, status: :bad_request # 400
    end
  end

  # DELETE /api/lesson/:id
  # Desc: deletes lesson specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { 'deleted': true }
  # Error response:
  #   (1) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  #   (2) Code: 404
  #   Content: { 'errors': ['Not Found'] }
  def delete
    lesson = Lesson.find(params[:id])
    lesson.destroy
    render json: { 'deleted': true }
  end
end
