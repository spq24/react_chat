class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    def default_url_options
        { host: "7a2161e7.ngrok.io"}
    end
end
