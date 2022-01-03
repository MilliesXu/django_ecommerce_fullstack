from django.db.models.query import QuerySet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, serializers

from .models import Product
from .serializers import MyTokenObtainPairSerializer, ProductSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class Base(APIView):
    def get(self, request, format=None):
        routes = [
            'GET /api/products/',
            'GET /api/products/<id>',
            'POST /api/products/',
            'PUT /api/products/<id>',
            'DEL /api/products/<id>',
        ]

        return Response(routes)

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrive(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
