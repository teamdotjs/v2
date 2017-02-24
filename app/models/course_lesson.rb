class CourseLesson < ApplicationRecord
  belongs_to :course
  belongs_to :lesson
  validates_uniqueness_of :lesson, scope: :course
  validate :lesson_belongs_to_instructor

  private

  def lesson_belongs_to_instructor
    return if course.instructor_id == lesson.owner_id
    errors.add(:lesson, 'can\'t be added to a different instructor\'s course')
  end
end
