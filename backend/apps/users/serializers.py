from rest_framework import serializers
from .models import CustomeUser
from .validators import validate_username,validate_email,validate_password
from rest_framework.validators import UniqueValidator


class UserManagementSerializers(serializers.ModelSerializer):
    username = serializers.CharField(validators=[validate_username,UniqueValidator(queryset=CustomeUser.objects.all(),
                            message="This username is already registered.")])
    email = serializers.EmailField(validators=[validate_email,
            UniqueValidator(CustomeUser.objects.all(), message="This email is already registered.")])
    password = serializers.CharField(validators=[validate_password])

    class Meta:
        model = CustomeUser
        fields = ['id','username','email','password']
        extra_kwargs = {
            'password': {'write_only': True},
            }
        
        
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

        


