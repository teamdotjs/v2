require 'test_helper'

class PracticesControllerTest < ActionController::TestCase
  test 'GET /api/lesson/:id/practice unauthorized' do
    get :index, params: { id: 1 }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/lesson/:id/practice lesson not found' do
    login_as_testuser
    get :index, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Lesson with \'id\'=1'],
                       error_message: 'Lesson could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/lesson/:id/practice success' do
    login_as_testuser
    get :index, params: { id: lessons(:english101).id }
    assert_response :ok
    assert_json_match [practice_pattern], @response.body
  end

  test 'GET /api/lesson/:id/practice/:p_id unauthorized' do
    get :show, params: { id: 1, p_id: 1 }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/lesson/:id/practice/:p_id practice not found' do
    login_as_testuser
    get :show, params: { id: 1, p_id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Practice with \'id\'=1'],
                       error_message: 'Practice could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/lesson/:id/practice/:p_id success' do
    login_as_testuser
    get :show, params: { id: lessons(:english101).id, p_id: practices(:synonym_mc).id }
    assert_response :ok
    assert_json_match practice_pattern, @response.body
  end

  test 'POST /api/lesson/:id/practice/ unauthorized' do
    post :create, params: { id: 1 }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/lesson/:id/practice/ lesson not found' do
    login_as_testuser
    post :create, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Lesson with \'id\'=1'],
                       error_message: 'Lesson could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/lesson/:id/practice/ type not valid' do
    login_as_testuser
    post :create, params: { id: lessons(:english101).id, type: 'a' }
    assert_response :bad_request
    assert_json_match({ errors: { type: ['\'a\' is not a valid type'] } }, @response.body)
  end

  test 'POST /api/lesson/:id/practice/ success' do
    login_as_testuser
    post :create, params: { id: lessons(:english101).id, type: 'sentence' }
    practice = {
      id: 907223595,
      type: 'sentence',
      questions: [{
        id: 784075758,
        type: 'fitb',
        prompts: ['This is __________ the best test ever'],
        options: ['probably']
      }]
    }
    assert_response :ok
    assert_json_match practice, @response.body
  end
end
