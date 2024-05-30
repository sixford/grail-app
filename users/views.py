from rest_framework.generics import CreateAPIView
from .models import User
from .serializers.common import RegisterSerializer

# Create your views here.
class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer