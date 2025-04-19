from django.contrib import admin
from django.db.models import Max
from django.contrib import messages
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


class GeneralMembersAdmin(admin.ModelAdmin):
  list_display = ['id','full_name','votes_received','party_associated','election_promise','image']
  readonly_fields = ['votes_received']
  search_fields = ('full_name',)

 


@admin.register(TopMayorCandidate)
class TopMayorCandidateAdmin(admin.ModelAdmin):
  list_display=['full_name', 'votes_received']
  readonly_fields = ['full_name','votes_received','party_associated','election_promise','image']

  def get_queryset(self, request):
    queryset = super().get_queryset(request)
    max_votes = queryset.aggregate(Max('votes_received'))['votes_received__max']
    if max_votes is not None:
      return queryset.filter(votes_received=max_votes)
    return queryset.none()
  
  def has_add_permission(self, request):
    return False
  
  def has_delete_permission(self, request, obj = None):
    return False

  
  def has_change_permission(self, request, obj=None):
    return False


@admin.register(TopGeneralMemberCandidate)
class TopGeneralMemberCandidateAdmin(admin.ModelAdmin):
  list_display=['full_name', 'votes_received']
  readonly_fields = ['full_name','votes_received','party_associated','election_promise','image']

  def get_queryset(self, request):
    queryset = super().get_queryset(request)
    max_votes = queryset.aggregate(Max('votes_received'))['votes_received__max']
    if max_votes is not None:
      return queryset.filter(votes_received=max_votes)
    return queryset.none()
  
  def has_add_permission(self, request):
    return False
  
  def has_delete_permission(self, request, obj = None):
    return False


  
@admin.register(TopDeputyMayorCandidate)
class TopDeputyMayorCandidateAdmin(admin.ModelAdmin):
  list_display=['full_name', 'votes_received']
  readonly_fields = ['votes_received']
  
  def get_queryset(self, request):
    qs = super().get_queryset(request).order_by('-votes_received')
    top_candidate = qs.first()
    return qs.filter(pk = top_candidate.pk) if top_candidate else qs.none()

  def has_add_permission(self, request):
    return False
  
  def has_delete_permission(self, request, obj = None):
    return False


@admin.register(VotingWindow)
class VotingWindowAdmin(admin.ModelAdmin):
  list_display  = ('start_datetime','end_datetime')


@admin.register(TotalVoters)
class VotersAdmin(admin.ModelAdmin):
  list_display = ['citizenship_number','first_name','last_name','voted']
  readonly_fields = ['citizenship_number','first_name','last_name','voted']

  def get_queryset(self, request):
    qs = super().get_queryset(request).filter(voted = True)
    return qs

  def changelist_view(self, request, extra_context = None): 
    total_voted = User.objects.filter(voted = True).count()
    extra_context = extra_context or {}
    extra_context['voters_count'] = total_voted
    return super().changelist_view(request, extra_context=extra_context)


    # self.message_user(
    #   request, f"Total Registered Voters: {total_voters} |Total Completed Voters: {total_voted}",level = messages.INFO
    # )


admin.site.register(User, UserAdmin)
#admin.site.register(Voter, VotersAdmin)
admin.site.register(CandidatesForMayor, MayorAdmin)
admin.site.register(CandidatesForDeputymayor, DepMayorAdmin)
admin.site.register(CandidatesForGeneralMembers,GeneralMembersAdmin)
# admin.site.register(Vote)

