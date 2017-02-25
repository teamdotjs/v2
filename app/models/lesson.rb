class Lesson < ApplicationRecord
  belongs_to :owner, class_name: 'User'
  has_many :wordinfos, dependent: :destroy
  has_many :practices, dependent: :destroy
  has_many :course_lessons, dependent: :destroy
  has_many :courses, through: :course_lessons
  before_validation { self.title = 'Untitled' if title.blank? }
  accepts_nested_attributes_for :wordinfos
  validates :title, length: { maximum: 255 }

  def as_json(options = {})
    lesson =
      if options.empty? then super({
        include: [
          { wordinfos: {
            include: [
              { roots: { only: [:root, :meaning] } },
              { forms: { only: [:word, :part_of_speech] } },
              { synonyms: { only: [:word] } },
              { antonyms: { only: [:word] } },
              { sentences: { only: [:context_sentence] } }
            ],
            except: [:id, :user_id, :lesson_id, :created_at, :updated_at]
          } },
          { practices: { only: [:id] } }
        ],
        except: [:owner_id, :created_at, :updated_at]
      })
      else super(options)
      end
    lesson&.[]('wordinfos')&.each do |wordinfo|
      wordinfo['synonyms'].map! { |synonym| synonym['word'] }
      wordinfo['antonyms'].map! { |antonym| antonym['word'] }
    end
    lesson&.[]('practices')&.map! { |practice| practice['id'] }
    lesson
  end
end
