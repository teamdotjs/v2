Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    scope '/auth' do
      match '/login' => 'auth#login', via: [:post]
      match '/logout' => 'auth#logout', via: [:post]
      match '/signed_in' => 'auth#signed_in', via: [:get]
    end

    scope '/user' do
      match '/create' => 'users#create', via: [:post]
      match '/email_taken' => 'users#email_taken', via: [:get]
    end

    scope '/lesson' do
      match '/all' => 'lessons#all', via: [:get]
      match '/create' => 'lessons#create', via: [:post]
      match '/:lesson_id/add_word/:word_id' => 'lessons#add_word', via: [:get]
      match '/:lesson_id/remove_word/:word_id' => 'lessons#remove_word', via: [:get]
      match '/:id' => 'lessons#show', via: [:get]
      match '/:id' => 'lessons#update', via: [:patch]
      match '/:id' => 'lessons#delete', via: [:delete]
    end

    scope '/wordinfo' do
      match '/all' => 'wordinfo#all', via: [:get]
      match '/create' => 'wordinfo#create', via: [:post]
      match '/:id' => 'wordinfo#show', via: [:get]
      match '/:id' => 'wordinfo#update', via: [:patch]
      match '/:id' => 'wordinfo#delete', via: [:delete]
    end
  end
  #  Send static files
  match '/*path' => 'static#base', via: [:get]
end
