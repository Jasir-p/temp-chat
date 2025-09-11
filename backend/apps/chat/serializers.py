from rest_framework import serializers
from .models import ChatRoom,ChatMessage
from apps.users.serializers import UserManagementSerializers
from .validators import validate_tittle,validate_description
from rest_framework.validators import UniqueValidator


class ChatRoomSerializers(serializers.ModelSerializer):
    name = serializers.CharField(validators=[validate_tittle,UniqueValidator(queryset=ChatRoom.objects.all(),
            message="The chat name with room already exisit")])


    class Meta:
        model = ChatRoom
        fields = ['id','name', 'description']


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

    


    