require 'test_helper'

class StaticControllerTest < ActionController::TestCase
  test 'static controller returns html' do
    get :base, params: { path: 'test' }
    assert_equal 'text/html', @response.content_type
  end
end
