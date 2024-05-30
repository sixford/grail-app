from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.conf import settings
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Item(models.Model):

    brand = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    colour = models.CharField(max_length=100)
    year_of_release = models.PositiveIntegerField()
    size = models.CharField(max_length=2)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='items')
    price = models.DecimalField(decimal_places=2, max_digits=5)
    description = models.CharField(max_length=250, default='', blank=True, null=True)

    def __str__(self):
      return f"{self.brand} {self.type} ({self.colour})"


    # categories = models.ForeignKey ("category.Category", on_delete=models.CASCADE)




