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

    scope '/wordinfo' do
      match '/' => 'wordinfo#index', via: [:get]
      match '/:id' => 'wordinfo#show', via: [:get]
    end
  end
  #  Send static files
  match '/lesson/:id' => 'static#lesson', via: [:get]
  match '/*path' => 'static#base', via: [:get]
end
