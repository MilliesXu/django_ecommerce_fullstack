from django.urls import path
from .views import ProductListCreate, ProductRetriveUpdateDestroy, ReviewListCreate

urlpatterns = [
    path('reviews/', ReviewListCreate.as_view(), name='reviews'),
    path('<pk>/', ProductRetriveUpdateDestroy.as_view(), name="product"),
    path('', ProductListCreate.as_view(), name="products"),
]

