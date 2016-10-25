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
  #   if a wordinfo, root, form, etc. has an id, it is updated
  #   if it doesn't have an id, it is created
  #   include '_destroy': true to destroy a wordinfo, root, form, etc.
  # Request body params:
  #   { 'lesson': { lesson } }
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
    lesson.attributes = lesson_params
    unless lesson.save
      render json: { 'errors': lesson.errors }, status: :bad_request # 400
      return
    end
    render json: lesson.reload
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

  private

  def lesson_params
    params[:lesson][:wordinfos_attributes] = params[:lesson][:wordinfos]
    params[:lesson][:wordinfos_attributes].each do |info|
      info[:user_id] = session[:user_id][:value]
      info[:roots_attributes] = info[:roots]
      info[:forms_attributes] = info[:forms]
      info[:synonyms_attributes] = info[:synonyms]
      info[:antonyms_attributes] = info[:antonyms]
      info[:sentences_attributes] = info[:sentences]
    end
    params.require(:lesson).permit(
      :id,
      :title,
      wordinfos_attributes: [
        :id,
        :word,
        :definition,
        :user_id,
        :_destroy,
        roots_attributes: [:id, :word, :_destroy],
        forms_attributes: [:id, :wordinfo_id, :associated_word_id, :_destroy],
        synonyms_attributes: [:id, :word, :_destroy],
        antonyms_attributes: [:id, :word, :_destroy],
        sentences_attributes: [:id, :context_sentence, :_destroy]
      ]
    )
  end
end
