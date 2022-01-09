from django.urls import path
from .views import Base, ProductList, ProductRetrive, MyTokenObtainPairView, UserProfile, UserList, UserRegister

urlpatterns = [
    path('', Base.as_view(), name="routes"),
    path('products/<pk>', ProductRetrive.as_view(), name="product"),
    path('products/', ProductList.as_view(), name="products"),
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', UserProfile.as_view(), name='users-profile'),
    path('users/register', UserRegister.as_view(), name='users-register'),    
    path('users/', UserList.as_view(), name='users-list'),
]

