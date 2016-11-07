class Antonym < ApplicationRecord
  belongs_to :wordinfo
  validates :word, presence: true, length: { maximum: 255 }
  validate :words_are_different
  validates_uniqueness_of :word, scope: :wordinfo, case_sensitive: false

  private

  def words_are_different
    return unless word && wordinfo && wordinfo.word.casecmp(word).zero?
    errors.add(:word, 'antonym cannot be the same word')
  end
end
