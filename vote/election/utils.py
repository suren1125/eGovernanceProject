from django.core.mail import send_mail
from django.conf import settings
from .serializer import *

def send_email_to_client(email, voter_id):
  subject = "This email is from e-Voting Nepal"
  message = f"Thank you for registering. Your Voter ID is : {voter_id}. Please keep it safe as you will need it to login"
  from_email = settings.EMAIL_HOST_USER
  recipient_list = [email]
  send_mail(subject, message, from_email, recipient_list)