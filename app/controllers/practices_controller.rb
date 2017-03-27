class PracticesController < ApplicationController
  # { practice } = {
  #   id: int,
  #   type: '',
  #   questions: [{
  #     id: int,
  #     type: '',
  #     prompts: [''],
  #     options: ['']
  #   }] }
  before_action :signed_in?
  before_action :lesson_correct_user?, only: :create
  before_action :practice_correct_user?, only: :destroy

  # GET /api/lesson/:id/practice
  # Desc: return all practices in the lesson specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ practice }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Lesson with 'id'=int'],
  #              error_message: 'Lesson could not be found' }
  def index
    practices = Lesson.find(params[:id]).practices.as_json
    practices.each do |practice|
      practice['questions'].each { |q| q['options'].shuffle! }
    end
    render json: practices
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
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Practice with 'id'=int'],
  #              error_message: 'Practice could not be found' }
  def show
    practice = Practice.find(params[:p_id]).as_json
    practice['questions'].each { |q| q['options'].shuffle! }
    render json: practice
  end

  # POST /api/lesson/:id/practice/
  # Desc: create a practice and auto generate questions
  # Request body params:
  #   type (string)
  # Success response:
  #   Code: 200
  #   Content: { practice }
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Lesson with 'id'=int'],
  #              error_message: 'Lesson could not be found' }
  #   (3) Code: 400
  #   Content: { errors: { type: ["'' is not a valid type"] } }
  #   (4) Code: 409
  #   Content: {
  #     errors: ['There are not enough words in this lesson to generate a practice'],
  #     error_message: 'There are not enough words in this lesson to generate a practice'
  #   }
  def create
    type = params[:type]
    json_rendered = false
    practice = nil
    # rollback practice creation if there's an error creating the practice or generating questions
    ActiveRecord::Base.transaction do
      begin
        practice = Practice.create(lesson: @lesson, type: type)
      rescue ArgumentError => error
        render json: { errors: { type: [error.message] } }, status: :bad_request # 400
        json_rendered = true
        raise ActiveRecord::Rollback
      end
      # catch duplicate practice error
      unless practice.errors.empty?
        render json: { errors: practice.errors }, status: :bad_request # 400
        json_rendered = true
        raise ActiveRecord::Rollback
      end

      # question generation
      questions_attributes = case type
                             when 'sentence' then generate_sentence_questions @lesson
                             when 'definition' then generate_definition_questions @lesson
                             when 'synonym' then generate_synonym_questions @lesson
                             end
      # question generation errors
      if questions_attributes[0].key?(:error_message)
        message = questions_attributes[0][:error_message]
        render json: { errors: [message], error_message: message }, status: :conflict # 409
        json_rendered = true
        raise ActiveRecord::Rollback
      end
      # save questions if no errors
      practice.attributes = { questions_attributes: questions_attributes }
      practice.save
    end
    return if json_rendered
    practice = practice.reload.as_json
    practice['questions'].each { |q| q['options'].shuffle! }
    render json: practice
  end

  # DELETE /api/practice/:id
  # Desc: deletes practice specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { deleted: true }
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Practice with 'id'=int'],
  #              error_message: 'Practice could not be found' }
  def destroy
    @practice.destroy
    render json: { deleted: true }
  end

  private

  def generate_sentence_questions(lesson)
    questions_attributes = []
    lesson.wordinfos.each do |wordinfo|
      if wordinfo.sentences.empty?
        return [{ error_message: "#{wordinfo.word} does not have any context sentences" }]
      end
      sentence = wordinfo.sentences.first.context_sentence
      words = wordinfo.forms.map(&:word)
      words << wordinfo.word
      answer = ''
      words.each { |word| answer = word if sentence.include? word }
      if answer == ''
        return [{ error_message: "#{wordinfo.word} has an invalid context sentence" }]
      end
      sentence.sub!(answer, '__________') # replace answer with underscores
      questions_attributes << {
        type: 'fitb',
        prompts_attributes: [{ text: sentence }],
        options_attributes: [{ value: answer, is_correct: true }]
      }
    end
    questions_attributes
  end

  def generate_definition_questions(lesson)
    if lesson.wordinfos.length < 4
      return [{
        error_message: 'There are not enough words in this lesson to generate a practice'
      }]
    end
    questions_attributes = []
    words = lesson.wordinfos.map(&:word)
    lesson.wordinfos.each do |wordinfo|
      if wordinfo.definition.blank?
        return [{ error_message: "#{wordinfo.word} does not have a definition" }]
      end
      correct_option = wordinfo.word
      incorrect_options = (words - [correct_option]).sample(3)
      questions_attributes << {
        type: 'mc',
        prompts_attributes: [{ text: wordinfo.definition }],
        options_attributes: [
          { value: correct_option, is_correct: true },
          { value: incorrect_options[0], is_correct: false },
          { value: incorrect_options[1], is_correct: false },
          { value: incorrect_options[2], is_correct: false }
        ]
      }
    end
    questions_attributes
  end

  def generate_synonym_questions(lesson)
    if lesson.wordinfos.length < 4
      return [{
        error_message: 'There are not enough words in this lesson to generate a practice'
      }]
    end
    questions_attributes = []
    synonyms = []
    lesson.wordinfos.map { |wordinfo| synonyms += wordinfo.synonyms.map(&:word) }
    lesson.wordinfos.each do |wordinfo|
      correct_options = wordinfo.synonyms.map(&:word)
      incorrect_options = (synonyms - correct_options)
      if correct_options.empty? || incorrect_options.length < 3
        return [{
          error_message: 'There are not enough synonyms in this lesson to generate a practice'
        }]
      end
      random_incorrect = incorrect_options.sample(3)
      questions_attributes << {
        type: 'mc',
        prompts_attributes: [{ text: "What is a synonym of #{wordinfo.word}?" }],
        options_attributes: [
          { value: correct_options[0], is_correct: true },
          { value: random_incorrect[0], is_correct: false },
          { value: random_incorrect[1], is_correct: false },
          { value: random_incorrect[2], is_correct: false }
        ]
      }
    end
    questions_attributes
  end

  def lesson_correct_user?
    @lesson = Lesson.find(params[:id])
    return if @lesson.owner_id == session[:user_id][:value]
    render json: { errors: ['Forbidden'], error_message: 'Forbidden' }, status: :forbidden # 403
  end

  def practice_correct_user?
    @practice = Practice.find(params[:id])
    return if @practice.lesson.owner_id == session[:user_id][:value]
    render json: { errors: ['Forbidden'], error_message: 'Forbidden' }, status: :forbidden # 403
  end
end
