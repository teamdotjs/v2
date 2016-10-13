class Sentence < ApplicationRecord
  belongs_to :wordinfo
  before_validation { self.wordinfo = Wordinfo.find(wordinfo) if wordinfo && !wordinfo.id }
  validates :context_sentence, presence: true
  validates_uniqueness_of :context_sentence, scope: :wordinfo, case_sensitive: false
end
