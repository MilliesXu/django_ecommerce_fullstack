from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

# Create your views here.

class ProductList(generics.ListAPIView):
    permission_classes = [AllowAny]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrive(generics.RetrieveAPIView):
    permission_classes = [AllowAny]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer