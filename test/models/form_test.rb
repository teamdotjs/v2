require 'test_helper'

class FormTest < ActiveSupport::TestCase
  should belong_to(:wordinfo)
  should validate_presence_of(:word)
  should validate_length_of(:word).is_at_most(255)
  should validate_length_of(:part_of_speech).is_at_most(255)
end
