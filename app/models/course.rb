class Course < ApplicationRecord
  belongs_to :instructor, class_name: 'User'
  has_many :course_lessons, dependent: :destroy
  has_many :course_students, dependent: :destroy
  has_many :lessons, through: :course_lessons
  has_many :students, through: :course_students
  validates :title, length: { maximum: 255 }

  def as_json(options = {})
    if options.empty? then super({
      except: [:created_at, :updated_at]
    })
    else super(options)
    end
  end
end
