from django.http import JsonResponse
from rest_framework import viewsets
from core.serializers import RecipeSerializer
from rest_framework.decorators import action
from core.models import Recipe, UserRecipe, User
from core.utilities import generate_recipe, generate_image, save_image


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def list(self, request):
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return JsonResponse({'success': True, 'data': serializer.data})

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @action(detail=False, methods=['POST'])
    def create_recipe(self, request):

        if not request.user.is_authenticated:
            return JsonResponse({'success': False, 'message': 'User not authenticated.'})

        user_email = request.user.email
        ingredients = request.data['ingredients']
        cooking_time = request.data['cooking_time']
        food_preferences = request.data['food_preferences']

        recipe = generate_recipe(user_email=user_email, ingredients=ingredients,
                                 cooking_time=cooking_time, food_preferences=food_preferences)

        if recipe == -1:
            return JsonResponse({'success': False, 'message': 'Recipe creation failed. Please try again later.'})

        return JsonResponse({'success': True, 'data': recipe})

    @action(detail=False, methods=['POST'])
    def create_image(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({'success': False, 'message': 'User not authenticated.'})

        user_email = request.user.email
        recipe_description = request.data['recipe_description']

        img_url = generate_image(recipe_description, user_email)

        if img_url == -1:
            return JsonResponse({'success': False, 'message': 'Image creation failed. Please try again later.'})

        return JsonResponse({'success': True, 'data': {'img_url': img_url}})

    @action(detail=False, methods=['POST'])
    def save(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({'success': False, 'message': 'User not authenticated.'})

        print(request.data)
        user = request.user
        name = request.data['name']
        description = request.data['description']
        instructions = request.data['instructions']
        ingredients = request.data['ingredients']
        cooking_time = request.data['cooking_time']
        img_url = request.data['img_url']

        recipe = Recipe.objects.create(
            name=name,
            description=description,
            instructions=instructions,
            ingredients=ingredients,
            cooking_time=cooking_time,
        )

        recipe_id = recipe.id
        img_path = save_image(img_url, user.id, recipe_id)

        print("Image saved: ", img_path)

        if img_path == -1:
            return JsonResponse({'success': False, 'message': 'Image save failed.'})

        recipe.img_path = img_path
        recipe.save()

        user_recipe = UserRecipe.objects.create(user=user, recipe=recipe)
        user_recipe.save()

        serializer = RecipeSerializer(recipe)

        return JsonResponse({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['GET'])
    def cookbook(self, request):
        user_recipes = UserRecipe.objects.filter(user=request.user)
        recipes = [item.recipe for item in user_recipes]
        serializer = RecipeSerializer(recipes, many=True)
        return JsonResponse({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['POST'])
    def remove_recipe(self, request):
        recipe_id = request.data['recipe_id']

        try:
            user = request.user
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': f'User does not exist.'})

        try:
            recipe = Recipe.objects.get(id=recipe_id)
        except Recipe.DoesNotExist:
            return JsonResponse({'success': False, 'message': f'Ingredient with id {recipe_id} does not exist'})

        user_recipe = UserRecipe.objects.get(user=user, recipe=recipe)
        user_recipe.delete()
        recipe.delete()

        return JsonResponse({'success': True, 'message': f'Recipe with id {recipe_id} deleted successfully.'})
