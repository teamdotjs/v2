class Root < ApplicationRecord
  belongs_to :wordinfo
  before_validation { self.wordinfo = Wordinfo.find(wordinfo) if wordinfo && !wordinfo.id }
  validates :word, presence: true, length: { maximum: 255 }
  validates_uniqueness_of :word, scope: :wordinfo, case_sensitive: false
end
