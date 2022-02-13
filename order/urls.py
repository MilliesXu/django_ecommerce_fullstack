from django.urls import path
from .views import OrderView, OrderDetail

urlpatterns = [
    path('', OrderView.as_view(), name='order'),
    path('<pk>/', OrderDetail.as_view(), name='order-detail')
]
