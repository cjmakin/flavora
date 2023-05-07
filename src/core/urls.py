from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.viewsets.user_viewset import UserViewSet
from core.viewsets.pantry_viewset import PantryViewSet
from core.viewsets.recipe_viewset import RecipeViewSet
from core import views

router = DefaultRouter()
router.register(r'users', UserViewSet, basename="user")
router.register(r'pantries', PantryViewSet, basename="pantry")
router.register(r'recipes', RecipeViewSet, basename="recipe")

urlpatterns = [
    path('', include(router.urls)),
    path('ingredients/', views.search_ingredients, name="ingredients")
]


# ALL API ENDPOINTS:

# USERS:
#   POST api/users/sign_up/ - Create new account
#   POST api/users/sign_in/ - Sign in
#   POST api/users/sign_out/ - Sign out
#   GET api/users/current_user/ - Get user info

# PANTRIES:
#   POST api/pantries/ - Create new pantry
#   GET api/pantries/ - Get user's pantry
#   POST api/pantries/remove_ingredient/ - Remove ingredient from user's pantry

# RECIPES:
#   POST api/recipes/ - Create new recipe
#   POST api/recipes/save/ - Save recipe to user's cookbook
#   POST api/recipes/remove_recipe - Remove recipe from user's cookbook
#   GET api/recipes/cookbook/ - Get user's cookbook
#   GET api/recipes/ - Get all recipes
#   GET api/recipes/{user_id}/ - Get recipes by user id

# INGREDIENTS:
#   GET api/ingredients/ - Search for ingredients by name
