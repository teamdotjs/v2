require 'test_helper'

class LessonsControllerTest < ActionController::TestCase
  test 'GET /api/lesson unauthorized' do
    get :index
    assert_response :unauthorized
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'GET /api/lesson success' do
    login_as_testuser
    get :index
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

  test 'POST /api/lesson unauthorized' do
    post :create
    assert_response :unauthorized
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'POST /api/lesson title defaults to Untitled if not provided' do
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
    lesson = lessons(:english101).as_json
    lesson['wordinfos'].each do |wordinfo|
      wordinfo.delete('id')
      wordinfo['roots'].each { |root| root.delete('id') }
      wordinfo['forms'].each { |form| form.delete('id') }
      wordinfo['synonyms'].each { |synonym| synonym.delete('id') }
      wordinfo['antonyms'].each { |antonym| antonym.delete('id') }
      wordinfo['sentences'].each { |sentence| sentence.delete('id') }
    end
    lesson['wordinfos'][0]['word'] = ''
    patch :update, params: { id: lesson['id'], lesson: lesson }
    assert_response :bad_request
    assert_json_match({ errors: { 'wordinfos.word': ['can\'t be blank'] } }, @response.body)
  end

  test 'PATCH /api/lesson/:id multiple wordinfo with same word ' do
    login_as_testuser
    lesson = lessons(:english101)
    updated_lesson = {
      id: lesson.id,
      wordinfos: [
        { word: 'Test' },
        { word: 'test' }
      ]
    }
    patch :update, params: { id: lesson.id, lesson: updated_lesson }
    assert_response :bad_request
    assert_json_match({ errors: { 'wordinfos.word': ['has already been taken'] } }, @response.body)
  end

  test 'PATCH /api/lesson/:id wordinfo and synonym with same word' do
    login_as_testuser
    lesson = lessons(:english101)
    updated_lesson = {
      id: lesson.id,
      wordinfos: [
        {
          word: 'Test',
          synonyms: [{ word: 'test' }]
        }
      ]
    }
    patch :update, params: { id: lesson.id, lesson: updated_lesson }
    assert_response :bad_request
    pattern = { errors: { 'wordinfos.synonyms.word': ['synonym cannot be the same word'] } }
    assert_json_match pattern, @response.body
  end

  test 'PATCH /api/lesson/:id two synonyms with same word in one wordinfo' do
    login_as_testuser
    lesson = lessons(:english101)
    updated_lesson = {
      id: lesson.id,
      wordinfos: [
        {
          word: 'Test',
          synonyms: [
            { word: 'Quiz' },
            { word: 'quiz' }
          ]
        }
      ]
    }
    patch :update, params: { id: lesson.id, lesson: updated_lesson }
    assert_response :bad_request
    pattern = { errors: { 'wordinfos.synonyms.word': ['has already been taken'] } }
    assert_json_match pattern, @response.body
  end

  test 'PATCH /api/lesson/:id success' do
    login_as_testuser
    lesson = lessons(:english101).as_json
    lesson['wordinfos'].each do |wordinfo|
      wordinfo.delete('id')
      wordinfo['roots'].each { |root| root.delete('id') }
      wordinfo['forms'].each { |form| form.delete('id') }
      wordinfo['synonyms'].each { |synonym| synonym.delete('id') }
      wordinfo['antonyms'].each { |antonym| antonym.delete('id') }
      wordinfo['sentences'].each { |sentence| sentence.delete('id') }
    end
    patch :update, params: { id: lesson['id'], lesson: lesson }
    assert_response :ok
    assert_json_match lesson_pattern, @response.body
  end

  test 'DELETE /api/lesson/:id unauthorized' do
    delete :destroy, params: { id: lessons(:english101).id }
    assert_response :unauthorized
    assert_json_match({ errors: ['Not Authenticated'] }, @response.body)
  end

  test 'DELETE /api/lesson/:id lesson not found' do
    login_as_testuser
    delete :destroy, params: { id: 1 }
    assert_response :not_found
    assert_json_match({ errors: ['Not Found'] }, @response.body)
  end

  test 'DELETE /api/lesson/:id success' do
    login_as_testuser
    delete :destroy, params: { id: lessons(:english101).id }
    assert_response :ok
    assert_json_match({ deleted: true }, @response.body)
    assert_raises ActiveRecord::RecordNotFound do
      Lesson.find(lessons(:english101).id)
    end
  end
end
