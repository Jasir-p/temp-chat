import pytest
from apps.chat.models import ChatRoom
from django.db import IntegrityError
from django.contrib.auth import get_user_model


User= get_user_model()


@pytest.fixture
def user(db):
    return User.objects.create_user(
            username = "sample",
            email= 'sample12@gmail.com',
        )


@pytest.fixture
def chat_room(db,user):
    return ChatRoom.objects.create(
            name= "Sample Room",
            description ="Sample Testing for developing side",
            created_by = user
        )

@pytest.mark.django_db
class TestChatRoom:
    def test_room_creation(self,chat_room):
        assert chat_room.name == "Sample Room"
        assert chat_room.description == "Sample Testing for developing side"

    def test_room_name_unique(self,chat_room):

        with pytest.raises(IntegrityError):
            ChatRoom.objects.create(
            name= "Sample Room",
            description ="Sample Testing for developing side",
            created_by = chat_room.created_by
        )


