import logging
import jwt
from django.conf import settings
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import AnonymousUser

User=get_user_model()
logger= logging.getLogger(__name__)



class TokenAuthenticationMiddleWare(BaseMiddleware):

    async def __call__(self, scope, receive, send):

        try:
            cookies = {}
            headers = dict(scope["headers"])
            cookie_header = headers.get(b"cookie",b"").decode()
            for item in cookie_header.split(";"):
                name,value = item.strip().split("=",1)
                cookies[name]= value

            
            token = cookies.get("access_token")

            if token:
                try:
                    auth=JWTAuthentication()
                    validated_token = auth.get_validated_token(token)
                    user= await database_sync_to_async (auth.get_user)(validated_token)
                    scope["user"]=user

                except Exception as e:
                    logger.warning(f"JWT validation failed: {e}")
                    scope["user"] = AnonymousUser()

            else:
                scope['user']=AnonymousUser()



        except Exception as e:
            logger.error(f"Middileware error: {e}")
            scope['user']=AnonymousUser()



        return await super().__call__(scope, receive, send)






        





