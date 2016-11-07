require 'test_helper'

class LessonTest < ActiveSupport::TestCase
  should belong_to(:owner).class_name('User')
  should have_many(:wordinfos).dependent(:destroy)
  should accept_nested_attributes_for(:wordinfos)
  should validate_length_of(:title).is_at_most(255)

  test 'lesson as json' do
    lesson = lessons(:english101)
    assert_json_match lesson_pattern, lesson.as_json
  end
end
