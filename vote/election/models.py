from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import uuid


# Create your models here.
class User(AbstractUser):
  id = models.AutoField(primary_key = True)
  username = models.CharField(max_length=40)
  citizenship_number = models.CharField(max_length=10)
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
  
  voter_id = models.CharField(max_length = 10, unique = True)


  def save(self, *args, **kwargs):
    if not self.voter_id:
      self.voter_id = self.generate_voter_id()
    super().save(*args, **kwargs)

  def generate_voter_id(self):
    return str(uuid.uuid4().int)[:10]

  #  USERNAME_FIELD = 'username'
  USERNAME_FIELD = 'voter_id'
  REQUIRED_FIELDS = ['username','citizenship_number','first_name', 'last_name','phone','gender','email']

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

  

class CandidatesForGeneralMembers(models.Model):
  candidate_members = models.OneToOneField(User, on_delete=models.CASCADE)
  candidate_type = models.CharField(max_length = 20, default='general_member')
  full_name = models.CharField(max_length = 100)
  image = models.ImageField(default = '1.jpg')
  area = models.CharField(max_length = 300)
  votes_received = models.IntegerField(default = 0)
  party_associated = models.CharField(max_length= 100)
  election_promise = models.CharField(max_length = 500)

  def __str__(self):
    return self.full_name
 



class Vote(models.Model):
  voter = models.OneToOneField(User, on_delete = models.CASCADE, related_name ='vote')
  mayor_candidate = models.ForeignKey(CandidatesForMayor, on_delete=models.SET_NULL, null = True, blank = True, related_name = 'votes_for_mayor')
  deputy_mayor_candidate = models.ForeignKey(CandidatesForDeputymayor, on_delete= models.SET_NULL, null = True,blank = True, related_name='votes_for_deputy_mayor')
  general_member_candidate = models.ForeignKey(CandidatesForGeneralMembers, on_delete= models.SET_NULL, null = True,blank = True, related_name='votes_for_general_member')

  def __str__(self):
    return f"Vote by {self.voter.citizenship_number}"
  
class VotingWindow(models.Model):
  start_datetime = models.DateTimeField()
  end_datetime = models.DateTimeField()

  def is_voting_open(self):
    now = timezone.now()
    return self.start_datetime <= now <=self.end_datetime
  
  def __str__(self):
    return f"Voting from {self.start_datetime} to {self.end_datetime}"


class TopMayorCandidate(CandidatesForMayor):
  class Meta:
    proxy = True
    verbose_name = 'Top Voted Mayor'
    verbose_name_plural = 'Top Voted Mayor'

class TopDeputyMayorCandidate(CandidatesForDeputymayor):
  class Meta:
    proxy = True
    verbose_name = 'Top Voted Deputy Mayor'
    verbose_name_plural = 'Top Voted Deputy Mayor'

class TopGeneralMemberCandidate(CandidatesForGeneralMembers):
  class Meta:
    proxy = True
    verbose_name = 'Top Voted General Members'
    verbose_name_plural = 'Top Voted General Members'
    
