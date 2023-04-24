from django.http import JsonResponse
from rest_framework import viewsets
from core.serializers import RecipeSerializer
from rest_framework.decorators import action
from core.models import Recipe, User


#  A viewset that provides default `create()`, `retrieve()`, `update()`,
# `partial_update()`, `destroy()` and `list()` actions.

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def create(self, request):
        pass
