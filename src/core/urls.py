from django.urls import path
from . import views

urlpatterns = [
    path('', views.send_index, name='index')
]
