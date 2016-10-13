class LessonWordinfo < ApplicationRecord
  belongs_to :lesson
  belongs_to :wordinfo
  before_validation :set_objects
  validate :uniqueness_of_word_in_lesson

  private

  def set_objects
    self.lesson = Lesson.find(lesson) if !lesson && !lesson.id
    self.wordinfo = Wordinfo.find(wordinfo) if !wordinfo && !wordinfo.id
  end

  def uniqueness_of_word_in_lesson
    return if lesson.nil? || wordinfo.nil?
    lesson.wordinfos.each do |info|
      if info.word.casecmp(wordinfo.word).zero?
        errors.add(:wordinfo, 'is already in this lesson')
        break
      end
    end
  end
end
