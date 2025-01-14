from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

# Create your models here.
class User(AbstractUser):
  username = models.CharField(unique=True,max_length = 100)
  voter_id = models.IntegerField(unique = True)

  #USERNAME_FIELD = 'voter_id'
  #  USERNAME_FIELD = 'username'

  REQUIRED_FIELDS = ['voter_id']

  def __str__(self):
    return self.username
  
class Candidates_for_Mayor(models.Model):
  candidate_mayor = models.OneToOneField(User, on_delete=models.CASCADE)
  full_name = models.CharField(max_length = 100)
  area = models.CharField(max_length = 300)
  votes_received = models.IntegerField(default= 0)
  party_associated = models.CharField(max_length= 100)
  election_promise = models.CharField(max_length = 500)
  def __str__(self):
    return self.candidate_mayor.username

class Candidates_for_deputymayor(models.Model):
  candidate_dep_mayor = models.OneToOneField(User, on_delete=models.CASCADE)
  full_name = models.CharField(max_length = 100)
  area = models.CharField(max_length = 300)
  votes_received = models.IntegerField(default = 0)
  party_associated = models.CharField(max_length= 100)
  election_promise = models.CharField(max_length = 500)
  def __str__(self):
    return self.full_name
  
class Profile(models.Model):
   user = models.OneToOneField(User,on_delete = models.CASCADE)
   
   full_name = models.CharField(max_length = 300)
   area =  models.CharField(max_length= 30)
   voted = models.BooleanField(default = False)
  

   def __str__(self):
     return self.full_name

def create_user_profile(sender, instance, created, **kwargs):
  if created:
    Profile.objects.create(user = instance)

def save_user_profile(sender, instance ,**kwargs):
  instance.profile.save()


post_save.connect(create_user_profile, sender = User)

post_save.connect(save_user_profile, sender = User)