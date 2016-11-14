require 'test_helper'

class SentenceTest < ActiveSupport::TestCase
  should belong_to(:wordinfo)
  should validate_presence_of(:context_sentence)

  test 'validates uniqueness of context sentence' do
    sentence = Sentence.create(
      context_sentence: 'this is probably the best test ever',
      wordinfo: wordinfos(:probably)
    )
    assert_includes sentence.errors.full_messages, 'Context sentence has already been taken'
  end

  test 'validates sentence contains word or form' do
    sentence = Sentence.create(
      context_sentence: 'Test',
      wordinfo: wordinfos(:probably)
    )
    assert_includes sentence.errors.full_messages,
                    'Context sentence doesn\'t contain the word or a form'
  end
end
