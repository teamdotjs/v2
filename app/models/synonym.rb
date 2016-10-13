class Synonym < ApplicationRecord
  belongs_to :wordinfo
  before_validation { self.wordinfo = Wordinfo.find(wordinfo) if wordinfo && !wordinfo.id }
  validates :word, presence: true, length: { maximum: 255 }
  validate :words_are_different
  validates_uniqueness_of :word, scope: :wordinfo, case_sensitive: false

  private

  def words_are_different
    return unless word && wordinfo && wordinfo.word.casecmp(word).zero?
    errors.add(:word, 'synonym cannot be the same word')
  end
end
