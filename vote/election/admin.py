from django.contrib import admin
from .models import *
# Register your models here.

class UserAdmin(admin.ModelAdmin):
  list_display = ['username','voter_id']

class ProfileAdmin(admin.ModelAdmin):
  # list_editable = ['voted']
  list_display = ['user','full_name','voted']
  search_fields = ('user',)

class MayorAdmin(admin.ModelAdmin):
  list_display = ['full_name','votes_received','party_associated','election_promise']
  readonly_fields = ['votes_received']
  search_fields = ('full_name',)

  fields = ('full_name', 'area','party_associated', 'election_promise', 'votes_received',)

class DepMayorAdmin(admin.ModelAdmin):
  list_display = ['full_name','votes_received','party_associated','election_promise']
  readonly_fields = ['votes_received']
  search_fields = ('full_name',)
  


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Candidates_for_Mayor, MayorAdmin)
admin.site.register(Candidates_for_deputymayor, DepMayorAdmin)