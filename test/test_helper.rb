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
      login 'testuser@test.com', 'TestPass'
    end

    def login_as_seconduser
      login 'seconduser@test.com', 'Password'
    end

    def lesson_pattern
      {
        id: 318230600,
        title: 'English 101',
        owner_id: 965022582,
        wordinfos: [
          {
            word: 'probably',
            definition: '',
            part_of_speech: '',
            roots: [{ root: 'prob', meaning: '' }],
            forms: [{ word: 'probable', part_of_speech: '' }],
            synonyms: ['likely'],
            antonyms: ['unlikely'],
            sentences: ['This is probably the best test ever']
          }
        ],
        practices: [907223594],
        course_ids: [393749808]
      }
    end

    def practice_pattern
      {
        id: 907223594,
        type: 'synonym',
        questions: [
          {
            id: 784075757,
            type: 'mc',
            prompts: ['What is the synonym of probably?'],
            options: %w(likely unlikely uncertain questionable)
          }
        ]
      }
    end

    def testuser_pattern
      {
        id: 965022582,
        name: 'Test User',
        email: 'testuser@test.com',
        birthday: '1990-01-01'
      }
    end

    def seconduser_pattern
      {
        id: 956415904,
        name: 'Second User',
        email: 'seconduser@test.com',
        birthday: '1990-01-01'
      }
    end

    def course_pattern
      {
        id: 393749808,
        title: 'Test Course',
        instructor_id: 965022582
      }
    end

    def grade_pattern
      {
        id: 791338413,
        question: {
          id: 784075757,
          prompt: 'What is the synonym of probably?'
        },
        value: 'likely',
        duration: 0,
        is_correct: true
      }
    end

    private

    def login(email, password)
      controller = @controller
      @controller = AuthController.new
      post :login, params: { email: email, password: password }
      @controller = controller
    end
  end
end
