from django.urls import path,include
from .views import RegisterView,UserManagementView,UserLoginView,UserProfileView,UserLogOut,CookiesTokenRefresh
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register(r'users', UserManagementView, basename='users')

urlpatterns = [
    path("user/register/",RegisterView.as_view(), name="user-register"),
    path("auth/login/",UserLoginView.as_view(), name="user-login"),
    path('user/profile/',UserProfileView.as_view(),name='user-profile'),
    path('auth/logout/',UserLogOut.as_view(),name='user-logout'),
    path("auth/token/refresh/",CookiesTokenRefresh.as_view(), name='user-token-refresh'),
    path("",include(router.urls))
]