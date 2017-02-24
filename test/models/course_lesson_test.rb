require 'test_helper'

class CourseLessonTest < ActiveSupport::TestCase
  should belong_to(:course)
  should belong_to(:lesson)

  test 'validates uniqueness of lesson in course' do
    courselesson = CourseLesson.create(course: courses(:testcourse), lesson: lessons(:english101))
    assert_includes courselesson.errors.full_messages, 'Lesson has already been taken'
  end

  test 'validates lesson belongs to instructor' do
    lesson = Lesson.create(owner: users(:seconduser))
    courselesson = CourseLesson.create(course: courses(:testcourse), lesson: lesson)
    error_message = 'Lesson can\'t be added to a different instructor\'s course'
    assert_includes courselesson.errors.full_messages, error_message
  end
end
