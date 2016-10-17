class Lesson < ApplicationRecord
  belongs_to :instructor, class_name: 'User'
  has_many :wordinfos, through: :lesson_wordinfos
  has_many :lesson_wordinfos
  validates :title, presence: true, length: { maximum: 255 }

  def as_json(options = {})
    super(options.merge(
      include:
        { wordinfos: {
          include: [
            { roots: { only: [:id, :word] } },
            { forms: { only: :id, include: { associated_word: { only: [:id, :word] } } } },
            { synonyms: { only: [:id, :word] } },
            { antonyms: { only: [:id, :word] } },
            { sentences: { only: [:id, :context_sentence] } }
          ],
          except: [:user_id, :created_at, :updated_at]
        } },
      except: [:instructor_id, :created_at, :updated_at]
    ))
  end
end
