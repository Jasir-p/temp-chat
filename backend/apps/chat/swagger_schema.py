from drf_spectacular.utils import OpenApiExample,extend_schema
from .serializers import ChatRoomSerializers,ChatRoomViewSerializers,ChatMessageSerializer


create_room_schema = extend_schema(
    summary= 'create new ChatRoom',
    request= ChatRoomSerializers,
    responses={
        201:ChatRoomViewSerializers,
        400:None

    },
    examples=[
        OpenApiExample(
            'Example',
            value={
                'name':'sample',
                'description':'good for gaming and online'
                
            },
            request_only=True
            
        ),
        
        
    ],
    tags=['ChatRoom']
)


get_rooms_schema = extend_schema(
    summary='Get all available chat rooms',
     description="""
Retrieve all chat rooms. Use query params:
- `mine=true` to get rooms created by current user
- `search=<text>` to search by name, description, or creator's username
""",
responses={200:ChatRoomViewSerializers(many=True)},
tags=['ChatRoom']
)

delete_room_schema = extend_schema(
    summary="Delete a chat room",
    description="Marks the chat room as deleted. Only the creator can delete it.",
    responses={
        200:None,
        400:None,
        404:None

    },

    tags=['ChatRoom']
)

get_single_room_schema = extend_schema(
    summary="Get single chat room details",
    description="Retrieve details of a specific chat room by ID.",
    responses={
        200:ChatRoomViewSerializers,
        404:None

    },
    tags=['ChatRoom']
)

get_messages_schema = extend_schema(
    summary="Get all messages in a chat room",
    description="Retrieve all messages in a specific chat room by room ID.",
    responses={
        200:ChatMessageSerializer(many=True),
        404:None

    },
    tags=['ChatRoom']
)