require 'test_helper'

class FormTest < ActiveSupport::TestCase
  should belong_to(:wordinfo)
  should belong_to(:associated_word).class_name('Wordinfo')

  test 'validates words are different' do
    user = users(:testuser)
    lesson = Lesson.create(owner: user)
    wordinfo = Wordinfo.create(word: 'Probably', lesson: lesson, user: user)
    form = Form.create(wordinfo: wordinfos(:probably), associated_word: wordinfo)
    assert_includes form.errors.full_messages, 'Associated word cannot be the same word'
  end

  test 'validates uniqueness of word' do
    form = Form.create(wordinfo: wordinfos(:probably), associated_word: wordinfos(:probable))
    assert_includes form.errors.full_messages, 'Associated word has already been taken'
  end
end
