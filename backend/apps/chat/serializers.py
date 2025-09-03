from rest_framework import serializers
from .models import ChatRoom,ChatMessage
from apps.users.serializers import UserManagementSerializers
from utils.constants import NAME_REGEX,DESCRIPTION_HAS_ALPHANUMERIC_REGEX,DESCRIPTION_START_REGEX
import re


class ChatRoomSerializers(serializers.ModelSerializer):

    class Meta:
        model = ChatRoom
        fields = ['name', 'description']

    def validate_name(self,value):

        name = value.strip()
        if not name :
            raise serializers.ValidationError('Room name is required')
        if len(name) < 3 :
            raise serializers.ValidationError('Room name must be at least 3 characters long')
        if not re.match(NAME_REGEX,name):
            raise serializers.ValidationError('Room name must contain only letters and numbers')

        return value
    def validate_description(self, value):
        words = value.strip().split()
        if not words:
            raise serializers.ValidationError("Notes cannot be empty")
        if len(words)<5:
            raise serializers.ValidationError("Notes should be at least 5 words")
        if not re.match(DESCRIPTION_START_REGEX, value):
            raise serializers.ValidationError("Notes must start with a letter or number.")
        if not re.match(DESCRIPTION_HAS_ALPHANUMERIC_REGEX,value):
            raise serializers.ValidationError("Notes cannot contain only special characters.")

        return value
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

    


    