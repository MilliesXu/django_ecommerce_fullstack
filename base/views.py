from django.views import generic
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics

from .models import Product, ExtendUser
from .serializers import MyTokenObtainPairSerializer, ProductSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

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

class UserList(generics.ListAPIView):
    permission_classes = [IsAdminUser]

    queryset = ExtendUser.objects.all()
    serializer_class = UserSerializer

class UserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
