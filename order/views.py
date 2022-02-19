from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Order, OrderItem, ShippingAddress
from .serializers import OrderSerializer
from product.models import Product
from datetime import datetime

# Create your views here.
class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        order_items = data['order_items']

        if not order_items and len(order_items) == 0:
             return Response({
                'detail': 'No order items'
             }, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Create Order
            order = Order.objects.create(
                user = user,
                payment_method = data['payment_method'],
                tax_price = data['tax_price'],
                shipping_price = data['shipping_price'],
                total_price = data['total_price'],
            )

            # Create Shipping Address
            shipping = ShippingAddress.objects.create(
                order = order,
                address = data['shipping_address']['address'],
                city = data['shipping_address']['city'],
                postal_code = data['shipping_address']['postalCode'],
                country = data['shipping_address']['country'],
            )

            # Create Order Item
            for order_item in order_items:
                product = Product.objects.get(id=order_item['product'])

                item = OrderItem.objects.create(
                    product = product,
                    order = order,
                    name = product.name,
                    qty = order_item['qty'],
                    price = order_item['price'],
                    image = product.image.url,
                )

                # Update Stock
                product.count_in_stock -= item.qty
                product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

    def get(self, request):
        user = request.user
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

class OrderDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = request.user

        try:
            order = Order.objects.get(id=pk)

            if user.is_staff or order.user == user:
                serializer = OrderSerializer(order, many=False)
                return Response(serializer.data)
            else:
                message = {'detail': 'Not authenticated'}

                return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        except:
            message = {'detail': 'Order does not exist'}

            return Response(message, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        order = Order.objects.get(id=pk)

        order.is_paid = True
        order.paid_at = datetime.now()
        order.save()
        return Response('Order was paid')
