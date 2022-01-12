from django.urls import path
from .views import ProductList, ProductRetrive

urlpatterns = [
    path('<pk>', ProductRetrive.as_view(), name="product"),
    path('', ProductList.as_view(), name="products"),
]

