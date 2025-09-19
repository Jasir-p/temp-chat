import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.urls import reverse,re_path
from channels.testing import WebsocketCommunicator
from apps.chat.consumers import ChatConsumer
from apps.chat.models import ChatRoom
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from channels.layers import get_channel_layer
from channels.routing import URLRouter
from django.contrib.auth import authenticate
import asyncio
from django.test import override_settings
from channels.auth import AuthMiddlewareStack
from unittest.mock import AsyncMock, patch


User = get_user_model()

@pytest.fixture
def setup_api(db):
    client = APIClient()
    urls = {
    "register": reverse("user-register"),
    "login" : reverse("user-login"),
    'create-room':reverse("chat-rooms"),


    }

    return client,urls



@pytest.mark.django_db
class TestChatApiIntegration:
    
    def authenticate_user(self,setup_api):
        client,urls = setup_api

        client.post(urls['register'],{"username" : "sample",
                "email" : 'sample12@gmail.com',
                "password" : 'Sample@1234' })
        
        login_response=client.post(urls['login'],{'username':"sample",
                                              "password": "Sample@1234"})
        

        

        return login_response
    


    def create_chatroom(self,setup_api):

        auth_response = self.authenticate_user(setup_api)
        client,urls = setup_api
        client.cookies=auth_response.cookies

        create_response = client.post(urls['create-room'],{
            'name':"sampl1",
            'description':"good for value that my side"

        })

        assert create_response.status_code == 201
        return create_response.data["id"]

    def test_get_single_chatroom(self,setup_api):
        
        auth_response = self.authenticate_user(setup_api)
        room_id = self.create_chatroom(setup_api)
        client,urls = setup_api
        client.cookies=auth_response.cookies

        get_room_url = reverse("get-chat-room", kwargs={"room_id":room_id})
        get_room_response = client.get(get_room_url)

        assert  get_room_response.status_code == 200

    def test_delete_chatroom(self,setup_api):
        auth_response = self.authenticate_user(setup_api)
        room_id = self.create_chatroom(setup_api)
        client,urls = setup_api
        client.cookies=auth_response.cookies

        delete_room_url = reverse("delete-chat-rooms",kwargs={"room_id":room_id})
        delete_room_response = client.delete(delete_room_url)

        assert delete_room_response.status_code == 200



TEST_CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}






@override_settings(CHANNEL_LAYERS=TEST_CHANNEL_LAYERS)
@pytest.mark.asyncio
@pytest.mark.django_db(transaction=True)
async def test_can_connect_to_server():

        user =await sync_to_async (User.objects.create_user)(
            username="sample", email="Sample@example.com", password="Sample@1234"
        )
        
        
        
        room = await sync_to_async(ChatRoom.objects.create)(
            name="sampl1",
            description="good for value that my side",
            created_by = user

        )
        
        #UrlRouter for consumer

        application = URLRouter([
            re_path(r'ws/chat/(?P<room_name>\w+)/$',ChatConsumer.as_asgi()),
        ])

        communicator = WebsocketCommunicator(
            application=application,
            path=f"/ws/chat/{room.id}/"

        )
        communicator.scope['user']= user

        mock_redis_instance = AsyncMock()
        mock_redis_instance.hset = AsyncMock(return_value=True)
        mock_redis_instance.hgetall = AsyncMock(return_value={})
        mock_redis_instance.hdel = AsyncMock(return_value=True)
        mock_redis_instance.close = AsyncMock(return_value=None)
        mock_redis_instance.connection_pool = AsyncMock()
        mock_redis_instance.connection_pool.disconnect = AsyncMock(return_value=None)
        with patch("apps.chat.consumers.Redis", return_value=mock_redis_instance) :
            
            
            connected,_= await communicator.connect()
            assert connected is True

            await communicator.send_json_to({"message": "hi halo guys"})
            while True:
                response = await communicator.receive_json_from()
                if "type" in response:
                    break

            assert response['type'] == 'chat'
            assert response['message']['message'] == 'hi halo guys'


            await communicator.disconnect()





@override_settings(CHANNEL_LAYERS=TEST_CHANNEL_LAYERS)
@pytest.mark.asyncio
@pytest.mark.django_db(transaction=True)

async def test_cannot_coonect_server():
        user =await sync_to_async (User.objects.create_user)(
            username="sample", email="Sample@example.com", password="Sample@1234"
        )
        
        
        
        room = await sync_to_async(ChatRoom.objects.create)(
            name="sampl1",
            description="good for value that my side",
            created_by = user

        )
        
        #UrlRouter for consumer

        application =URLRouter([
            re_path(r'ws/chat/(?P<room_name>\w+)/$',ChatConsumer.as_asgi()),
        ])

        communicator = WebsocketCommunicator(
            application=application,
            path=f"/ws/chat/{room.id}/"

        )
        communicator.scope['user']= None
        
        connected,_= await communicator.connect()
        assert connected is False












    
    



        

