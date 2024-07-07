from django.views import View
from django.http import JsonResponse
from django.db.models import Q

from books.models import *
from user.models import Reader
from JSON_encoder import BookSerializer
import datetime, timedelta


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

class CheckoutAPIView(View):
    def post(self, request, *args, **kwargs):
        try:
            book_id = request.data.get('book_id')
            reader_id = request.data.get('reader_id')
            try:
                book = Book.objects.get(id=book_id)
            except Book.DoesNotExist:
                return JsonResponse({'message': 'Book not found!'}, status=404)
            try:
                reader = Reader.objects.get(id=reader_id)
            except Reader.DoesNotExist:
                return JsonResponse({'message': 'Reader does not exist!'}, status=400)
            return_date = get_deadline()
            checkout = Checkout(book=book, reader=reader, return_date=return_date)
            checkout.save()

            return JsonResponse({'message': 'Book checked out successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'message': 'An error occurred!'}, status=500)

def get_deadline(start_date=None):
    return datetime.today() + timedelta(days=14) if start_date is None else start_date + timedelta(days=14)
