ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'json_expressions/minitest'
require 'minitest/reporters'
require 'simplecov'

# Minitest output with color and progress bar
Minitest::Reporters.use!(Minitest::Reporters::ProgressReporter.new, ENV, Minitest.backtrace_filter)

# Save to CircleCI's artifacts directory if we're on CircleCI
if ENV['CIRCLE_ARTIFACTS']
  dir = File.join(ENV['CIRCLE_ARTIFACTS'], 'coverage')
  SimpleCov.coverage_dir(dir)
end

SimpleCov.start 'rails' do
  add_filter '.env'
end

module ActiveSupport
  class TestCase
    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    def login_as_testuser
      controller = @controller
      @controller = AuthController.new
      post :login, params: { email: 'testuser@test.com', password: 'TestPass' }
      @controller = controller
    end

    def lesson_pattern
      {
        id: 318230600,
        title: 'English 101',
        wordinfos: [
          {
            word: 'probably',
            definition: '',
            part_of_speech: '',
            roots: [{ root: 'prob', meaning: '' }],
            forms: [{ word: 'probable', part_of_speech: '' }],
            synonyms: [{ word: 'likely' }],
            antonyms: [{ word: 'unlikely' }],
            sentences: [{ context_sentence: 'This is probably the best test ever' }]
          }
        ]
      }
    end

    def user_pattern
      {
        logged_in: true,
        user: {
          id: 965022582,
          name: 'Test User',
          email: 'testuser@test.com',
          birthday: '1990-01-01'
        }
      }
    end
  end
end
