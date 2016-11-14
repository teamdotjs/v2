require 'test_helper'

class RootTest < ActiveSupport::TestCase
  should belong_to(:wordinfo)
  should validate_presence_of(:root)
  should validate_length_of(:root).is_at_most(255)
  should validate_length_of(:meaning).is_at_most(255)

  test 'validates uniqueness of root' do
    root = Root.create(root: 'Prob', wordinfo: wordinfos(:probably))
    assert_includes root.errors.full_messages, 'Root has already been taken'
  end
end
