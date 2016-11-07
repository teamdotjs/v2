class Wordinfo < ApplicationRecord
  belongs_to :user
  belongs_to :lesson
  has_many :roots, inverse_of: :wordinfo, dependent: :destroy
  has_many :forms, inverse_of: :wordinfo, dependent: :destroy
  has_many :synonyms, inverse_of: :wordinfo, dependent: :destroy
  has_many :antonyms, inverse_of: :wordinfo, dependent: :destroy
  has_many :sentences, inverse_of: :wordinfo, dependent: :destroy
  accepts_nested_attributes_for :roots
  accepts_nested_attributes_for :forms
  accepts_nested_attributes_for :synonyms
  accepts_nested_attributes_for :antonyms
  accepts_nested_attributes_for :sentences
  validates :word, presence: true, length: { maximum: 255 }
  validates_uniqueness_of :word, scope: :lesson, case_sensitive: false

  def as_json(options = {})
    super(options.merge(
      include: [
        { roots: { only: [:word] } },
        { forms: { only: [:word, :part_of_speech] } },
        { synonyms: { only: [:word] } },
        { antonyms: { only: [:word] } },
        { sentences: { only: [:context_sentence] } }
      ],
      except: [:id, :user_id, :lesson_id, :created_at, :updated_at]
    ))
  end
end
