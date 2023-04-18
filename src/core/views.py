from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from pathlib import Path


def send_index(request):
    index_path = f"{Path(__file__).resolve().parent.parent}/static/index.html"
    index = open(index_path)
    return HttpResponse(index)


@api_view("POST")
def create_user_account(request):
    print(request.data)
    return JsonResponse({'success': True})
