from rest_framework import serializers
from .models import Order, OrderItem, ShippingAddress
from user.serializers import UserSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_items(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)

        return serializer.data

    def get_shipping_address(self, obj):
        try:
            shipping_address = ShippingAddressSerializer(obj.shipping_address, many=False)
        except:
            shipping_address = False
        
        return shipping_address

    def get_user(self, obj):
        serializer = UserSerializer(obj.user, many=False)

        return serializer.data

