require 'test_helper'

class LessonsControllerTest < ActionController::TestCase
  test 'GET /api/lesson/all unauthorized' do
    get :all
    assert_response :unauthorized
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'GET /api/lesson/all success' do
    login_as_testuser
    get :all
    assert_response :ok
    assert_json_match [lesson_pattern], @response.body
  end

  test 'GET /api/lesson/:id unauthorized' do
    get :show, params: { id: lessons(:english101).id }
    assert_response :unauthorized
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'GET /api/lesson/:id lesson not found' do
    login_as_testuser
    get :show, params: { id: 1 }
    assert_response :not_found
    assert_json_match({ errors: ['Not Found'] }, @response.body)
  end

  test 'GET /api/lesson/:id success' do
    login_as_testuser
    get :show, params: { id: lessons(:english101).id }
    assert_response :ok
    assert_json_match lesson_pattern, @response.body
  end

  test 'POST /api/lesson/ unauthorized' do
    post :create
    assert_response :unauthorized
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'POST /api/lesson/ title defaults to Untitled if not provided' do
    login_as_testuser
    post :create
    assert_response :ok
    pattern = { id: 318230601, title: 'Untitled', wordinfos: [] }
    assert_json_match pattern, @response.body
  end

  test 'PATCH /api/lesson/:id unauthorized' do
    patch :update, params: { id: lessons(:english101).id }
    assert_response :unauthorized
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'PATCH /api/lesson/:id lesson not found' do
    login_as_testuser
    patch :update, params: { id: 1 }
    assert_response :not_found
    assert_json_match({ errors: ['Not Found'] }, @response.body)
  end

  test 'PATCH /api/lesson/:id bad request (wordinfo word blank)' do
    login_as_testuser
    lesson = lessons(:english101)
    lesson.wordinfos[0].word = ''
    patch :update, params: { id: lesson.id, lesson: lesson.as_json }
    assert_response :bad_request
    assert_json_match({ errors: { 'wordinfos.word': ['can\'t be blank'] } }, @response.body)
  end

  test 'PATCH /api/lesson/:id success' do
    login_as_testuser
    lesson = lessons(:english101)
    patch :update, params: { id: lesson.id, lesson: lesson.as_json }
    assert_response :ok
    assert_json_match lesson_pattern, @response.body
  end

  test 'DELETE /api/lesson/:id unauthorized' do
    delete :delete, params: { id: lessons(:english101).id }
    assert_response :unauthorized
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'DELETE /api/lesson/:id lesson not found' do
    login_as_testuser
    delete :delete, params: { id: 1 }
    assert_response :not_found
    assert_json_match({ errors: ['Not Found'] }, @response.body)
  end

  test 'DELETE /api/lesson/:id success' do
    login_as_testuser
    delete :delete, params: { id: lessons(:english101).id }
    assert_response :ok
    assert_json_match({ deleted: true }, @response.body)
    assert_raises ActiveRecord::RecordNotFound do
      Lesson.find(lessons(:english101).id)
    end
  end
end
