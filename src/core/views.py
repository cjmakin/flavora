from django.http import JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from core.serializers import UserSerializer
from core.models import *
import json

#  A viewset that provides default `create()`, `retrieve()`, `update()`,
# `partial_update()`, `destroy()` and `list()` actions.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    @action(detail=False, methods=['POST'])
    def sign_up(self, request):

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():

            new_user = User.objects.create_user(
                username=request.data['email'],
                email=request.data['email'],
                password=request.data['password'],
                first_name=request.data['first_name'],
                last_name=request.data['last_name'])

            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': serializer.errors})

    @action(detail=False, methods=['POST'])
    def sign_in(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            serializer = UserSerializer(user)

            login(request, user)
            user_data = serializer.data
            user_data['id'] = user.pk

            print(serializer.data)

            return JsonResponse({'success': True,
                                'user': user_data})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'})


    @action(detail=False, methods=['POST'])
    def sign_out(self, request):
        try:
            logout(request)
            return JsonResponse({"success": True})

        except Exception as e:
            print(e)
            return JsonResponse({"success": False})


    @action(detail=False, methods=['GET'])
    def current_user(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
    
            serializer = UserSerializer(request.user)
            return JsonResponse({'success': True, 'user': serializer.data})
