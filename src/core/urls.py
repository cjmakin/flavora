from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename="user")
# router.register(r'recipes', views.RecipeViewSet, basename="recipe")

urlpatterns = [
    path('', include(router.urls)),
    path('sign_up/', views.sign_up, name='sign_up'),
    path('sign_in/', views.sign_in, name='sign_in'),
    path('sign_out/', views.sign_out, name='sign_out'),
    path('curr_user/', views.curr_user, name='curr_user')
]
