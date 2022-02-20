from rest_framework import generics, status
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import ExtendUser
from .serializers import MyTokenObtainPairSerializer, UserSerializer, UserSerializerWithToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserList(generics.ListAPIView):
    permission_classes = [IsAdminUser]

    queryset = ExtendUser.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser]

    queryset = ExtendUser.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=True)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({"message": "mobile number updated successfully"})

    #     else:
    #         return Response({"message": "failed", "details": serializer.errors})

class UserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = UserSerializerWithToken(user, many=False)

        data = request.data

        try:
            user.first_name = data['name']
            user.username = data['email']
            user.email = data['email']

            if data['password'] != '':
                user.password = make_password(data['password'])

            user.save()
        except:
            message = {'detail': 'User with this email is already exist'}

            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data)

class UserRegister(APIView):
    permission_classes = []

    def post(self, request):
        data = request.data

        try:
            user = ExtendUser.objects.create(
                first_name = data['name'],
                username = data['email'],
                email = data['email'],
                password = make_password(data['password'])
            )
            serializer = UserSerializerWithToken(user, many=False)
            return Response(serializer.data)
        except:
            message = {'detail': 'User with this email is already exist'}

            return Response(message, status=status.HTTP_400_BAD_REQUEST)