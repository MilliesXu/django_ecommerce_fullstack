from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from .permissions import ProductPermission

# Create your views here.

class ProductList(generics.ListAPIView):
    permission_classes = [AllowAny]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetriveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [ProductPermission]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
