from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only = True)
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self,obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews , many = True)
        return(serializer.data)
    
    # def get_image(self, obj):
    #     if obj.image:
    #         try:
    #             return obj.image.url
    #         except:
    #             return str(obj.image)
    #     return ''
    def get_image(self, obj):
        if obj.image:
            filename = obj.image.name.split('/')[-1]
            return f'https://horizon-backend-6mbl.onrender.com/static/images/{filename}'
        return ''





class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only = True)
    _id = serializers.SerializerMethodField(read_only = True)
    isAdmin = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = User
        fields = ['id','_id','username','email','name','isAdmin']

    def get_name(self,obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
    def get__id(self,obj):
        return obj.id
    
    def get_isAdmin(self,obj):
        return obj.is_staff



class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = User
        fields = ['id','_id','username','email','name','isAdmin','token']

    
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only = True)
    shippingAddress = serializers.SerializerMethodField(read_only = True)
    user = serializers.SerializerMethodField(read_only = True)
    
    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many = True)
        return serializer.data
    
    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddress.objects.get(order = obj)
            serializer = ShippingAddressSerializer(address, many = False)
            return serializer.data
        except:
            return False
    
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user , many = False)
        return serializer.data
    

