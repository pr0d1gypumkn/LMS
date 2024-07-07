from django.views import View
from django.http import JsonResponse
from django.db.models import Q

from books.models import Book
from JSON_encoder import BookSerializer


class AllBooks(View):

    def get(self, request):
        all_books = [BookSerializer(book).data for book in Book.objects.all()]
        return JsonResponse({"books": all_books})
    

class SearchBooks(View):

    def get(self, request):

        keywords = request.GET.get('keywords', '').split()

        if keywords:
            queryset_list= Q()

            for keyword in keywords:
                queryset_list |= (
                    Q(title__icontains=keyword) |
                    Q(author__icontains=keyword) |
                    Q(isbn__icontains=keyword)
                )
            
            results = Book.objects.filter(queryset_list).distinct()
            results_serialized = [BookSerializer(book).data for book in results]
        else:
            results_serialized = [BookSerializer(book).data for book in Book.objects.all()]
        
        return JsonResponse({"books": results_serialized})
