require 'test_helper'

class PracticeTest < ActiveSupport::TestCase
  should belong_to(:lesson)
  should have_many(:questions).dependent(:destroy)
  should accept_nested_attributes_for(:questions)
  should define_enum_for(:type).with([:definition, :synonym, :root, :sentence])

  test 'practice as json' do
    practice = practices(:synonym_mc)
    assert_json_match practice_pattern, practice.as_json
  end
end
