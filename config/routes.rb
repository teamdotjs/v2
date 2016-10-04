Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    scope '/auth' do
      match '/login' => 'auth#authenticate_user', via: [:post]
      match '/logout' => 'auth#invalidate_user', via: [:post]
      match '/signed_in' => 'auth#signed_in', via: [:get]
    end
  end
  #  Send static files
  match '/*path' => 'static#base', via: [:get]
end
