require 'test_helper'

class GradesControllerTest < ActionController::TestCase
  test 'GET /api/grade unauthorized' do
    get :index
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/grade success' do
    login_as_seconduser
    get :index
    assert_response :ok
    assert_json_match [grade_pattern], @response.body
  end

  test 'POST /api/grade unauthorized' do
    post :create, params: { question_id: 1 }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/grade option not found' do
    login_as_testuser
    post :create, params: { question_id: 1, value: 'test' }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Question with \'id\'=1'],
                       error_message: 'Question could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/grade value incorrect' do
    login_as_testuser
    params = { question_id: options(:probably_synonym_option2).question_id, value: 'unlikely' }
    post :create, params: params
    assert_response :ok
    assert_equal 'false', @response.body
  end

  test 'POST /api/grade value correct' do
    login_as_testuser
    params = { question_id: options(:probably_synonym_option1).question_id, value: 'likely' }
    post :create, params: params
    assert_response :ok
    assert @response.body
  end

  test 'GET /api/grade/summaries unauthorized' do
    get :index_summaries
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/grade/summaries success' do
    login_as_seconduser
    get :index_summaries
    assert_response :ok
    assert_json_match [grade_summaries_pattern], @response.body
  end

  test 'GET /api/grade/course/:id unauthorized' do
    get :course, params: { id: courses(:testcourse).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/grade/course/:id forbidden' do
    login_as_seconduser
    get :course, params: { id: courses(:testcourse).id }
    assert_response :forbidden
    error_response = { errors: ['Forbidden'], error_message: 'Forbidden' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/grade/course/:id course not found' do
    login_as_testuser
    get :course, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Course with \'id\'=1'],
                       error_message: 'Course could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/grade/course/:id success' do
    login_as_testuser
    get :course, params: { id: courses(:testcourse).id }
    assert_response :ok
    assert_json_match [{ user: seconduser_pattern, grades: [grade_pattern] }], @response.body
  end

  test 'GET /api/grade/course/:id/summaries unauthorized' do
    get :course_summaries, params: { id: courses(:testcourse).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/grade/course/:id/summaries forbidden' do
    login_as_seconduser
    get :course_summaries, params: { id: courses(:testcourse).id }
    assert_response :forbidden
    error_response = { errors: ['Forbidden'], error_message: 'Forbidden' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/grade/course/:id/summaries course not found' do
    login_as_testuser
    get :course_summaries, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Course with \'id\'=1'],
                       error_message: 'Course could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/grade/course/:id/summaries success' do
    login_as_testuser
    get :course_summaries, params: { id: courses(:testcourse).id }
    assert_response :ok
    pattern = [{ user: seconduser_pattern, lessons: [grade_summaries_pattern] }]
    assert_json_match pattern, @response.body
  end
end
