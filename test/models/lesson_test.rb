require 'test_helper'

class LessonTest < ActiveSupport::TestCase
  should belong_to(:owner).class_name('User')
  should have_many(:wordinfos).dependent(:destroy)
  should have_many(:course_lessons).dependent(:destroy)
  should have_many(:courses).through(:course_lessons)
  should accept_nested_attributes_for(:wordinfos)
  should validate_length_of(:title).is_at_most(255)

  test 'lesson as json' do
    lesson = lessons(:english101)
    assert_json_match lesson_pattern, lesson.as_json
  end

  test 'lesson as json custom options' do
    lesson = lessons(:english101)
    pattern = { id: 318230600, title: 'English 101', course_ids: [393749808] }
    assert_json_match pattern, lesson.as_json(only: [:id, :title])
  end
end
