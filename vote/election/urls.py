from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  path('token/',views.MyTokenObtainPairView.as_view()),
  path('token/refresh/',TokenRefreshView.as_view()),
  path('register/',views.RegisterView.as_view()),
  path('dashboard/', views.dashboard),
  path('get_candidates_mayor/',views.get_candidates_mayor),
  path('get_candidates_deputymayor/',views.get_candidates_deputymayor),
  path('get_candidates_generalmembers/',views.get_candidates_generalmembers),
  path('login/',views.login),
  path('vote/',views.vote_for_candidate,),
  

]
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
