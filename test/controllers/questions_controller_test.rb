require 'test_helper'

class QuestionsControllerTest < ActionController::TestCase
  test 'POST /api/question/:id/submit_answer/ unauthorized' do
    post :submit_answer, params: { id: 1 }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/question/:id/submit_answer/ option not found' do
    login_as_testuser
    post :submit_answer, params: { id: 1, value: 'test' }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Option'],
                       error_message: 'Option could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/question/:id/submit_answer/ value incorrect' do
    login_as_testuser
    params = { id: options(:probably_synonym_option2).question_id, value: 'unlikely' }
    post :submit_answer, params: params
    assert_response :ok
    assert_equal 'false', @response.body
  end

  test 'POST /api/question/:id/submit_answer/ value correct' do
    login_as_testuser
    params = { id: options(:probably_synonym_option1).question_id, value: 'likely' }
    post :submit_answer, params: params
    assert_response :ok
    assert @response.body
  end
end
