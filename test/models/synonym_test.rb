require 'test_helper'

class SynonymTest < ActiveSupport::TestCase
  should belong_to(:wordinfo)
  should validate_presence_of(:word)
  should validate_length_of(:word).is_at_most(255)

  test 'validates words are different' do
    synonym = Synonym.create(word: 'Probably', wordinfo: wordinfos(:probably))
    assert_includes synonym.errors.full_messages, 'Word synonym cannot be the same word'
  end

  test 'validates uniqueness of word' do
    synonym = Synonym.create(word: 'Likely', wordinfo: wordinfos(:probably))
    assert_includes synonym.errors.full_messages, 'Word has already been taken'
  end
end
