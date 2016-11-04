class Wordinfo < ApplicationRecord
  after_destroy { Form.where(associated_word_id: id).destroy_all }
  belongs_to :user
  belongs_to :lesson
  has_many :roots, dependent: :destroy
  has_many :forms, dependent: :destroy
  has_many :synonyms, dependent: :destroy
  has_many :antonyms, dependent: :destroy
  has_many :sentences, dependent: :destroy
  accepts_nested_attributes_for :roots, allow_destroy: true
  accepts_nested_attributes_for :forms, allow_destroy: true
  accepts_nested_attributes_for :synonyms, allow_destroy: true
  accepts_nested_attributes_for :antonyms, allow_destroy: true
  accepts_nested_attributes_for :sentences, allow_destroy: true
  validates :word, presence: true, length: { maximum: 255 }
  validates_uniqueness_of :word, scope: :lesson, case_sensitive: false

  def as_json(options = {})
    super(options.merge(
      include: [
        { roots: { only: [:id, :word] } },
        { forms: { only: :id, include: { associated_word: {
          only: [:id, :word, :part_of_speech]
        } } } },
        { synonyms: { only: [:id, :word] } },
        { antonyms: { only: [:id, :word] } },
        { sentences: { only: [:id, :context_sentence] } }
      ],
      except: [:user_id, :lesson_id, :created_at, :updated_at]
    ))
  end
end
