import pytest
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.core.exceptions import ValidationError



# Create your tests here.

User = get_user_model()

@pytest.fixture
def user(db):
    return User.objects.create_user(
            username = "sample",
            email= 'sample12@gmail.com',
        )

@pytest.mark.django_db
class TestRegisterUser:

    def test_user_creation(self,user):

        assert user.username == "sample"
        assert user.email == "sample12@gmail.com"

    def test_unique_email(self,user):
        with pytest.raises(IntegrityError):
            User.objects.create_user(
                username = "sample1",
                email = 'sample12@gmail.com',
                password = 'Sample@1234'

            )