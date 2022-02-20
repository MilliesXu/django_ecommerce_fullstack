from django.urls import path
from .views import MyTokenObtainPairView, UserProfile, UserList, UserRegister, UserRetrieveDelete

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', UserProfile.as_view(), name='users-profile'),
    path('register/', UserRegister.as_view(), name='users-register'),    
    path('', UserList.as_view(), name='users-list'),
    path('<pk>/', UserRetrieveDelete.as_view(), name='user-delete'),
]
