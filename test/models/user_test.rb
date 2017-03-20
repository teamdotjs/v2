require 'test_helper'

class UserTest < ActiveSupport::TestCase
  should have_many(:wordinfos)
  should have_many(:lessons).with_foreign_key('owner_id')
  should have_many(:course_students).dependent(:destroy).with_foreign_key('student_id')
  should have_many(:courses).through(:course_students)
  should have_many(:grades).dependent(:destroy)
  should validate_presence_of(:name)
  should validate_presence_of(:email)
  should allow_value('test@test.com').for(:email)
  should_not allow_value('test').for(:email)
  should validate_uniqueness_of(:email).case_insensitive
  should have_secure_password
  should validate_length_of(:password).is_at_least(6).on(:create)

  test 'validates birthday is present' do
    user = users(:testuser)
    user.birthday = nil
    user.save
    assert_includes user.errors.full_messages, 'Birthday can\'t be blank'
  end

  test 'validates birthday is not today or in future' do
    user = users(:testuser)
    user.birthday = Date.today
    user.save
    assert_includes user.errors.full_messages, 'Birthday can\'t be today or in the future'
  end

  test 'validates birthday is not earlier than 1900' do
    user = users(:testuser)
    user.birthday = 200.years.ago
    user.save
    assert_includes user.errors.full_messages, 'Birthday can\'t be earlier than 1900'
  end

  test 'user as json' do
    user = users(:testuser)
    assert_json_match testuser_pattern, user.as_json
  end

  test 'user as json custom options' do
    user = users(:testuser)
    pattern = { id: 965022582, name: 'Test User', email: 'testuser@test.com' }
    assert_json_match pattern, user.as_json(only: [:id, :name, :email])
  end
end
