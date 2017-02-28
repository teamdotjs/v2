require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  should belong_to(:instructor).class_name('User')
  should have_many(:course_lessons).dependent(:destroy)
  should have_many(:course_students).dependent(:destroy)
  should have_many(:lessons).through(:course_lessons)
  should have_many(:students).through(:course_students)
  should validate_length_of(:title).is_at_most(255)

  test 'course as json' do
    course = courses(:testcourse)
    course_pattern = { id: 393749808, title: 'Test Course', instructor_id: 965022582 }
    assert_json_match course_pattern, course.as_json
  end

  test 'course as json custom options' do
    course = courses(:testcourse)
    course_pattern = { id: 393749808, title: 'Test Course' }
    assert_json_match course_pattern, course.as_json(only: [:id, :title])
  end
end
