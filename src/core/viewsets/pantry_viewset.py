from django.http import JsonResponse
from rest_framework import viewsets
from core.serializers import IngredientSerializer
from rest_framework.decorators import action
from core.models import User, Pantry, Ingredient


class PantryViewSet(viewsets.ModelViewSet):
    queryset = Pantry.objects.all()

    def list(self, request):
        pantry_items = Pantry.objects.filter(user=request.user)
        ingredients = [item.ingredient for item in pantry_items]
        serializer = IngredientSerializer(ingredients, many=True)
        return JsonResponse({'success': True, 'data': serializer.data})

    def create(self, request):
        ingredient_ids = request.data.get('ingredient_ids')

        try:
            user = request.user
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': f'User does not exist.'})

        try:
            for ingredient_id in ingredient_ids:
                ingredient = Ingredient.objects.get(id=ingredient_id)
                pantry_item = Pantry(user=user, ingredient=ingredient)
                pantry_item.save()

            pantry_items = Pantry.objects.filter(user=request.user)
            ingredients = [item.ingredient for item in pantry_items]
            serializer = IngredientSerializer(ingredients, many=True)
            return JsonResponse({'success': True, 'data': serializer.data})

        except Ingredient.DoesNotExist:
            return JsonResponse({'success': False, 'message': f'Ingredient with id {ingredient_id} does not exist'})

    @action(detail=False, methods=['POST'])
    def remove_ingredient(self, request):
        ingredient_ids = request.data.get('ingredient_ids')

        try:
            user = request.user
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': f'User does not exist.'})

        try:
            for ingredient_id in ingredient_ids:
                pantry_item = Pantry.objects.get(user=user, ingredient__id=ingredient_id)
                pantry_item.delete() 

            pantry_items = Pantry.objects.filter(user=request.user)
            ingredients = [item.ingredient for item in pantry_items]
            serializer = IngredientSerializer(ingredients, many=True)
            return JsonResponse({'success': True, 'data': serializer.data})

        except Ingredient.DoesNotExist:
            return JsonResponse({'success': False, 'message': f'Ingredient with id {ingredient_id} does not exist'})
