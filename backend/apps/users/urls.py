from django.urls import path,include
from .views import RegisterView,UserManagementView,UserLoginView
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register(r'users', UserManagementView, basename='users')

urlpatterns = [
    path("user/register/",RegisterView.as_view(), name="user-register"),
    path("user/login/",UserLoginView.as_view(), name="user-login"),
    path("",include(router.urls))
]