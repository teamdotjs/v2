class Form < ApplicationRecord
  belongs_to :wordinfo
  belongs_to :associated_word, class_name: 'Wordinfo'
  before_validation :set_objects
  validate :words_are_different
  validates_uniqueness_of :associated_word, scope: :wordinfo

  private

  def set_objects
    self.wordinfo = Wordinfo.find(wordinfo) if wordinfo && !wordinfo.id
    self.associated_word = Wordinfo.find(associated_word) if associated_word && !associated_word.id
  end

  def words_are_different
    return unless wordinfo && associated_word && wordinfo.word.casecmp(associated_word.word).zero?
    errors.add(:associated_word, 'cannot be the same word')
  end
end
