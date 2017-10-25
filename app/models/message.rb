class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chatroom

  after_commit { NewMessageJob.perform_later(self, chatroom) }
end
