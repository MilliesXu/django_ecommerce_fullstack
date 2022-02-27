from django.urls import path
from .views import ProductListCreate, ProductRetriveUpdateDestroy

urlpatterns = [
    path('<pk>/', ProductRetriveUpdateDestroy.as_view(), name="product"),
    path('', ProductListCreate.as_view(), name="products"),
]

