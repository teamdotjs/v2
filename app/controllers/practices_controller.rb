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
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Practice with 'id'=int'],
  #              error_message: 'Practice could not be found' }
  def show
    render json: Practice.find(params[:p_id])
  end

  # ***ONLY WORKS FOR FITB SENTENCES***
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
  #   (2) Code: 400
  #   Content: { errors: { type: ["'' is not a valid type"] } }
  def create
    lesson = Lesson.find(params[:id])
    type = params[:type]
    begin
      practice = Practice.create(lesson: lesson, type: type)
    rescue ArgumentError => error
      render json: { errors: { type: [error.message] } }, status: :bad_request # 400
      return
    end
    questions_attributes = generate_questions lesson
    practice.attributes = { questions_attributes: questions_attributes }
    practice.save
    render json: practice.reload
  end

  private

  def generate_questions(lesson)
    questions_attributes = []
    lesson.wordinfos.each do |wordinfo|
      sentence = wordinfo.sentences.first.context_sentence
      words = wordinfo.forms.map(&:word)
      words << wordinfo.word
      answer = ''
      words.each { |word| answer = word if sentence.include? word }
      sentence.sub!(answer, '__________')
      questions_attributes << {
        type: 'fitb',
        prompts_attributes: [{ text: sentence }],
        options_attributes: [{ value: answer, is_correct: true }]
      }
    end
    questions_attributes
  end
end
