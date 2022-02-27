from django.urls import path
from .views import ProductList, ProductRetriveUpdateDestroy

urlpatterns = [
    path('<pk>/', ProductRetriveUpdateDestroy.as_view(), name="product"),
    path('', ProductList.as_view(), name="products"),
]

