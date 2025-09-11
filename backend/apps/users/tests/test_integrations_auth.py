import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.urls import reverse

User=get_user_model()


@pytest.fixture
def setup_api():
    client = APIClient()
    urls = {
    "register": reverse("user-register"),
    "login" : reverse("user-login"),
    "profile" : reverse("user-profile"),
    "logout" : reverse("user-logout"),
    "refresh" : reverse("user-token-refresh"),
    }

    return client,urls


    


@pytest.mark.django_db
class TestUserAuthentication:

    def test_user_register_login_profile_logout(self,setup_api):
        client,urls = setup_api

        response = client.post(urls['register'],{"username" : "sample",
                "email" : 'sample12@gmail.com',
                "password" : 'Sample@1234' })
        
        assert response.status_code == 201
        assert User.objects.filter(username="sample").exists()


        #login
        login_response = client.post(urls['login'],{'username':"sample",
                                              "password": "Sample@1234"})
        
        assert login_response.status_code == 200

        client.cookies = login_response.cookies

        #profile
        profile_response = client.get(urls['profile'])

        assert profile_response.status_code == 200
        assert profile_response.data['username'] == 'sample'

        #logout

        logout_response = client.post(urls['logout'])
        assert logout_response.status_code ==200


        







