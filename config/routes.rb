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
  end
  #  Send static files
  match '/*path' => 'static#base', via: [:get]
end
