require 'test_helper'

class PracticesControllerTest < ActionController::TestCase
  test 'GET /api/lesson/:id/practice unauthorized' do
    get :index, params: { id: 1 }
    assert_response :unauthorized
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'GET /api/lesson/:id/practice lesson not found' do
    login_as_testuser
    get :index, params: { id: 1 }
    assert_response :not_found
    assert_json_match({ errors: ['Not Found'] }, @response.body)
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
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'GET /api/lesson/:id/practice/:p_id practice not found' do
    login_as_testuser
    get :show, params: { id: 1, p_id: 1 }
    assert_response :not_found
    assert_json_match({ errors: ['Not Found'] }, @response.body)
  end

  test 'GET /api/lesson/:id/practice/:p_id success' do
    login_as_testuser
    get :show, params: { id: lessons(:english101).id, p_id: practices(:synonym_mc).id }
    assert_response :ok
    assert_json_match practice_pattern, @response.body
  end
end
