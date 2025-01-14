from django.shortcuts import render
from .models import *
# Create your views here.
from .serializer import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics,status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  permission_classes = [AllowAny]
  serializer_class = RegisterSerializer


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
  if request.method == "GET":
    response= f"Hey {request.user}, You are seeing a GET request"
    return Response({'response': response}, status = status.HTTP_200_OK,)
  else:
    text = request.POST.get("text")
    response = f"Hey {request.user}, your text is {text}"
    return Response({'response': response}, status = status.HTTP_200_OK,)
  return response({}, status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_candidates(request, position):
  if position == 'mayor':
    candidates = Candidates_for_Mayor.objects.all()
    serializer = Candidates_for_mayor_serializer

  elif position == 'deputy mayor':
    candidates = Candidates_for_deputymayor.objects.all()
    serializer = Candidates_for_deputymayor_serializer

  else:
    return Response({'error': 'Invalid position '}, status = status.HTTP_400_BAD_REQUEST)
  return Response({serializer.data}, status=status.HTTP_200_OK)
