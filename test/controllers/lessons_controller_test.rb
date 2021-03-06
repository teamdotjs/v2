require 'test_helper'

class LessonsControllerTest < ActionController::TestCase
  test 'GET /api/lesson unauthorized' do
    get :index
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/lesson success' do
    login_as_testuser
    get :index
    assert_response :ok
    pattern = lesson_pattern
    pattern.delete(:wordinfos)
    pattern.delete(:practices)
    pattern.delete(:owner_id)
    assert_json_match [pattern], @response.body
  end

  test 'GET /api/lesson?filter=not_in_course success' do
    login_as_testuser
    get :index, params: { filter: 'not_in_course' }
    assert_response :ok
    assert_json_match [], @response.body
  end

  test 'GET /api/lesson/:id unauthorized' do
    get :show, params: { id: lessons(:english101).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/lesson/:id lesson not found' do
    login_as_testuser
    get :show, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Lesson with \'id\'=1'],
                       error_message: 'Lesson could not be found' }
    assert_json_match error_response, @response.body
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
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/lesson title defaults to Untitled if not provided' do
    login_as_testuser
    post :create
    assert_response :ok
    pattern = { id: 318230601, title: 'Untitled', owner_id: 965022582,
                wordinfos: [], practices: [], course_ids: [] }
    assert_json_match pattern, @response.body
  end

  test 'POST /api/lesson course not found' do
    login_as_seconduser
    post :create, params: { course_id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Course with \'id\'=1'],
                       error_message: 'Course could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/lesson can\'t create lesson in another instructor\'s course' do
    login_as_seconduser
    post :create, params: { course_id: courses(:testcourse) }
    assert_response :forbidden
    error_response = { errors: ['Forbidden'], error_message: 'Forbidden' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/lesson create course in lesson' do
    login_as_testuser
    post :create, params: { course_id: courses(:testcourse) }
    assert_response :ok
    pattern = { id: 318230601, title: 'Untitled', wordinfos: [],
                owner_id: 965022582, practices: [], course_ids: [393749808] }
    assert_json_match pattern, @response.body
  end

  test 'PATCH /api/lesson/:id unauthorized' do
    patch :update, params: { id: lessons(:english101).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/lesson/:id forbidden' do
    login_as_seconduser
    patch :update, params: { id: lessons(:english101).id }
    assert_response :forbidden
    error_response = { errors: ['Forbidden'], error_message: 'Forbidden' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/lesson/:id lesson not found' do
    login_as_testuser
    patch :update, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Lesson with \'id\'=1'],
                       error_message: 'Lesson could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/lesson/:id can\'t edit lesson with practice' do
    login_as_testuser
    patch :update, params: { id: lessons(:english101).id }
    assert_response :conflict
    error_message = 'Lesson cannot be edited while it has a practice for it'
    error_response = { errors: [error_message], error_message: error_message }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/lesson/:id title is editable for lesson with practice' do
    login_as_testuser
    lesson = lessons(:english101)
    lesson_json = lesson.as_json
    lesson_json['title'] = 'Test'
    patch :update, params: { id: lesson_json['id'], lesson: lesson_json }
    assert_equal lesson.reload.title, 'Test'
  end

  test 'PATCH /api/lesson/:id bad request (wordinfo word blank)' do
    login_as_testuser
    lessons(:english101).practices.destroy_all
    lesson = lessons(:english101).as_json
    lesson['wordinfos'][0]['word'] = ''
    patch :update, params: { id: lesson['id'], lesson: lesson }
    assert_response :bad_request
    assert_json_match({ errors: { 'wordinfos.word': ['can\'t be blank'] } }, @response.body)
    lesson = lessons(:english101)
    assert_not_empty lesson.wordinfos
  end

  test 'PATCH /api/lesson/:id multiple wordinfo with same word ' do
    login_as_testuser
    lessons(:english101).practices.destroy_all
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
    assert_not_empty lesson.reload.wordinfos
  end

  test 'PATCH /api/lesson/:id wordinfo and synonym with same word' do
    login_as_testuser
    lessons(:english101).practices.destroy_all
    lesson = lessons(:english101)
    updated_lesson = {
      id: lesson.id,
      wordinfos: [
        {
          word: 'Test',
          synonyms: ['test']
        }
      ]
    }
    patch :update, params: { id: lesson.id, lesson: updated_lesson }
    assert_response :bad_request
    pattern = { errors: { 'wordinfos.synonyms.word': ['synonym cannot be the same word'] } }
    assert_json_match pattern, @response.body
    assert_not_empty lesson.reload.wordinfos
  end

  test 'PATCH /api/lesson/:id two synonyms with same word in one wordinfo' do
    login_as_testuser
    lessons(:english101).practices.destroy_all
    lesson = lessons(:english101)
    updated_lesson = {
      id: lesson.id,
      wordinfos: [
        {
          word: 'Test',
          synonyms: %w(Quiz quiz)
        }
      ]
    }
    patch :update, params: { id: lesson.id, lesson: updated_lesson }
    assert_response :bad_request
    pattern = { errors: { 'wordinfos.synonyms.word': ['has already been taken'] } }
    assert_json_match pattern, @response.body
    assert_not_empty lesson.reload.wordinfos
  end

  test 'PATCH /api/lesson/:id success' do
    login_as_testuser
    lessons(:english101).practices.destroy_all
    lesson = lessons(:english101).as_json
    patch :update, params: { id: lesson['id'], lesson: lesson }
    assert_response :ok
    pattern = lesson_pattern
    pattern[:practices] = []
    assert_json_match pattern, @response.body
    lesson = lessons(:english101)
    assert_not_empty lesson.wordinfos
  end

  test 'DELETE /api/lesson/:id unauthorized' do
    delete :destroy, params: { id: lessons(:english101).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/lesson/:id forbidden' do
    login_as_seconduser
    delete :destroy, params: { id: lessons(:english101).id }
    assert_response :forbidden
    error_response = { errors: ['Forbidden'], error_message: 'Forbidden' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/lesson/:id lesson not found' do
    login_as_testuser
    delete :destroy, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Lesson with \'id\'=1'],
                       error_message: 'Lesson could not be found' }
    assert_json_match error_response, @response.body
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
