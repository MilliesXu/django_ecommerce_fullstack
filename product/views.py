from rest_framework import generics, status
from .models import Product, Review
from .serializers import ProductSerializer, ReviewSerializer
from .permissions import ProductPermission, ReviewPermission
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# Create your views here.

class ProductListCreate(generics.ListCreateAPIView):
    permission_classes = [ProductPermission]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        query = self.request.query_params.get('keyword')

        if query != None:
            products = Product.objects.filter(name__icontains=query)
        else:
            products = Product.objects.all()

        return products

    def get(self, request, *args, **kwargs):
        products = self.get_queryset()

        page = self.request.query_params.get('page')
        paginator = Paginator(products, 5)

        try:
            products = paginator.page(page)
        except PageNotAnInteger:
            products = paginator.page(1)
        except EmptyPage:
            products = paginator.page(paginator.num_pages)

        if page == None:
            page = 1

        page = int(page)

        serializer = ProductSerializer(products, many=True)

        return Response({
            'products': serializer.data,
            'page': page,
            'pages': paginator.num_pages,
        })

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

class ReviewListCreate(generics.ListCreateAPIView):
    permission_classes = [ReviewPermission]

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def post(self, request, *args, **kwargs):

        user = request.user
        product = Product.objects.get(id=request.data['product'])
        request.data['user'] = user.id
        request.data['name'] = user.first_name

        # Review already exist
        is_exist = product.review_set.filter(user=user).exists()

        if is_exist:
            content = {'detail': 'Product already reviews'}
            return Response(content, status.HTTP_400_BAD_REQUEST)

        # No rating
        elif request.data['rating'] == 0:
            content = {'detail', 'Please select a rating'}
            return Response(content, status.HTTP_400_BAD_REQUEST)

        super().post(request, *args, **kwargs)

        reviews = product.review_set.all()
        product.num_reviews = len(reviews)

        total = 0
        for review in reviews:
            total += review.rating

        product.rating = total / len(reviews)
        product.save()

        return Response({'detail': 'Review Added'}, status.HTTP_200_OK)
