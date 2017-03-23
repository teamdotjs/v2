class CourseStudent < ApplicationRecord
  belongs_to :course
  belongs_to :student, class_name: 'User'
  validates_uniqueness_of :student, scope: :course
  validate :student_is_not_instructor

  private

  def student_is_not_instructor
    return unless course.instructor_id == student_id
    errors.add(:student, 'can\'t be the same as instructor')
  end
end
