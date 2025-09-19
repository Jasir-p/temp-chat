from drf_spectacular.utils import OpenApiExample,extend_schema
from .serializers import UserManagementSerializers,UserLoginSerailizers


created_schema = extend_schema(
    summary= 'Register Users',
    request= UserManagementSerializers,
    responses={
        201:UserManagementSerializers,
        400:None

    },
    examples=[
        OpenApiExample(
            'Example',
            value={
                'username':'sample',
                'email':'sample@gmail.com',
                'password':'Sample@1234'
                
            },
            request_only=True
            
        ),
        
        
    ],
    tags=['Auth']
)

login_users_schemas = extend_schema(
    summary='Login User',
    description='',

    request=UserLoginSerailizers,
    responses={
        200:UserManagementSerializers,
        401:None
    },
    examples=[OpenApiExample(
        'Login User Examples',
        value={
            'username':'sample',
            'password':'Sample@1234'
        },
        request_only=True
    ),
    ],
    tags=['Auth']
)

logout_users_schemas = extend_schema(
    summary="Logout User",
    description='',
    responses={
        200:None
    },
    tags=['Auth']
)

profile_users_schemas = extend_schema(
    summary="Profile of user",
    description="",
    responses={
        200:UserManagementSerializers
    },
    tags=['User']
)

refresh_token_schemas = extend_schema(
    summary="Refresh token",
    description='',
    responses={
        200:None,
        401:None
    },
    tags=['User']
)