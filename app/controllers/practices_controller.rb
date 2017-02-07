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
  #     errors: ['There are not enough words in this practice to generate a practice'],
  #     error_message: 'There are not enough words in this practice to generate a practice'
  #   }
  def create
    lesson = Lesson.find(params[:id])
    type = params[:type]
    begin
      practice = Practice.create(lesson: lesson, type: type)
    rescue ArgumentError => error
      render json: { errors: { type: [error.message] } }, status: :bad_request # 400
      return
    end
    questions_attributes = case type
                           when 'sentence' then generate_sentence_questions lesson
                           when 'definition' then generate_definition_questions lesson
                           when 'synonym' then generate_synonym_questions lesson
                           end
    if questions_attributes.nil?
      error_message = 'There are not enough words in this practice to generate a practice'
      render json: { errors: [error_message], error_message: error_message },
             status: :conflict # 409
      return
    end
    practice.attributes = { questions_attributes: questions_attributes }
    practice.save
    render json: practice.reload
  end

  private

  def generate_sentence_questions(lesson)
    questions_attributes = []
    lesson.wordinfos.each do |wordinfo|
      sentence = wordinfo.sentences.first.context_sentence
      words = wordinfo.forms.map(&:word)
      words << wordinfo.word
      answer = ''
      words.each { |word| answer = word if sentence.include? word }
      questions_attributes << {
        type: 'fitb',
        prompts_attributes: [{ text: sentence }],
        options_attributes: [{ value: answer, is_correct: true }]
      }
    end
    questions_attributes
  end

  def generate_definition_questions(lesson)
    return nil if lesson.wordinfos.length < 4
    questions_attributes = []
    words = lesson.wordinfos.map(&:word)
    lesson.wordinfos.each do |wordinfo|
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
    return nil if lesson.wordinfos.length < 4
    questions_attributes = []
    synonyms = []
    lesson.wordinfos.map { |wordinfo| synonyms += wordinfo.synonyms.map(&:word) }
    puts "SYNONYMS: #{synonyms}"
    lesson.wordinfos.each do |wordinfo|
      puts "WORDINFO SYNONYMS: #{wordinfo.synonyms.as_json}"
      correct_options = wordinfo.synonyms.map(&:word)
      puts "CORRECT: #{correct_options}"
      incorrect_options = (synonyms - correct_options).sample(3)
      puts "INCORRECT: #{incorrect_options}"
      # questions_attributes << {
      #   type: 'mc',
      #   prompts_attributes: [{ text: "What is a synonym of #{wordinfo.word}?" }],
      #   options_attributes: [
      #     { value: correct_options[0], is_correct: true },
      #     { value: incorrect_options[0], is_correct: false },
      #     { value: incorrect_options[1], is_correct: false },
      #     { value: incorrect_options[2], is_correct: false }
      #   ]
      # }
    end
    questions_attributes
  end
end
