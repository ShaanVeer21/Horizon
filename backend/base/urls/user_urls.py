from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('profile/', views.getUserPorfile, name='users-profile'),
    path('', views.getUsers, name='users'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/update/', views.updateUserPorfile, name='user-profile-update'),
    path('<str:pk>/', views.getUserById, name='user'),
    path('update/<str:pk>/', views.updateUser, name='user-update'),
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
]