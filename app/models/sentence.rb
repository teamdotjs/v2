class Sentence < ApplicationRecord
  belongs_to :wordinfo
  validates :context_sentence, presence: true
  validates_uniqueness_of :context_sentence, scope: :wordinfo, case_sensitive: false
end
