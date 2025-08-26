from django.shortcuts import render
from rest_framework import viewsets,views
from rest_framework.response import Response
from rest_framework import permissions,status
from .serializers import UserManagementSerializers,UserLoginSerailizers
from .models import CustomeUser
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.conf import settings
# Create your views here.


class UserManagementView(viewsets.ModelViewSet):
    serializer_class =UserManagementSerializers
    # permission_classes = [permissions.AllowAny]
    queryset = CustomeUser.objects.all()
    
    def get_permissions(self):
        if self.action == 'list':
            return [permissions.IsAuthenticated(),permissions.IsAdminUser()]
        
        return [permissions.IsAuthenticated()]
    

class RegisterView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self,request):
        serializer = UserManagementSerializers(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({"message":"Added"}, status=status.HTTP_201_CREATED)
        
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

class UserLoginView(views.APIView):
    permission_classes = [permissions.AllowAny]
    def post (self,request):
        serializer = UserLoginSerailizers(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            user= authenticate(username=username,password=password)
            if user is not None:
                response = Response({"message":"Login successfully"}, status=status.HTTP_200_OK)

                return set_jwt_cookie(response,user)
            
            return Response({"error":"user not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
    




    





def set_jwt_cookie(response,user):

    """
    set jwt token in cookies
    """

    refresh_token = RefreshToken.for_user(user)
    access_token = str(refresh_token.access_token)

    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE'],
        value=access_token,
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
        max_age=int(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds())
    )

    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
        value=refresh_token,
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
       max_age=int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds())
    )

    return response



