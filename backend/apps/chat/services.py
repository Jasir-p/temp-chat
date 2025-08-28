from .models import ChatRoom

def get_chat_rooms(params,user=None):

    chat_rooms = ChatRoom.objects.filter(deleted=False)

    search = params.get("search")
    print(search)
    if search:
        chat_rooms=chat_rooms.filter(name__istartswith=search)

    my_rooms = params.get('myrooms')

    if my_rooms:
        chat_rooms=chat_rooms.filter(created_by=user)

    return chat_rooms
