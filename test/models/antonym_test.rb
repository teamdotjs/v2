require 'test_helper'

class AntonymTest < ActiveSupport::TestCase
  should belong_to(:wordinfo)
  should validate_presence_of(:word)
  should validate_length_of(:word).is_at_most(255)

  test 'validates words are different' do
    antonym = Antonym.create(word: 'Probably', wordinfo: wordinfos(:probably))
    assert_includes antonym.errors.full_messages, 'Word antonym cannot be the same word'
  end

  test 'validates uniqueness of word' do
    antonym = Antonym.create(word: 'Unlikely', wordinfo: wordinfos(:probably))
    assert_includes antonym.errors.full_messages, 'Word has already been taken'
  end
end
