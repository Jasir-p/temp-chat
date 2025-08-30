from django.shortcuts import render
from rest_framework import views,status,permissions,response
from .serializers import ChatRoomSerializers,ChatRoomViewSerializers,ChatMessageSerializer
from .models import ChatRoom,ChatMessage
from .services import get_chat_rooms
from django.shortcuts import get_object_or_404

# Create your views here.


class ChatRoomView(views.APIView):
    permission_classes =[permissions.IsAuthenticated]

    def get(self, request):

        chat_rooms = get_chat_rooms(request.query_params,request.user)
        
        serializer = ChatRoomViewSerializers(chat_rooms,many=True)

        return response.Response(serializer.data)
    
    def post(self,request,*args, **kwargs):

        serializer = ChatRoomSerializers(data=request.data)

        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return response.Response(status=status.HTTP_201_CREATED)
        
        return response.Response({"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
    

    # def delete(self,request, *args, **kwargs):


class SingleChatRoomView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request,room_id):
        chat_room = get_object_or_404(ChatRoom,id = room_id)
        serializer = ChatRoomViewSerializers(chat_room)

        return response.Response(serializer.data)


class ChatMessageView(views.APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self,request,room_id):

        chat_room = get_object_or_404(ChatRoom,id = room_id)
        print(chat_room)
        messages = chat_room.chat.select_related('user').all()

        serializer = ChatMessageSerializer(messages, many=True)

        return response.Response(serializer.data)

        

    

    





