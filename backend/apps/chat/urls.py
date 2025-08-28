from django.urls import path
from .views import ChatRoomView


urlpatterns = [
    path('chat-rooms/',ChatRoomView.as_view(), name='chat-rooms')
]
