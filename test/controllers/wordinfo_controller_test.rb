require 'test_helper'

class WordinfoControllerTest < ActionController::TestCase
  test 'GET /api/wordinfo unauthorized' do
    get :index
    assert_response :unauthorized
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'GET /api/wordinfo success' do
    login_as_testuser
    get :index
    assert_response :ok
    assert_json_match lesson_pattern[:wordinfos], @response.body
  end

  test 'GET /api/wordinfo/:id unauthorized' do
    get :show, params: { id: wordinfos(:probably).id }
    assert_response :unauthorized
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'GET /api/wordinfo/:id wordinfo not found' do
    login_as_testuser
    get :show, params: { id: 1 }
    assert_response :not_found
    assert_json_match({ errors: ['Not Found'] }, @response.body)
  end

  test 'GET /api/wordinfo/:id success' do
    login_as_testuser
    get :show, params: { id: wordinfos(:probably).id }
    assert_response :ok
    assert_json_match lesson_pattern[:wordinfos][0], @response.body
  end
end
