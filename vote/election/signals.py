# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.contrib.auth.models import User
# from .models import *


# @receiver(post_save, sender=Vote)
# def update_voter_on_vote(sender, instance, created, **kwargs):
#     if created:  # When a vote is newly created
#         voter = instance.voter
#         Voters.objects.update_or_create(
#             voter_id=voter.voter_id,
#             defaults={
#                 'full_name': voter.full_name,
#                 'address': voter.address,
#                 'phone': voter.phone,
#                 'email': voter.email,
#                 'voted': True,  # Mark as voted
#             }
#         )