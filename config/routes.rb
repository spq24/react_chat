Rails.application.routes.draw do
    root to: "chatrooms#index"

    devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

    resources :chatrooms
    resources :messages
end
