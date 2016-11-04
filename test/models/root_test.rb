require 'test_helper'

class RootTest < ActiveSupport::TestCase
  should belong_to(:wordinfo)
  should validate_presence_of(:word)
  should validate_length_of(:word).is_at_most(255)

  test 'validates uniqueness of word' do
    root = Root.create(word: 'Prob', wordinfo: wordinfos(:probably))
    assert_includes root.errors.full_messages, 'Word has already been taken'
  end
end
