from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

class Item(models.Model):
    name = models.CharField(max_length=100, default='Unnamed')  # 🔹 New field for item name (used in search)

    brand = models.CharField(max_length=100)
    type = ArrayField(models.CharField(max_length=100, blank=True, null=True))
    colour = models.CharField(max_length=100)
    year_of_release = models.PositiveIntegerField()
    size = models.CharField(max_length=2)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='items')
    price = models.DecimalField(decimal_places=2, max_digits=5)
    description = models.CharField(max_length=250, default='', blank=True, null=True)
    image_1 = models.CharField(max_length=300, null=True, blank=True)
    image_2 = models.CharField(max_length=300, null=True, blank=True)
    image_3 = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.brand}, {self.colour})"

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart')

    def __str__(self):
        return f"Cart of {self.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='carts')
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item.name} in cart of {self.cart.user.username}"
