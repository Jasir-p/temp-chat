from django.shortcuts import render
from rest_framework import views,status,permissions,response
from .serializers import ChatRoomSerializers,ChatRoomViewSerializers,ChatMessageSerializer
from .models import ChatRoom,ChatMessage
from .services import get_chat_rooms
from django.shortcuts import get_object_or_404
from.swagger_schema import create_room_schema,get_rooms_schema,get_single_room_schema,delete_room_schema,get_messages_schema
# Create your views here.


class ChatRoomView(views.APIView):
    permission_classes =[permissions.IsAuthenticated]
    @get_rooms_schema
    def get(self, request):

        chat_rooms = get_chat_rooms(request.query_params,request.user)
        
        serializer = ChatRoomViewSerializers(chat_rooms,many=True)

        return response.Response(serializer.data)
    
    @create_room_schema
    def post(self,request,*args, **kwargs):

        serializer = ChatRoomSerializers(data=request.data)

        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return response.Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return response.Response({"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
    





class SingleChatRoomView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    @get_single_room_schema
    def get(self,request,room_id):
        chat_room = get_object_or_404(ChatRoom,id = room_id)
        serializer = ChatRoomViewSerializers(chat_room)

        return response.Response(serializer.data,status=status.HTTP_200_OK)



class DeleteChatRoom(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    @delete_room_schema
    def delete(self,request,room_id):
        print("id",room_id)
        if not room_id:
            return response.Response({"error":"Room Id is Required"},status=status.HTTP_400_BAD_REQUEST)
        chat_room = get_object_or_404(ChatRoom,id=room_id)
        if chat_room.created_by != request.user:
                return response.Response(
                    {"error": "You do not have permission to delete this room"},
                    status=status.HTTP_403_FORBIDDEN
                )

        chat_room.delete()
        return response.Response({"message successfull deleted"},status=status.HTTP_200_OK)

class ChatMessageView(views.APIView):

    permission_classes = [permissions.IsAuthenticated]
    
    @get_messages_schema
    def get(self,request,room_id):

        chat_room = get_object_or_404(ChatRoom,id = room_id)
        messages = chat_room.chat.select_related('user').all()

        serializer = ChatMessageSerializer(messages, many=True)

        return response.Response(serializer.data)

        

    

    





