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

  test 'POST /api/lesson/:id/practice/ generate sentence Q\'s with 1 word in lesson' do
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

  test 'POST /api/lesson/:id/practice/ can\'t generate definition Q\'s with 1 word in lesson' do
    login_as_testuser
    post :create, params: { id: lessons(:english101).id, type: 'definition' }
    assert_response :conflict
    error_message = 'There are not enough words in this practice to generate a practice'
    error_response = { errors: [error_message], error_message: error_message }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/lesson/:id/practice/ can\'t generate synonym Q\'s with 1 word in lesson' do
    login_as_testuser
    post :create, params: { id: lessons(:english101).id, type: 'synonym' }
    assert_response :conflict
    error_message = 'There are not enough words in this practice to generate a practice'
    error_response = { errors: [error_message], error_message: error_message }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/lesson/:id/practice/ generate definition Q\'s with 4 words in lesson' do
    login_as_testuser
    controller = @controller
    @controller = LessonsController.new
    post :create
    lesson_id = JSON.parse(@response.body)['id']
    lesson = { id: lesson_id, wordinfos:
      [{ word: 'hat', definition: 'wear on your head' },
       { word: 'plate', definition: 'eat dinner from' },
       { word: 'screen', definition: 'watch a tv show' },
       { word: 'pan', definition: 'cook in' }] }
    patch :update, params: { id: lesson_id, lesson: lesson, type: 'definition' }, as: :json
    @controller = controller
    post :create, params: { id: lesson_id }
    assert_response :ok
    practice = { id: 907223595, type: 'definition', questions:
      [{ id: 784075758, type: 'mc', prompts: ['wear on your head'],
         options: %w(hat plate screen pan) },
       { id: 784075759, type: 'mc', prompts: ['eat dinner from'],
         options: %w(hat plate screen pan) },
       { id: 784075760, type: 'mc', prompts: ['watch a tv show'],
         options: %w(hat plate screen pan) },
       { id: 784075761, type: 'mc', prompts: ['cook in'],
         options: %w(hat plate screen pan) }] }
    assert_json_match practice, @response.body
  end

  test 'POST /api/lesson/:id/practice/ generate synonym Q\'s with 4 words in lesson' do
    login_as_testuser
    controller = @controller
    @controller = LessonsController.new
    post :create
    lesson_id = JSON.parse(@response.body)['id']
    lesson = { id: lesson_id, wordinfos:
      [{ word: 'hat', synonyms: ['cap'] },
       { word: 'plate', synonyms: ['dish'] },
       { word: 'screen', synonyms: ['monitor'] },
       { word: 'pan', synonyms: ['pot'] }] }
    patch :update, params: { id: lesson_id, lesson: lesson, type: 'synonym' }, as: :json
    @controller = controller
    post :create, params: { id: lesson_id }
    assert_response :ok
    practice = { id: 907223595, type: 'synonym', questions:
      [{ id: 784075758, type: 'mc', prompts: ['What is a synonym of hat?'],
         options: %w(cap dish monitor pot) },
       { id: 784075759, type: 'mc', prompts: ['What is a synonym of plate?'],
         options: %w(cap dish monitor pot) },
       { id: 784075760, type: 'mc', prompts: ['What is a synonym of screen?'],
         options: %w(cap dish monitor pot) },
       { id: 784075761, type: 'mc', prompts: ['What is a synonym of pan?'],
         options: %w(cap dish monitor pot) }] }
    assert_json_match practice, @response.body
  end
end
