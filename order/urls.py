from django.urls import path
from .views import OrderView, OrderDetail, OrderDeliver

urlpatterns = [
    path('', OrderView.as_view(), name='order'),
    path('<pk>/', OrderDetail.as_view(), name='order-detail'),
    path('<pk>/deliver/', OrderDeliver.as_view(), name='order-detail')
]
