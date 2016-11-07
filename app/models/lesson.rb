class Lesson < ApplicationRecord
  belongs_to :owner, class_name: 'User'
  has_many :wordinfos, dependent: :destroy
  before_validation { self.title = 'Untitled' if title.blank? }
  accepts_nested_attributes_for :wordinfos
  validates :title, length: { maximum: 255 }

  def as_json(options = {})
    super(options.merge(
      include:
        { wordinfos: {
          include: [
            { roots: { only: [:id, :word] } },
            { forms: { only: [:id, :word, :part_of_speech] } },
            { synonyms: { only: [:id, :word] } },
            { antonyms: { only: [:id, :word] } },
            { sentences: { only: [:id, :context_sentence] } }
          ],
          except: [:user_id, :lesson_id, :created_at, :updated_at]
        } },
      except: [:owner_id, :created_at, :updated_at]
    ))
  end
end
