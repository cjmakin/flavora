from django.http import JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
import json
from core.models import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    #  A viewset that provides default `create()`, `retrieve()`, `update()`,
    # `partial_update()`, `destroy()` and `list()` actions.

    def retrieve(self, request, pk=None):
        pass


@api_view(["POST"])
def sign_up(request):

    try:
        new_user = User.objects.create_user(
            username=request.data['email'],
            email=request.data['email'],
            password=request.data['password'],
            first_name=request.data['first_name'],
            last_name=request.data['last_name'])

        print(new_user)
        return JsonResponse({'success': True})
    except Exception as e:
        print(e)
        return JsonResponse({'success': False})


@api_view(["POST"])
def sign_in(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, email=email, password=password)
    

    if user is not None:
        user_data = json.loads(serializers.serialize('json', 
                                                 [user], 
                                                 fields=['pk', 'username', 'food_preferences', 'first_name', 'last_name']))
        user_data[0]['fields']['id'] = user_data[0]['pk']

        login(request, user)

        return JsonResponse({'success': True,
                             'user': user_data[0]['fields']
                             })
    else:
        return JsonResponse({'success': False, 'message': 'Invalid credentials'})


@api_view(['POST'])
def sign_out(request):

    try:
        logout(request)
        return JsonResponse({"success": True})

    except Exception as e:
        print(e)
        return JsonResponse({"success": False})


@api_view(['GET'])
def curr_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        user_data = json.loads(serializers.serialize('json',
                                                     [request.user],
                                                     fields=['pk', 'username', 'food_preferences', 'first_name', 'last_name']))

        user_data[0]['fields']['id'] = user_data[0]['pk']

        return JsonResponse({'user': user_data[0]['fields']})
