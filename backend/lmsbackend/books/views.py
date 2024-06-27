from django.views import View
from django.http import JsonResponse

from books.models import Book
from JSON_encoder import BookSerializer


class AllBooks(View):

    def get(self, request):
        all_books = [BookSerializer(book).data for book in Book.objects.all()]
        return JsonResponse({"books": all_books})
