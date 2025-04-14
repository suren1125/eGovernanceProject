from django.shortcuts import render
from .models import *
# Create your views here.
from .serializer import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics,status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse
from .utils import send_email_to_client
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
   

class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  permission_classes = [AllowAny]
  serializer_class = RegisterSerializer
  
  def perform_create(self, serializer):
      user = serializer.save()
      send_email_to_client(user.email, user.voter_id)



@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
  serializer = LoginSerializer(data = request.data, context = {'request': request})

  if serializer.is_valid():
     user = serializer.validated_data['user']
     refresh = RefreshToken.for_user(user)
     access_token = refresh.access_token
     access_token['full_name'] = f"{user.first_name} {user.last_name}" 
     access_token['citizenship_number'] = user.citizenship_number
     access_token['voted'] = user.voted
     return Response({
            'refresh': str(refresh),
            'access': str(access_token),
            'user': {
                'full_name': f"{user.first_name} {user.last_name}",
                'citizenship_number': user.citizenship_number,
                'voter_id': user.voter_id,
                'voted': user.voted
            }
        }, status=status.HTTP_200_OK)
  else:
     return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



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
@permission_classes([AllowAny])
def get_candidates_mayor(request):
    candidates = CandidatesForMayor.objects.all()
    serializer = CandidatesForMayorSerializer(candidates, many = True)
    # json_data = JSONRenderer().render(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_candidates_deputymayor(request):
    candidates = CandidatesForDeputymayor.objects.all()
    serializer = CandidatesForDeputymayorSerializer(candidates, many = True)
    # json_data = JSONRenderer().render(serializer.data)
    return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def vote_for_candidate(request):
#    serializer = VoteSerializer(data=request.data)
#    if serializer.is_valid():
#       voter = request.user
#       candidate_type = request.data.get('candidate_type')
#       candidate_id = request.data.get('id')


#       if not candidate_type or not candidate_id:
#             return Response({"error": "Invalid data provided."}, status=400)
#       try:
#           candidate_id = int(candidate_id)
#       except ValueError:
#           return Response({"error":"Invalid candidate ID type. Must be integer"})

#       if voter.voted:
#             return Response({"error": "You have already voted."}, status=400)
#       try:
#           with transaction.atomic():
#             vote, created = Vote.objects.get_or_create(voter = voter)

#             if candidate_type == "mayor":
#                 if vote.mayor_candidate is not None:
#                   return Response({"error": "You have already voted for a mayor candidate"})
#                 try:
#                     mayor_candidate = CandidatesForMayor.objects.get(id=candidate_id)
#                 except CandidatesForMayor.DoesNotExist:
#                     return Response({"error": "Mayor candidate not found"}, status = status.HTTP_404_NOT_FOUND)
                    
#                 vote.mayor_candidate = mayor_candidate
#                 vote.save()
#                 mayor_candidate.votes_received += 1
#                 mayor_candidate.save()
              
#             elif candidate_type == "deputy_mayor":
#                 if vote.deputy_mayor_candidate is not None:
#                   return Response({"error": "You have already voted for a deputy mayor candidate"})
                
#                 try:
#                     deputy_mayor_candidate = CandidatesForDeputymayor.objects.get(id=candidate_id)
#                 except CandidatesForDeputymayor.DoesNotExist:
#                     return Response({"error": "Deputy mayor candidate not found"}, status = status.HTTP_404_NOT_FOUND)
      
#                 vote.deputy_mayor_candidate = deputy_mayor_candidate
#                 vote.save()
#                 deputy_mayor_candidate.votes_received += 1
#                 deputy_mayor_candidate.save()

#             else:
#                 return Response({'error': 'Invalid candidate type.'},status = status.HTTP_400_BAD_REQUEST)
            

#             #both votes are complete

#             if vote.mayor_candidate is not None and vote.deputy_mayor_candidate is not None:
#               voter.voted = True
#               voter.save()
#               return Response({'message':'Vote successfully cast!'},status = status.HTTP_200_OK)

#             return Response({
#            'message': f'Vote successfully cast for   {candidate_type}   candidate!',
#             'mayor_voted_for': vote.mayor_candidate.full_name if vote.mayor_candidate else None,
#             'deputy_mayor_voted_for': vote.deputy_mayor_candidate.full_name if vote.deputy_mayor_candidate else None,
#              }, status = status.HTTP_200_OK)
      
#       except Exception as e:
#           return Response({"error": str(e)})
      
      
#     return Response(serializer.errors, status=400)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def vote_for_candidate(request):
#     serializer = VoteSerializer(data=request.data)
#     if serializer.is_valid():
#         voter = request.user
#         candidate_type = request.data.get('candidate_type')
#         candidate_id = request.data.get('id')

