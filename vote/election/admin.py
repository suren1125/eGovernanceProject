from django.contrib import admin
from .models import *
# Register your models here.

class UserAdmin(admin.ModelAdmin):
  list_display = ['first_name','voter_id','citizenship_number','voted']
  readonly_fields = ['voted']
  search_fields = ('first_name',)

class VotersAdmin(admin.ModelAdmin):
  # list_editable = ['voted']
  list_display = ['first_name','voter_id','citizenship_number','voted']
  readonly_fields = ['voted']
  search_fields = ('first_name',)
  def save_model(self, request, obj, form, changed):
    if obj.voted:
      if created: 
        voter, created = Voter.objects.get_or_create(
                voter_id=obj.voter_id,
                defaults={
                    'citizenship_number': obj.citizenship_number,
                    'first_name': obj.first_name,
                    'last_name': obj.last_name,
                    'gender': obj.gender,
                    'address': obj.address,
                    'phone': obj.phone,
                    'email': obj.email,
                    'voted':obj.voted,
                    'voter_id': obj.voter_id
                })
      else:
        voter = voter.objects.create(citizenship_number = obj.citizenship_number, 
        first_name = obj.full_name,
        last_name = obj.last_name,
        gender = obj.gender,
        address = obj.address,
        phone = obj.phone,
        voted = obj.voted,
        voter_id = obj.voter_id,)

      voter.save()

      super().save_model(request, obj, form, changed)



class MayorAdmin(admin.ModelAdmin):
  list_display = ['id','full_name','votes_received','party_associated','election_promise','image']
  readonly_fields = ['votes_received']
  search_fields = ('full_name',)

 
class DepMayorAdmin(admin.ModelAdmin):
  list_display = ['full_name','votes_received','party_associated','election_promise','image']
  readonly_fields = ['votes_received']
  search_fields = ('full_name',)

  


admin.site.register(User, UserAdmin)
admin.site.register(Voter, VotersAdmin)
admin.site.register(CandidatesForMayor, MayorAdmin)
admin.site.register(CandidatesForDeputymayor, DepMayorAdmin)
admin.site.register(Vote)