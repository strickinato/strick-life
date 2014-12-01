Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only:[:create, :new]
  resource :session, only:[:create, :new, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :posts do
      resources :tags, only: [:index]
      resources :friends, only: [:index]
    end
    resources :posts, only: [:index]
    resources :locations, only:[:create]
  end
end
