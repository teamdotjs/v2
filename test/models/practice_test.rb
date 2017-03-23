require 'test_helper'

class PracticeTest < ActiveSupport::TestCase
  should belong_to(:lesson)
  should have_many(:questions).dependent(:destroy)
  should accept_nested_attributes_for(:questions)
  should define_enum_for(:type).with([:definition, :synonym, :root, :sentence])
  should validate_presence_of(:type)

  test 'validates uniqueness of type' do
    practice = Practice.create(lesson: lessons(:english101), type: 'synonym')
    assert_includes practice.errors.full_messages, 'Type has already been taken'
  end

  test 'practice as json' do
    practice = practices(:synonym_mc)
    assert_json_match practice_pattern, practice.as_json
  end

  test 'practice as json custom options' do
    practice = practices(:synonym_mc)
    pattern = { id: 907223594, type: 'synonym' }
    assert_json_match pattern, practice.as_json(only: [:id, :type])
  end
end
