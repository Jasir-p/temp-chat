from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.users.validators import validate_username,validate_password
from django.core.exceptions import ValidationError



# Create your tests here.

User = get_user_model()

class TestRegisterUser(TestCase):

    def test_validate_username(self):
        with self.assertRaises(ValidationError):
            validate_username("-------")

    def test_validate_password(self):
        with self.assertRaises(ValidationError):
            validate_password("12345")