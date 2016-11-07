class Form < ApplicationRecord
  belongs_to :wordinfo
  validates :word, presence: true, length: { maximum: 255 }
  validates :part_of_speech, length: { maximum: 255 }
end
