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
  should route(:get, '/api/lesson/all').to('lessons#all')
  should route(:post, '/api/lesson').to('lessons#create')
  should route(:get, '/api/lesson/1').to('lessons#show', id: 1)
  should route(:patch, '/api/lesson/1').to('lessons#update', id: 1)
  should route(:delete, '/api/lesson/1').to('lessons#delete', id: 1)

  # wordinfo routes
  should route(:get, '/api/wordinfo/all').to('wordinfo#all')
  should route(:get, '/api/wordinfo/1').to('wordinfo#show', id: 1)

  # static files
  should route(:get, '/a').to('static#base', path: 'a')
end
