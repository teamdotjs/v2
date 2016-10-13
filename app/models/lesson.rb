class Lesson < ApplicationRecord
  belongs_to :instructor, class_name: 'User'
  has_many :wordinfos, through: :lesson_wordinfos
  has_many :lesson_wordinfos
  validates :title, presence: true, length: { maximum: 255 }
end
