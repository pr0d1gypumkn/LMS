from django.views import View
from django.http import JsonResponse

from books.models import Book
from JSON_encoder import BookSerializer


class AllBooks(View):

    def get(self, request):
        all_books = [BookSerializer(book).data for book in Book.objects.all()]
        return JsonResponse({"books": all_books})
    

class FilterBooks(View):

    def get(self, request):

        filters = {}

        # dynamically creating the filters
        for field, value in request.GET.items():
            if field == 'date':
                pass        # TODO: how will date filtering work?
            elif field in ['title', 'author', 'isbn'] and value != "":
                filters[field + "__contains"] = value

        filtered_books = Book.objects.filter(**filters)

        filtered_books_dict = [BookSerializer(book).data for book in filtered_books]
        return JsonResponse({"books": filtered_books_dict})
