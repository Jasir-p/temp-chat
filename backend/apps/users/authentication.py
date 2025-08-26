from rest_framework_simplejwt.authentication import JWTAuthentication

from django.conf import settings

class CustomAuthentication(JWTAuthentication):

    def authenticate(self, request):
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        if access_token is None:
            return None
        
        validate_token = self.get_validated_token(access_token)
        return self.get_user(validate_token),validate_token