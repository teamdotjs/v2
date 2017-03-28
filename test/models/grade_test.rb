require 'test_helper'

class GradeTest < ActiveSupport::TestCase
  should belong_to(:user)
  should belong_to(:question)
  should validate_presence_of(:value)

  test 'grade as json' do
    grade = grades(:grade_correct_answer)
    assert_json_match grade_pattern, grade.as_json
  end

  test 'grade as json custom options' do
    grade = grades(:grade_correct_answer)
    pattern = { id: 791338413, is_correct: true }
    assert_json_match pattern, grade.as_json(only: [:id])
  end
end
