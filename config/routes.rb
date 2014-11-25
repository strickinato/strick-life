Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :posts do
      resources :tags, only: [:index]
      resources :friends, only: [:index]
    end

    resources :posts, only: [:index]
  end
end
