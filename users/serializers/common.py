from rest_framework import serializers
from ..models import User
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password', 'password_confirmation', 'bio')

    def validate(self, data):
        password = data.get('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError('Passwords do not match.')
        
        
        return data
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)