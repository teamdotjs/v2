require 'test_helper'

class PromptTest < ActiveSupport::TestCase
  should belong_to(:question)
  should validate_presence_of(:text)

  test 'validates uniqueness of text' do
    prompt = Prompt.create(
      question: questions(:probably_synonym_q),
      text: 'what is the synonym of probably?'
    )
    assert_includes prompt.errors.full_messages, 'Text has already been taken'
  end
end
