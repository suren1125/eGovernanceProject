from .models import *
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = User
    fields = ['id', 'username','voter_id']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)

    token['full_name'] = user.profile.full_name
    token['username'] = user.username
    token['voter_id'] = user.full_name
    token['voted'] = user.profile.voted

    return token
  
class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only = True, required = True, validators = [validate_password])
  password2 = serializers.CharField(write_only = True, required = True,)

  class Meta:
    model = User
    fields = ['voter_id', 'username', 'password', 'password2']

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError({
        "password": "Password fields does not match"
      })
    return attrs
  
  def create(self, validated_data):
    user = User.objects.create(
      username = validated_data['username'],
      voter_id = validated_data['voter_id'],
    )
    user.set_password (validated_data['password'])
    user.save()

    return user
  

class LoginSerializer(serializers.Serializer):
  username = serializers.CharField(required = True)
  password = serializers.CharField(required = True)
  voter_id = serializers.IntegerField(required = True)

  def validate(self, data):
    user = authenticate(username = data['username'] ,  password = data['password'], voter_id = data['voter_id'])
    if user is None:
      raise serializers.ValidationError("Invalid username")
    data['user'] = user 
    return data
  


class Candidates_for_mayor_serializer(serializers.ModelSerializer):
    class Meta:
      model = Candidates_for_Mayor
      fields = '__all__'

class Candidates_for_deputymayor_serializer(serializers.ModelSerializer):
    class Meta:
      model = Candidates_for_deputymayor
      fields = '__all__'

