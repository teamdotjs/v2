require 'test_helper'

class OptionTest < ActiveSupport::TestCase
  should belong_to(:question)
  should validate_presence_of(:value)
  should validate_length_of(:value).is_at_most(255)

  test 'validates uniqueness of value' do
    option = Option.create(
      question: questions(:probably_synonym_q),
      value: 'Likely',
      is_correct: false
    )
    assert_includes option.errors.full_messages, 'Value has already been taken'
  end

  test 'validates one correct per question' do
    option = Option.create(
      question: questions(:probably_synonym_q),
      value: 'test',
      is_correct: true
    )
    assert_includes option.errors.full_messages, 'Question has multiple correct answers'
  end
end
