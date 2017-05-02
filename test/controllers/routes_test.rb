require 'test_helper'

class RoutesTest < ActionController::TestCase
  # auth routes
  should route(:post, '/api/auth/login').to('auth#login')
  should route(:post, '/api/auth/logout').to('auth#logout')
  should route(:get, '/api/auth/signed_in').to('auth#signed_in')

  # user routes
  should route(:post, '/api/user').to('users#create')
  should route(:get, '/api/user/email_taken').to('users#email_taken')

  # lesson routes
  should route(:get, '/api/lesson').to('lessons#index')
  should route(:post, '/api/lesson').to('lessons#create')
  should route(:get, '/api/lesson/1').to('lessons#show', id: 1)
  should route(:patch, '/api/lesson/1').to('lessons#update', id: 1)
  should route(:delete, '/api/lesson/1').to('lessons#destroy', id: 1)

  # practice routes
  should route(:get, '/api/lesson/1/practice').to('practices#index', id: 1)
  should route(:post, '/api/lesson/1/practice').to('practices#create', id: 1)
  should route(:get, '/api/lesson/1/practice/1').to('practices#show', id: 1, p_id: 1)
  should route(:delete, '/api/practice/1').to('practices#destroy', id: 1)

  # grade routes
  should route(:get, '/api/grade').to('grades#index')
  should route(:post, '/api/grade').to('grades#create')
  should route(:get, '/api/grade/summaries').to('grades#index_summaries')
  should route(:get, '/api/grade/course/1').to('grades#course', id: 1)
  should route(:get, '/api/grade/course/1/summaries').to('grades#course_summaries', id: 1)

  # course routes
  should route(:get, '/api/course').to('courses#index')
  should route(:post, '/api/course').to('courses#create')
  should route(:get, '/api/course/1').to('courses#show', id: 1)
  should route(:delete, '/api/course/1').to('courses#destroy', id: 1)
  should route(:get, '/api/course/1/lesson').to('courses#lessons', id: 1)
  should route(:patch, '/api/course/1/lesson').to('courses#add_lesson', id: 1)
  should route(:delete, 'api/course/1/lesson/1').to('courses#remove_lesson', id: 1, l_id: 1)
  should route(:get, '/api/course/1/student').to('courses#students', id: 1)
  should route(:patch, '/api/course/1/student').to('courses#add_student', id: 1)
  should route(:delete, 'api/course/1/student/1').to('courses#remove_student', id: 1, s_id: 1)

  # static files
  should route(:get, '/a').to('static#base', path: 'a')
end
