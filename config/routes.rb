Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    post 'login' => 'auth#authenticate_user'
    get 'check' => 'auth#check'
  end
  #  Send static files
  match '/register' => 'static#base', via: [:get]
end
