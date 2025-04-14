from django.contrib import admin
from .models import *
# Register your models here.

class UserAdmin(admin.ModelAdmin):
  list_display = ['first_name','voter_id','citizenship_number','voted']
  readonly_fields = ['voted']
  search_fields = ('first_name',)



class MayorAdmin(admin.ModelAdmin):
  list_display = ['id','full_name','votes_received','party_associated','election_promise','image']
  readonly_fields = ['votes_received']
  search_fields = ('full_name',)

 
class DepMayorAdmin(admin.ModelAdmin):
  list_display = ['id','full_name','votes_received','party_associated','election_promise','image']
  readonly_fields = ['votes_received']
  search_fields = ('full_name',)

  


admin.site.register(User, UserAdmin)
#admin.site.register(Voter, VotersAdmin)
admin.site.register(CandidatesForMayor, MayorAdmin)
admin.site.register(CandidatesForDeputymayor, DepMayorAdmin)
admin.site.register(Vote)