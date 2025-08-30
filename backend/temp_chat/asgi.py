"""
ASGI config for temp_chat project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'temp_chat.settings')
django.setup()

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from apps.chat.middileware import TokenAuthenticationMiddleWare
from apps.chat.routing import websocket_urlpatterns



application = ProtocolTypeRouter({
    'http':get_asgi_application(),
    'websocket':TokenAuthenticationMiddleWare(
        URLRouter(
            websocket_urlpatterns
        )
    )
})
