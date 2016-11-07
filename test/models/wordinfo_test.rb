require 'test_helper'

class WordinfoTest < ActiveSupport::TestCase
  should belong_to(:user)
  should belong_to(:lesson)
  should have_many(:roots).inverse_of(:wordinfo).dependent(:destroy)
  should have_many(:forms).inverse_of(:wordinfo).dependent(:destroy)
  should have_many(:synonyms).inverse_of(:wordinfo).dependent(:destroy)
  should have_many(:antonyms).inverse_of(:wordinfo).dependent(:destroy)
  should have_many(:sentences).inverse_of(:wordinfo).dependent(:destroy)
  should accept_nested_attributes_for(:roots)
  should accept_nested_attributes_for(:forms)
  should accept_nested_attributes_for(:synonyms)
  should accept_nested_attributes_for(:antonyms)
  should accept_nested_attributes_for(:sentences)
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
