from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.conf import settings

# Create your models here.

class Item(models.Model):

    brand = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    colour = models.CharField(max_length=100)
    year_of_release = models.PositiveIntegerField()
    size = models.CharField(max_length=2)
    # owner = models.ForeignKey(to='users.User',related_name='items_created', on_delete=models.SET_NULL, null=True,blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=5)
    description = models.CharField(max_length=250, default='', blank=True, null=True)

    def __str__(self):
      return f"{self.brand} {self.type}"


    # categories = models.ForeignKey ("category.Category", on_delete=models.CASCADE)

    


