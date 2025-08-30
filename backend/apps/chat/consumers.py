import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.http import HttpRequest
from django.contrib.auth.models import User
from rest_framework.request import Request
from channels.db import database_sync_to_async
from .models import ChatMessage,ChatRoom
from .serializers import ChatMessageSerializer
from redis.asyncio import Redis
from django.conf import settings
REDIS_URL = settings.REDIS
# REDIS = settings.REDIS

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        try:
            self.user = self.scope.get("user")
            print(self.user)
            if not self.user or not self.user.is_authenticated:
                await self.send(json.dumps({"error": "Unauthorized"}))
                await self.close()
                return
            
            self.room_id = self.scope['url_route']['kwargs']["room_name"]
            self.room_group_name = f'chat_{self.room_id}'
            self.redis_key = f"online_members:{self.room_id}"
            print()
            print(f'Connecting to room group:{self.room_group_name}')

            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()

            self.redis = Redis.from_url(REDIS_URL,decode_responses=True)
            await self.add_online_member()

            await self.brodcast_list_members()

        except Exception as e:
            print(f" Error in connect: {e}")
            await self.close()

    async def disconnect(self, code=None, reason=None):
        if hasattr(self, "room_group_name"):
            await self.remove_online_member()
            await self.brodcast_list_members()
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
            

    async def receive(self, text_data=None):

        text_data_json = json.loads(text_data)
        message = text_data_json.get("message")
        message_obj = await self.save_message(message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'chat_message',
                'message':message_obj
            }
        )
        
    


    async def chat_message(self,event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'type':"chat",
            'message':message
        }))

    async def members_list(self,event):
        members = event['members']

        await self.send(text_data=json.dumps({
            'type':"members",
            'members':members
        }))
    async def add_online_member(self):
        await self.redis.hset(self.redis_key,self.user.id,self.user.username)

    async def remove_online_member(self):
        await self.redis.hdel(self.redis_key,self.user.id)

    async def brodcast_list_members(self):

        members_obj =  await self.redis.hgetall(self.redis_key)

        members = [{"id":id,"username":name} for id,name in members_obj.items()]

        await self.channel_layer.group_send(
            self.room_group_name,{
                "type":'members_list',
                'members':members
            }
        )



    

    


    @database_sync_to_async
    def save_message(self,message):
        
        room = ChatRoom.objects.get(id=self.room_id)
        message = ChatMessage.objects.create(room=room,user=self.user,message=message)
        serializer = ChatMessageSerializer(message)
        return serializer.data
        


    
