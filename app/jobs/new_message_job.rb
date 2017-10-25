class NewMessageJob < ApplicationJob
  queue_as :default

  def perform(message, chatroom)
    ChatroomChannel.broadcast_to(chatroom, message: MessagesController.render(
        partial: "messages/message.json",
        locals: { message: message }
      ))
  end
end
