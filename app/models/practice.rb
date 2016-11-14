class Practice < ApplicationRecord
  self.inheritance_column = 'object_type'
  belongs_to :lesson
  has_many :questions, dependent: :destroy
  accepts_nested_attributes_for :questions
  enum type: { 'definition': 0, 'synonym': 1, 'root': 2, 'sentence': 3 }

  def as_json(options = {})
    practice = super(options.merge(
      include: {
        questions: {
          include: [
            { prompts: { only: [:text] } },
            { options: { only: [:value, :is_correct] } }
          ],
          except: [:practice_id, :created_at, :updated_at]
        }
      },
      except: [:lesson_id, :created_at, :updated_at]
    ))
    practice['questions'].each do |question|
      question['prompts'].map! { |prompt| prompt['text'] }
    end
    practice
  end
end
