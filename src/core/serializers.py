from rest_framework import serializers
from core.models import User, Ingredient, Recipe


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'name_scientific',
                  'description', 'food_group', 'food_subgroup']


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'description', 'instructions',
                  'img_path', 'created_at', 'cooking_time', 'ingredients']
