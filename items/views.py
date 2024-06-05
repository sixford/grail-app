from .serializers.common import ItemSerializer, CartSerializer
from rest_framework import generics, permissions, status
from .models import Item, Cart, CartItem
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

# Index View
class ItemIndexView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Detail View
class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)
        

# Cart View
class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        item = get_object_or_404(Item, pk=pk)
        cart, created = Cart.objects.get_or_create(user=request.user)

        # Check if the item is already in the cart
        if CartItem.objects.filter(cart=cart, item=item).exists():
            return Response({"message": "Item is already in cart"}, status=status.HTTP_400_BAD_REQUEST)
        
        cart_item = CartItem.objects.create(cart=cart, item=item)
        return Response({"message": "Item added to cart"}, status=status.HTTP_201_CREATED)

class RemoveFromCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        item = get_object_or_404(Item, pk=pk)
        print(f"Item: {item}") 
        cart = get_object_or_404(Cart, user=request.user)
        print(f"Cart: {cart}")  
        cart_item = get_object_or_404(CartItem, cart=cart, item=item)
        print(f"CartItem: {cart_item}")  
        cart_item.delete()
        return Response(status=status.HTTP_200_OK)



