Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    scope '/auth' do
      match '/login' => 'auth#login', via: [:post]
      match '/logout' => 'auth#logout', via: [:post]
      match '/signed_in' => 'auth#signed_in', via: [:get]
    end

    scope '/user' do
      match '/' => 'users#create', via: [:post]
      match '/email_taken' => 'users#email_taken', via: [:get]
    end

    scope '/lesson' do
      match '/' => 'lessons#index', via: [:get]
      match '/' => 'lessons#create', via: [:post]
      match '/:id' => 'lessons#show', via: [:get]
      match '/:id' => 'lessons#update', via: [:patch]
      match '/:id' => 'lessons#destroy', via: [:delete]
      scope '/:id/practice' do
        match '/' => 'practices#index', via: [:get]
        match '/' => 'practices#create', via: [:post]
        match '/:p_id' => 'practices#show', via: [:get]
      end
    end

    match '/practice/:id' => 'practices#destroy', via: [:delete]

    match '/question/:id/submit_answer' => 'questions#submit_answer', via: [:post]

    scope '/course' do
      match '/' => 'courses#index', via: [:get]
      match '/' => 'courses#create', via: [:post]
      match '/:id' => 'courses#show', via: [:get]
      match '/:id' => 'courses#destroy', via: [:delete]
      scope '/:id/lesson' do
        match '/' => 'courses#lessons', via: [:get]
        match '/' => 'courses#add_lesson', via: [:patch]
        match '/:l_id' => 'courses#remove_lesson', via: [:delete]
      end
      scope '/:id/student' do
        match '/' => 'courses#students', via: [:get]
        match '/' => 'courses#add_student', via: [:patch]
        match '/:s_id' => 'courses#remove_student', via: [:delete]
      end
    end
  end
  #  Send static files
  match '/*path' => 'static#base', via: [:get]
end
