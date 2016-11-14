class Prompt < ApplicationRecord
  belongs_to :question
  validates :text, presence: true
  validates_uniqueness_of :text, scope: :question, case_sensitive: false
end
