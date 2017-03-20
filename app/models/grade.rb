class Grade < ApplicationRecord
  belongs_to :user
  belongs_to :question
  validates :value, presence: true

  def as_json(options = {})
    grade =
      if options.empty? then super({
        include: { question: { only: [:id] } },
        except: [:user_id, :question_id]
      })
      else super(options)
      end
    grade['question']['prompt'] = question.prompts.first.text if grade['question']
    grade['is_correct'] = question.options.find(&:is_correct).value.casecmp(value).zero?
    birthday = grade&.[]('user')&.[]('birthday')
    grade['user']['birthday'] = birthday.to_s if birthday
    grade
  end
end
