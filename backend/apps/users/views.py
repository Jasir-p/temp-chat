from django.shortcuts import render
from rest_framework import viewsets,views
from rest_framework.response import Response
from rest_framework import permissions,status
from .serializers import UserManagementSerializers,UserLoginSerailizers
from .models import CustomeUser
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.conf import settings
from .swagger_schema import created_schema,login_users_schemas,logout_users_schemas,profile_users_schemas,refresh_token_schemas
# Create your views here.


class UserManagementView(viewsets.ModelViewSet):
    serializer_class =UserManagementSerializers
    # permission_classes = [permissions.AllowAny]
    queryset = CustomeUser.objects.all()
    
    def get_permissions(self):
        if self.action == 'list':
            return [permissions.IsAuthenticated(),permissions.IsAdminUser()]
        
        return [permissions.IsAuthenticated()]
    
@created_schema
class RegisterView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self,request):
        serializer = UserManagementSerializers(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({"message":"Added"}, status=status.HTTP_201_CREATED)
        
        print(serializer.errors)
        
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
@login_users_schemas
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
    

@profile_users_schemas
class UserProfileView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request):
        try:
            # user_profile = CustomeUser.objects.get(id=request.user.id)
            serializer = UserManagementSerializers(request.user)
            return Response (serializer.data,status=status.HTTP_200_OK)
        
        except Exception as e:
            print(str(e))
            return Response({"error":str(e)},status=status.HTTP_401_UNAUTHORIZED)
        


@logout_users_schemas
class UserLogOut(views.APIView):
    def post(self,request):
        response = Response({"logout SuccessFull"},status=status.HTTP_200_OK)
        

        return clear_jwt_cookie(response,request)
    


@refresh_token_schemas        
class CookiesTokenRefresh(views.APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request,*args, **kwargs):
        

        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        print(refresh_token)

        if not refresh_token:
            return Response({"error":"Refresh Token Not Found"}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)
            response = Response({"access":new_access_token}, status=status.HTTP_200_OK)
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=new_access_token,
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                max_age=int(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds())
            )
            return response
        
        except (TokenError):
            return Response({"error":"Invalid Token"},status=status.HTTP_401_UNAUTHORIZED)




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


def clear_jwt_cookie(response,request):
    if request:
        refresh_token_value = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']) 
        if refresh_token_value:
            token = RefreshToken(refresh_token_value)
            token.blacklist()

    response.delete_cookie(
        "access_token",
        path="/", 
        samesite=settings.SIMPLE_JWT.get('AUTH_COOKIE_SAMESITE') 
    )
    response.delete_cookie(
        "refresh_token", 
        path="/",
        samesite=settings.SIMPLE_JWT.get('AUTH_COOKIE_SAMESITE')
    )

    return response



    




