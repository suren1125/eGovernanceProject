from .models import *
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import VotingWindow

class UserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = User
    fields = ['citizenship_number', 'first_name','last_name','gender','voted','voter_id']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)
    token['full_name'] = user.first_name
    token['full_name'] = user.last_name
    token['citizenship_number'] = user.citizenship_number
    token['voter_id'] = user.voter_id
    token['email'] = user.email
    token['address'] = user.address
    token['voted'] = user.voted
    return token


#Register 
class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only = True, required = True, validators = [validate_password])
  password2 = serializers.CharField(write_only = True, required = True,)
  citizenship_number = serializers.CharField(required = True)
  class Meta:
    model = User
    fields = ['username','citizenship_number', 'first_name','last_name','email','address','phone','gender', 'password','password2']

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError({
        "password": "Password fields does not match"})

    if len(str(attrs['phone']))!=10 :
        raise serializers.ValidationError({"phone": "Phone number should be 10 characters long"
      
      })
    return attrs
  
  def validate_citizenship_number(self, value):
    if len(value)!=10:
      raise serializers.ValidationError('Citizenship Number must be of 10 characters')
    return value
  
  def create(self, validated_data):
    user = User.objects.create_user(
      username = validated_data['username'],
      first_name = validated_data['first_name'],
      last_name = validated_data['last_name'],
      email = validated_data['email'],
      phone = validated_data['phone'],
      gender = validated_data['gender'],
      address = validated_data['address'],
      citizenship_number=validated_data['citizenship_number'], 
  
    )
    
    user.set_password (validated_data['password'])
    user.save()

    return user
  


#Login


class LoginSerializer(serializers.Serializer):
  voter_id = serializers.CharField(required = True)
  password = serializers.CharField(required = True)
 

  def validate(self, data):
    voter_id = data.get('voter_id')
    password = data.get('password')

    user = authenticate(username = voter_id, password = password)
    if user is None:
      raise serializers.ValidationError("Invalid voter ID or password.")
    data['user'] = user
    return data



#Mayor Candidates
class CandidatesForMayorSerializer(serializers.ModelSerializer):
    class Meta:
      model = CandidatesForMayor
      fields = '__all__'
    def __str__(self):
      return self.full_name 

    
#DeputyMayor Candidates
class CandidatesForDeputymayorSerializer(serializers.ModelSerializer):
    class Meta:
      model = CandidatesForDeputymayor
      fields = '__all__'
    def __str__(self):
      return self.full_name
    
#GeneralMemeber Candidates
class CandidatesForGeneralMembersSerializer(serializers.ModelSerializer):
    class Meta:
      model = CandidatesForGeneralMembers
      fields = '__all__'
    def __str__(self):
      return self.full_name

class VoteSerializer(serializers.Serializer):
    candidate_type = serializers.ChoiceField(choices=['mayor', 'deputy_mayor','general_member'])
    candidate_id = serializers.IntegerField()


class VotingWindowSerializer(serializers.ModelSerializer):
    start_datetime = serializers.SerializerMethodField()
    end_datetime = serializers.SerializerMethodField()
    is_voting_open = serializers.SerializerMethodField()

    class Meta:
        model = VotingWindow
        fields = ['start_datetime', 'end_datetime', 'is_voting_open']

    def get_start_datetime(self, obj):
        return obj.start_datetime.strftime("%B %d, %Y %I:%M %p")

    def get_end_datetime(self, obj):
        return obj.end_datetime.strftime("%B %d, %Y %I:%M %p")

    def get_is_voting_open(self, obj):
        return obj.is_voting_open()
