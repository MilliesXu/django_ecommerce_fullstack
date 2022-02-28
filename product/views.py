from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from .permissions import ProductPermission

# Create your views here.

class ProductListCreate(generics.ListCreateAPIView):
    permission_classes = [ProductPermission]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def post(self, request, *args, **kwargs):
        user = request.user

        request.data['user'] = user.id
        request.data['name'] = 'Sample Name'
        request.data['brand'] = 'Sample Brand'
        request.data['category'] = 'Sample Category'
        request.data['count_in_stock'] = 0
        request.data['rating'] = 0.0
        request.data['num_reviews'] = 0
        request.data['price'] = 0.0
        request.data['description'] = ''

        return super().post(request, *args, **kwargs)

class ProductRetriveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [ProductPermission]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
