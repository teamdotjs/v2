class Wordinfo < ApplicationRecord
  belongs_to :user
  has_many :lessons, through: :lesson_wordinfos
  has_many :lesson_wordinfos
  has_many :roots, dependent: :destroy
  has_many :forms, dependent: :destroy
  has_many :synonyms, dependent: :destroy
  has_many :antonyms, dependent: :destroy
  has_many :sentences, dependent: :destroy
  validates :word, presence: true, length: { maximum: 255 }
end
