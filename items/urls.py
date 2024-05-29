from django.urls import path
from .views import ItemIndexView, ItemDetailView


urlpatterns = [
    path('', ItemIndexView.as_view()),
    path('<int:pk>/', ItemDetailView.as_view())

]