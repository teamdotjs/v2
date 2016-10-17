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

  def as_json(options = {})
    super(options.merge(
      include: [
        { roots: { only: [:id, :word] } },
        { forms: { only: :id, include: { associated_word: { only: [:id, :word] } } } },
        { synonyms: { only: [:id, :word] } },
        { antonyms: { only: [:id, :word] } },
        { sentences: { only: [:id, :context_sentence] } }
      ],
      except: [:user_id, :created_at, :updated_at]
    ))
  end
end
