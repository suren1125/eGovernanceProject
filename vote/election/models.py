from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.db.models import Count, Max
import uuid

# Create your models here.
class User(AbstractUser):
  username = models.CharField(max_length=40)
  citizenship_number = models.CharField(max_length=14, primary_key=True)
  GENDER = [('Male','Male'),
            ('Female','Female'),            
            ('Other','Other'),]
  first_name = models.CharField(max_length = 20)
  last_name = models.CharField(max_length = 20)  
  address = models.CharField(max_length=30)
  email = models.EmailField()
  phone = models.CharField(max_length = 10)
  gender = models.CharField(max_length=6, choices = GENDER)
  voted = models.BooleanField(default=False)
  voter_id = models.CharField(max_length = 10)


  def save(self, *args, **kwargs):
    if not self.voter_id:
      self.voter_id = self.generate_voter_id()
    super().save(*args, **kwargs)

  def generate_voter_id(self):
    return str(uuid.uuid4().int)[:10]

  #  USERNAME_FIELD = 'username'
  USERNAME_FIELD = 'citizenship_number'
  REQUIRED_FIELDS = ['username','first_name', 'last_name','phone','gender','email']
  @classmethod
  def total_voters(cls):
    return cls.objects.count()

  @classmethod
  def total_voted(cls):
    return cls.objects.filter(voted=True).count()

  def __str__(self):
    return self.citizenship_number

def upload_to(instance, filename):
  return 'posts/{filename}', format(filename = filename) 

  
class CandidatesForMayor(models.Model):
  candidate_mayor = models.OneToOneField(User, on_delete=models.CASCADE)
  candidate_type = models.CharField(max_length = 20, default='mayor')
  full_name = models.CharField(max_length = 100)
  image = models.ImageField(default = '1.jpg')
  area = models.CharField(max_length = 300)
  votes_received = models.IntegerField(default= 0)
  party_associated = models.CharField(max_length= 100)
  election_promise = models.CharField(max_length = 500)
  @classmethod
  def get_highest_voted(cls):
    return cls.objects.order_by('-votes_received').first()


  def __str__(self):
    return self.full_name


class CandidatesForDeputymayor(models.Model):
  candidate_dep_mayor = models.OneToOneField(User, on_delete=models.CASCADE)
  candidate_type = models.CharField(max_length = 20, default='deputy_mayor')
  full_name = models.CharField(max_length = 100)
  image = models.ImageField(default = '1.jpg')
  area = models.CharField(max_length = 300)
  votes_received = models.IntegerField(default = 0)
  party_associated = models.CharField(max_length= 100)
  election_promise = models.CharField(max_length = 500)
  def __str__(self):
    return self.full_name
  @classmethod
  def get_highest_voted(cls):
    return cls.objects.order_by('-votes_received').first()




class Voter(models.Model):
  user = models.OneToOneField(User,on_delete = models.CASCADE)
  citizenship_number = models.CharField(max_length=14, primary_key=True)
  GENDER = [('Male','Male'),
            ('Female','Female'),            ('Other','Other'),]
  first_name = models.CharField(max_length = 20)
  last_name = models.CharField(max_length = 20)  
  address = models.CharField(max_length=30)
  email = models.EmailField()
  phone = models.CharField(max_length = 10)
  gender = models.CharField(max_length=6, choices = GENDER)
  voted = models.BooleanField(default=False)
  voter_id = models.CharField(max_length = 10)

  def __str__(self):
    return self.citizenship_number


class Vote(models.Model):
  voter = models.OneToOneField(Voter, on_delete = models.CASCADE, related_name ='vote')
  mayor_candidate = models.ForeignKey(CandidatesForMayor, on_delete=models.SET_NULL, null = True, blank = True, related_name = 'votes_for_mayor')
  deputy_mayor_candidate = models.ForeignKey(CandidatesForDeputymayor, on_delete= models.SET_NULL, null = True,blank = True, related_name='votes_for_deputy_mayor')

  def __str__(self):
    return f"Vote by {self.voter.citizenship_number}"
