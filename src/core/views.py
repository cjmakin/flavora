from django.http import JsonResponse
from rest_framework.decorators import api_view
from core.serializers import IngredientSerializer
from core.models import Ingredient
from django.db.models import Q


@api_view(['GET'])
def search_ingredients(request):
    query = request.data['query']
    filters = request.data['filters'].split(',')

    if filters == ['']:
        results = Ingredient.objects.filter(
            Q(name__icontains=query) |
            Q(name_scientific__icontains=query)
        )

    else:
        results = Ingredient.objects.filter(
            Q(name__icontains=query) |
            Q(name_scientific__icontains=query),
            food_group__in=filters
        )

    results_count = results.count()
    serializer = IngredientSerializer(results, many=True)

    return JsonResponse({'success': True,
                         'data': {
                             'count': results_count,
                             'results': serializer.data
                         }})
