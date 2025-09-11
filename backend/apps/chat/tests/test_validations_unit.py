from django.test import TestCase
from apps.chat.models import ChatRoom
from apps.chat.validators import validate_description,validate_tittle
from django.core.exceptions import ValidationError
from django.db import IntegrityError


# Create your tests here.

class TestCaseChatRoom(TestCase):

    def test_validate_name(self):
        with self.assertRaises(ValidationError):
            validate_tittle("----sample")

    def test_validate_desription(self):
        with self.assertRaises(ValidationError):
            validate_description("sample check")






