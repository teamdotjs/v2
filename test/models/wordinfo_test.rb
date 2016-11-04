require 'test_helper'

class WordinfoTest < ActiveSupport::TestCase
  should belong_to(:user)
  should belong_to(:lesson)
  should have_many(:roots).dependent(:destroy)
  should have_many(:forms).dependent(:destroy)
  should have_many(:synonyms).dependent(:destroy)
  should have_many(:antonyms).dependent(:destroy)
  should have_many(:sentences).dependent(:destroy)
  should accept_nested_attributes_for(:roots).allow_destroy(true)
  should accept_nested_attributes_for(:forms).allow_destroy(true)
  should accept_nested_attributes_for(:synonyms).allow_destroy(true)
  should accept_nested_attributes_for(:antonyms).allow_destroy(true)
  should accept_nested_attributes_for(:sentences).allow_destroy(true)
  should validate_presence_of(:word)
  should validate_length_of(:word).is_at_most(255)

  test 'validates uniqueness of word' do
    assert true
  end

  test 'wordinfo as json' do
    wordinfo = wordinfos(:probably)
    assert_json_match lesson_pattern[:wordinfos][0], wordinfo.as_json
  end
end
