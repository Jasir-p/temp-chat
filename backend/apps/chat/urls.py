from django.urls import path
from .views import ChatRoomView,ChatMessageView,SingleChatRoomView


urlpatterns = [
    path('chat-rooms/',ChatRoomView.as_view(), name='chat-rooms'),
    path('chat-messages/<int:room_id>/',ChatMessageView.as_view(), name='chat-messages'),
    path('get-chat-room/<int:room_id>/',SingleChatRoomView.as_view(), name='get-chat-room')
]
