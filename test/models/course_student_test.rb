require 'test_helper'

class CourseStudentTest < ActiveSupport::TestCase
  should belong_to(:course)
  should belong_to(:student).class_name('User')

  test 'validates uniqueness of student in course' do
    coursestudent = CourseStudent.create(course: courses(:testcourse), student: users(:seconduser))
    assert_includes coursestudent.errors.full_messages, 'Student has already been taken'
  end

  test 'validates student is not instructor' do
    coursestudent = CourseStudent.create(course: courses(:testcourse), student: users(:testuser))
    assert_includes coursestudent.errors.full_messages, 'Student can\'t be the same as instructor'
  end
end
