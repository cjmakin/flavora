from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(blank=False, null=False, unique=True)
    first_name = models.CharField(max_length=255, null=False, blank=False)
    last_name = models.CharField(max_length=255, null=False, blank=False)
    food_preferences = ArrayField(
        models.CharField(max_length=50, blank=True),
        default=list
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        unique_together = ('email',)

    def __str__(self):
        return f"{self.id}: {self.email}"

    def __repr__(self):
        return f"{self.id}: {self.email}"


class Ingredient(models.Model):
    name = models.CharField(max_length=255, null=False)
    name_scientific = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    wikipedia_id = models.URLField(max_length=200, null=True)
    food_group = models.CharField(max_length=50, null=True)
    food_subgroup = models.CharField(max_length=50, null=True)

    def __str__(self):
        return f"{self.id}: {self.name}"

    def __repr__(self):
        return f"{self.id}: {self.name}"


class Recipe(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    instructions = models.TextField(null=False, blank=False)
    img_path = models.ImageField(upload_to='recipes/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id}: {self.name}"

    def __repr__(self):
        return f"{self.id}: {self.name}"


class UserRecipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'recipe'], name='unique_user_recipe')
        ]

    def __str__(self):
        return f"User: {self.user.get_full_name} | Recipe: {self.recipe.id}. {self.recipe.name}"

    def __repr__(self):
        return f"User: {self.user.get_full_name} | Recipe: {self.recipe.id}. {self.recipe.name}"


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['recipe', 'ingredient'], name='unique_recipe_ingredient_item')
        ]

    def __str__(self):
        return f"Recipe: {self.recipe.name}, Ingredient: {self.ingredient.name}"

    def __repr__(self):
        return f"Recipe: {self.recipe.name}, Ingredient: {self.ingredient.name}"


class Pantry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'ingredient'], name='unique_pantry_item')
        ]

    def __str__(self):
        return f"User: {self.user.get_full_name} | Ingredient: {self.ingredient.name}"

    def __repr__(self):
        return f"User: {self.user.get_full_name} | Ingredient: {self.ingredient.name}"
