require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  test 'POST /api/user/ already logged in' do
    login_as_testuser
    post :create
    assert_response :ok
    assert_json_match({ logged_in: true }, @response.body)
  end

  test 'POST /api/user/ bad request' do
    post :create, params: { user: { name: '' } }
    assert_response :bad_request
    errors = {
      name: ['can\'t be blank'],
      email: ['can\'t be blank', 'is invalid'],
      password: ['can\'t be blank', 'is too short (minimum is 6 characters)'],
      birthday: ['can\'t be blank']
    }
    assert_json_match({ errors: errors }, @response.body)
  end

  test 'POST /api/user/ email already taken' do
    post :create, params: { user: {
      name: 'Test User', email: 'testuser@test.com', password: 'TestPass', birthday: '1990-01-01'
    } }
    assert_response :conflict
    assert_json_match({ errors: { email: ['has already been taken'] } }, @response.body)
  end

  test 'POST /api/user/ success' do
    post :create, params: { user: {
      name: 'Test User', email: 'test@test.com', password: 'TestPass', birthday: '1990-01-01'
    } }
    assert_response :ok
    pattern = {
      logged_in: true,
      user: {
        id: 965022583,
        name: 'Test User',
        email: 'test@test.com',
        birthday: '1990-01-01'
      }
    }
    assert_json_match pattern, @response.body
  end

  test 'GET /api/user/email_taken email not provided' do
    get :email_taken
    assert_response :bad_request
    assert_json_match({ errors: ['Email not provided'] }, @response.body)
  end

  test 'GET /api/user/email_taken email taken' do
    get :email_taken, params: { email: 'testuser@test.com' }
    assert_response :ok
    assert @response.body
  end

  test 'GET /api/user/email_taken email not taken' do
    get :email_taken, params: { email: 'test@test.com' }
    assert_response :ok
    assert_equal 'false', @response.body
  end
end
