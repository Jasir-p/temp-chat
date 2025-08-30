from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken,TokenError

from django.conf import settings

class CustomAuthentication(JWTAuthentication):

    def authenticate(self, request):
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        print(access_token)
        if access_token is None:
            print("hallo tokem")
            return None
        try:
            validate_token = self.get_validated_token(access_token)
        
        except(InvalidToken,TokenError):
            return None
        return self.get_user(validate_token),validate_token