from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.viewsets.user_viewset import UserViewSet
from core.viewsets.pantry_viewset import PantryViewSet
from core import views

router = DefaultRouter()
router.register(r'users', UserViewSet, basename="user")
router.register(r'pantries', PantryViewSet, basename="pantry")

urlpatterns = [
    path('', include(router.urls)),
    path('ingredients/', views.search_ingredients, name="ingredients")
]
