from rest_framework import serializers
from .models import CustomeUser


class UserManagementSerializers(serializers.ModelSerializer):

    class Meta:
        model = CustomeUser
        fields = ['id','username','email','password']
        extra_kwargs = {
            'password': {'write_only': True},
            }
        
    def validate_username(self,value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError("username is required")
        if len(value)<3:
            raise serializers.ValidationError("username must be at least 3 character long")
        
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

        


