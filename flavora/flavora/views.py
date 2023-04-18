from django.http import HttpResponse
from pathlib import Path

def send_index(request):
    index_path = f"{Path(__file__).resolve().parent.parent}/static/index.html"
    index = open(index_path)
    return HttpResponse(index)
