require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  should belong_to(:practice)
  should have_many(:prompts).dependent(:destroy)
  should have_many(:options).dependent(:destroy)
  should accept_nested_attributes_for(:prompts)
  should accept_nested_attributes_for(:options)
  should define_enum_for(:type).with([:mc, :fitb])
end
