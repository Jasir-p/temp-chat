from rest_framework import serializers
from .models import ChatRoom,ChatMessage
from apps.users.serializers import UserManagementSerializers


class ChatRoomSerializers(serializers.ModelSerializer):

    class Meta:
        model = ChatRoom
        fields = ['name', 'description']


class ChatRoomViewSerializers(serializers.ModelSerializer):
    created_by = UserManagementSerializers(read_only = True)

    class Meta:
        model = ChatRoom
        fields = '__all__'

class ChatMessageSerializer(serializers.ModelSerializer):
    user = UserManagementSerializers(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id','room','user','message','timestamp']

    


    