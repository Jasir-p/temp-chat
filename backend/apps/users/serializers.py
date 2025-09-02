from rest_framework import serializers
from .models import CustomeUser
import re
from utils.constants import NAME_REGEX,EMAIL_REGEX,PASSWORD_REGEX


class UserManagementSerializers(serializers.ModelSerializer):

    class Meta:
        model = CustomeUser
        fields = ['id','username','email','password']
        extra_kwargs = {
            'password': {'write_only': True},
            }
        
        
    def validate_username(self, value):
        value = value.strip()
        if not value :
            raise serializers.ValidationError('Username is required')
        if len(value) < 3 :
            raise serializers.ValidationError('Username must be at least 3 characters long')
        if not re.match(NAME_REGEX,value):
            raise serializers.ValidationError('Username must contain only letters and numbers')
        return value
    
    def validate_email(self, value):
        value = value.strip()
        if not value :
            raise serializers.ValidationError('Email is required')
        if not re.match(EMAIL_REGEX,value):
            raise serializers.ValidationError('Invalid email')
        return value
        
    def validate_password(self, value):
        value = value.strip()
        if not value :
            raise serializers.ValidationError('Password is required')
        if len(value) < 8 :
            raise serializers.ValidationError('Password must be at least 8 characters long')
        if not re.match(PASSWORD_REGEX,value):
            raise serializers.ValidationError('Password must contain at least one uppercase letter, ' 
            'one lowercase letter, one digit and one special character')
        
        return value
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = CustomeUser(**validated_data)
        user.set_password(password)
        user.save()
        return user 


class UserLoginSerailizers(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)
    
    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if not username or not password:
            raise serializers.ValidationError("Both username and password are required.")
        return attrs

        


