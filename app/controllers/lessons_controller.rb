class LessonsController < ApplicationController
  # { lesson } = {
  #   id: int,
  #   course_ids: [int],
  #   title: '',
  #   wordinfos: [{
  #     word: '',
  #     definition: '',
  #     part_of_speech: '',
  #     roots: [{ root: '', meaning: '' }],
  #     forms: [{ word: '', part_of_speech: '' }],
  #     synonyms: [''],
  #     antonyms: [''],
  #     sentences: ['']
  #   } }],
  #   practices: [int] }
  before_action :signed_in?
  before_action :correct_user?, only: [:update, :destroy]

  # GET /api/lesson?filter=not_in_course
  # Desc: return all lessons created by current user
  #   If filter query param provided and value is 'not_in_course',
  #   return only the lessons that aren't in a course
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ id: int, title: '', course_ids: [int] }]
  # Error response:
  #   Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  def index
    lessons = Lesson.where(owner_id: session[:user_id][:value])
    lessons = lessons.select { |l| l.courses.empty? } if params[:filter] == 'not_in_course'
    render json: lessons.as_json(except: [:owner_id, :created_at, :updated_at])
  end

  # POST /api/lesson?course_id=int
  # Desc: creates a new lesson for the current user
  # Request body params:
  #   title (string - optional - defaults to 'Untitled')
  # Success response:
  #   Code: 200
  #   Content: { lesson }
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 403
  #   Content: { errors: ['Forbidden'], error_message: 'Forbidden' }
  #   (3) Code: 404
  #   Content: { errors: ['Couldn't find Course with 'id'=int'],
  #              error_message: 'Course could not be found' }
  def create
    if params[:course_id]
      course = Course.find(params[:course_id])
      if course.instructor_id != session[:user_id][:value]
        render json: { errors: ['Forbidden'], error_message: 'Forbidden' }, status: :forbidden # 403
        return
      end
    end
    lesson_params = { owner_id: session[:user_id][:value] }
    title = params[:title]
    lesson_params[:title] = title if title
    lesson = Lesson.create(lesson_params)
    if course
      course.lessons << lesson
      lesson.reload
    end
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
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Lesson with 'id'=int'],
  #              error_message: 'Lesson could not be found' }
  def show
    lesson = Lesson.includes(wordinfos: [:roots, :forms, :synonyms, :antonyms, :sentences])
                   .references(:wordinfos)
                   .find(params[:id])
    render json: lesson
  end

  # PATCH /api/lesson/:id
  # Desc: updates lesson specified by id by destroying
  #   all wordinfos for this lesson then recreating them
  # Request body params:
  #   { lesson: { lesson } }
  # Success response:
  #   Code: 200
  #   Content: { lesson }
  # Error response:
  #   (1) Code: 400
  #   Content: { errors: { title: [''] } }
  #   (2) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (3) Code: 403
  #   Content: { errors: ['Forbidden'], error_message: 'Forbidden' }
  #   (4) Code: 404
  #   Content: { errors: ['Couldn't find Lesson with 'id'=int'],
  #              error_message: 'Lesson could not be found' }
  #   (5) Code: 409
  #   Content: { errors: ['Lesson cannot be edited while it has a practice for it'],
  #              error_message: 'Lesson cannot be edited while it has a practice for it' }
  def update
    @lesson.update(title: params[:lesson][:title]) if params[:lesson]
    unless @lesson.practices.empty?
      message = 'Lesson cannot be edited while it has a practice for it'
      render json: { errors: [message], error_message: message }, status: :conflict # 409
      return
    end
    errors = check_duplicates
    unless errors.empty?
      render json: { errors: errors }, status: :bad_request # 400
      return
    end
    lesson_saved = true
    ActiveRecord::Base.transaction do
      @lesson.wordinfos.destroy_all
      @lesson.attributes = lesson_params
      unless @lesson.save
        lesson_saved = false
        raise ActiveRecord::Rollback
      end
    end
    unless lesson_saved
      render json: { errors: @lesson.errors }, status: :bad_request # 400
      return
    end
    render json: Lesson.includes(wordinfos: [:roots, :forms, :synonyms, :antonyms, :sentences])
      .references(:wordinfos).find(params[:id])
  end

  # DELETE /api/lesson/:id
  # Desc: deletes lesson specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { deleted: true }
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 403
  #   Content: { errors: ['Forbidden'], error_message: 'Forbidden' }
  #   (3) Code: 404
  #   Content: { errors: ['Couldn't find Lesson with 'id'=int'],
  #              error_message: 'Lesson could not be found' }
  def destroy
    @lesson.destroy
    render json: { deleted: true }
  end

  private

  def lesson_params
    params[:lesson][:wordinfos_attributes] = params[:lesson][:wordinfos]
    params[:lesson][:wordinfos_attributes].each do |info|
      info[:user_id] = session[:user_id][:value]
      info[:roots_attributes] = info[:roots]
      info[:forms_attributes] = info[:forms]
      info[:synonyms_attributes] = (info[:synonyms] || []).map { |s| { word: s } }
      info[:antonyms_attributes] = (info[:antonyms] || []).map { |s| { word: s } }
      info[:sentences_attributes] = (info[:sentences] || []).map { |s| { context_sentence: s } }
    end
    params.require(:lesson).permit(
      :id,
      :title,
      wordinfos_attributes: [
        :word,
        :definition,
        :part_of_speech,
        :user_id,
        roots_attributes: [:root, :meaning],
        forms_attributes: [:word, :part_of_speech],
        synonyms_attributes: [:word],
        antonyms_attributes: [:word],
        sentences_attributes: [:context_sentence]
      ]
    )
  end

  def check_duplicates
    errors = {}
    lesson = params[:lesson]
    wordinfos = lesson['wordinfos']
    wordinfos_uniq = wordinfos.uniq! { |wordinfo| wordinfo['word'].downcase }
    errors['wordinfos.word'] = ['has already been taken'] unless wordinfos_uniq.nil?
    wordinfos.each do |wordinfo|
      errors = check_duplicate_attributes wordinfo, 'roots', 'root', errors
      errors = check_duplicate_attributes wordinfo, 'forms', 'word', errors
      errors = check_duplicate_attributes wordinfo, 'synonyms', 'word', errors, false
      errors = check_duplicate_attributes wordinfo, 'antonyms', 'word', errors, false
      errors = check_duplicate_attributes wordinfo, 'sentences', 'context_sentence', errors, false
    end
    errors
  end

  def check_duplicate_attributes(wordinfo, model, attribute, errors, index = true)
    extractor = !index ? proc { |m| m.downcase } : proc { |m| m[attribute].downcase }
    if wordinfo[model] && !wordinfo[model].uniq!(&extractor).nil?
      errors["wordinfos.#{model}.#{attribute}"] = ['has already been taken']
    end
    errors
  end

  def correct_user?
    @lesson = Lesson.includes(wordinfos: [:roots, :forms, :synonyms, :antonyms, :sentences])
                    .references(:wordinfos)
                    .find(params[:id])
    return if @lesson.owner_id == session[:user_id][:value]
    render json: { errors: ['Forbidden'], error_message: 'Forbidden' }, status: :forbidden # 403
  end
end
