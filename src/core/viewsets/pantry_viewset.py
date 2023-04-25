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
        ingredient_id = request.data.get('ingredient_id')

        try:
            user = request.user
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': f'User does not exist.'})

        try:
            ingredient = Ingredient.objects.get(id=ingredient_id)
        except Ingredient.DoesNotExist:
            return JsonResponse({'success': False, 'message': f'Ingredient with id {ingredient_id} does not exist'})

        try:
            pantry_item = Pantry(user=user, ingredient=ingredient)
            pantry_item.save()
            return JsonResponse({'success': True})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False})

    @action(detail=False, methods=['POST'])
    def remove_ingredient(self, request):
        ingredient_id = request.data.get('ingredient_id')

        try:
            user = request.user
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': f'User does not exist.'})

        try:
            ingredient = Ingredient.objects.get(id=ingredient_id)
        except Ingredient.DoesNotExist:
            return JsonResponse({'success': False, 'message': f'Ingredient with id {ingredient_id} does not exist'})

        pantry_item = Pantry.objects.filter(user=user, ingredient=ingredient)

        if pantry_item.exists():
            pantry_item.delete()
            return JsonResponse({'success': True, 'message': f"Ingredient {ingredient.id} removed from user {user.id}'s pantry"})
        else:
            return JsonResponse({'success': False, 'message': f'Ingredient {ingredient.id} and user {user.id} does not exist.'})
