class Option < ApplicationRecord
  belongs_to :question
  validates :value, presence: true, length: { maximum: 255 }
  validates_uniqueness_of :value, scope: :question, case_sensitive: false
  validate :one_correct_per_question

  private

  def one_correct_per_question
    return unless is_correct
    return unless question.options.any?(&:is_correct)
    errors.add(:question, 'has multiple correct answers')
  end
end
