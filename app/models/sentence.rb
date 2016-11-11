class Sentence < ApplicationRecord
  belongs_to :wordinfo
  validates :context_sentence, presence: true
  validates_uniqueness_of :context_sentence, scope: :wordinfo, case_sensitive: false
  validate :sentence_contains_word_or_form

  private

  def sentence_contains_word_or_form
    words = []
    words = wordinfo.forms.map(&:word) if wordinfo
    words << wordinfo.word if wordinfo
    return if words.any? { |word| context_sentence.include? word }
    errors.add(:context_sentence, 'doesn\'t contain the word or a form')
  end
end
