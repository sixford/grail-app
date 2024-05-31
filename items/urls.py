from django.urls import path
from .views import ItemIndexView, ItemDetailView, CartView, AddToCartView, RemoveFromCartView



urlpatterns = [
    path('', ItemIndexView.as_view(), name='item-list'),
    path('<int:pk>/', ItemDetailView.as_view(), name='item-detail'),
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/<int:pk>/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/remove/<int:pk>/', RemoveFromCartView.as_view(), name='remove-from-cart'),
]