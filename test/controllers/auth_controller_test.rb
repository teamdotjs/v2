require 'test_helper'

class AuthControllerTest < ActionController::TestCase
  test 'POST /api/auth/login already logged in' do
    login_as_testuser
    post :login, params: { email: 'testuser@test.com', password: 'TestPass' }
    assert_response :ok
    assert_json_match({ logged_in: true }, @response.body)
  end

  test 'POST /api/auth/login user not found' do
    post :login, params: { email: 'user@test.com', password: 'TestPass' }
    assert_response :unauthorized
    error_response = { errors: ['Invalid Email/Password Combination'],
                       error_message: 'Invalid Email/Password Combination' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/auth/login invalid password' do
    post :login, params: { email: 'testuser@test.com', password: 'password' }
    assert_response :unauthorized
    error_response = { errors: ['Invalid Email/Password Combination'],
                       error_message: 'Invalid Email/Password Combination' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/auth/login success' do
    post :login, params: { email: 'testuser@test.com', password: 'TestPass' }
    assert_response :ok
    assert_json_match user_pattern, @response.body
  end

  test 'POST /api/auth/logout not signed in' do
    post :logout
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/auth/logout success' do
    login_as_testuser
    post :logout
    assert_response :ok
    assert_json_match({ logged_in: false }, @response.body)
  end

  test 'GET /api/auth/signed_in session without user_id' do
    get :signed_in
    assert_response :unauthorized
    assert_json_match({ logged_in: false }, @response.body)
  end

  test 'GET /api/auth/signed_in user not found' do
    login_as_testuser
    users(:testuser).destroy
    get :signed_in
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find User with \'id\'=965022582'],
                       error_message: 'User could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/auth/signed_in session expired' do
    session[:user_id] = {
      value: users(:testuser).id,
      expires: 1.day.ago
    }
    get :signed_in
    assert_response :unauthorized
    assert_json_match({ logged_in: false }, @response.body)
  end

  test 'GET /api/auth/signed_in session valid' do
    login_as_testuser
    get :signed_in
    assert_response :ok
    assert_json_match({ logged_in: true, user_id: 965022582 }, @response.body)
  end
end