#         if not candidate_type or not candidate_id:
#             return Response({"error": "Invalid data provided."}, status=400)
#         try:
#             candidate_id = int(candidate_id)
#         except ValueError:
#             return Response({"error": "Invalid candidate ID type. Must be integer"})

#         if voter.voted:
#             return Response({"error": "You have already voted."}, status=400)

#         try:
#             with transaction.atomic():
#                 vote, created = Vote.objects.get_or_create(voter=voter)

#                 if candidate_type == "mayor":
#                     if vote.mayor_candidate is not None:
#                         return Response({"error": "You have already voted for a mayor candidate"})
#                     try:
#                         mayor_candidate = CandidatesForMayor.objects.get(id=candidate_id)
#                     except CandidatesForMayor.DoesNotExist:
#                         return Response({"error": "Mayor candidate not found"}, status=status.HTTP_404_NOT_FOUND)

#                     vote.mayor_candidate = mayor_candidate
#                     vote.save()
#                     mayor_candidate.votes_received += 1
#                     mayor_candidate.save()

#                 elif candidate_type == "deputy_mayor":
#                     if vote.deputy_mayor_candidate is not None:
#                         return Response({"error": "You have already voted for a deputy mayor candidate"})

#                     try:
#                         deputy_mayor_candidate = CandidatesForDeputymayor.objects.get(id=candidate_id)
#                     except CandidatesForDeputymayor.DoesNotExist:
#                         return Response({"error": "Deputy mayor candidate not found"}, status=status.HTTP_404_NOT_FOUND)

#                     vote.deputy_mayor_candidate = deputy_mayor_candidate
#                     vote.save()
#                     deputy_mayor_candidate.votes_received += 1
#                     deputy_mayor_candidate.save()

#                 else:
#                     return Response({'error': 'Invalid candidate type.'}, status=status.HTTP_400_BAD_REQUEST)

#                 # both votes are complete
#                 if vote.mayor_candidate is not None and vote.deputy_mayor_candidate is not None:
#                     voter.voted = True
#                     voter.save()
#                     return Response({'message': 'Vote successfully cast!'}, status=status.HTTP_200_OK)

#                 return Response({
#                     'message': f'Vote successfully cast for {candidate_type} candidate!',
#                     'mayor_voted_for': vote.mayor_candidate.full_name if vote.mayor_candidate else None,
#                     'deputy_mayor_voted_for': vote.deputy_mayor_candidate.full_name if vote.deputy_mayor_candidate else None,
#                 }, status=status.HTTP_200_OK)

#         except Exception as e:
#             return Response({"error": str(e)})

    
#     return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def vote_for_candidate(request):
    serializer = VoteSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    voter = request.user
    candidate_type = serializer.validated_data['candidate_type']
    candidate_id = serializer.validated_data['id']

    if voter.voted:
        return Response({"error": "You have already voted."}, status=400)

    try:
        with transaction.atomic():
            vote, created = Vote.objects.select_for_update().get_or_create(voter=voter)

            if candidate_type == "mayor":
                if vote.mayor_candidate:
                    return Response({"error": "You have already voted for a mayor."}, status=400)
                try:
                    mayor_candidate = CandidatesForMayor.objects.get(id=candidate_id)
                except CandidatesForMayor.DoesNotExist:
                    return Response({"error": "Mayor candidate not found."}, status=404)

                vote.mayor_candidate = mayor_candidate
                mayor_candidate.votes_received += 1
                mayor_candidate.save()

            elif candidate_type == "deputy_mayor":
                if vote.deputy_mayor_candidate:
                    return Response({"error": "You have already voted for a deputy mayor."}, status=400)
                try:
                    deputy_candidate = CandidatesForDeputymayor.objects.get(id=candidate_id)
                except CandidatesForDeputymayor.DoesNotExist:
                    return Response({"error": "Deputy mayor candidate not found."}, status=404)

                vote.deputy_mayor_candidate = deputy_candidate
                deputy_candidate.votes_received += 1
                deputy_candidate.save()
            else:
                return Response({"error": "Invalid candidate type."}, status=400)

            # Save vote only after assigning candidate
            vote.save()

            # If both are voted, mark voter as voted
            if vote.mayor_candidate and vote.deputy_mayor_candidate:
                voter.voted = True
                voter.save()
                return Response({"message": "Your vote has been successfully submitted!"}, status=200)

            return Response({
                "message": f"Vote for {candidate_type.replace('_', ' ')} submitted successfully.",
                "mayor_voted_for": vote.mayor_candidate.full_name if vote.mayor_candidate else None,
                "deputy_mayor_voted_for": vote.deputy_mayor_candidate.full_name if vote.deputy_mayor_candidate else None
            }, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
