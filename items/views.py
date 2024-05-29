from .serializers.common import ItemSerializer
from rest_framework import generics
from .models import Item
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

# Index View
class ItemIndexView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

# Detail View
class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
