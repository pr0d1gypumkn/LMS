from django.views import View
from django.http import JsonResponse
from django.db.models import Q, Count, F
from django.utils import timezone

from books.models import *
from user.models import Reader
from JSON_encoder import BookSerializer

import datetime
from itertools import chain
import requests


GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q={}+isbn&maxResults=1"


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
    return datetime.today() + datetime.timedelta(days=14) if start_date is None else start_date + datetime.timedelta(days=14)


class FilterBooks(View):

    def get(self, request):

        books = []

        # available filter
        if request.GET["available"] == "true":
            books_with_checkout_counts = Book.objects.annotate(count=Count('checkout', filter=Q(checkout__returned=False)))
            books = books_with_checkout_counts.filter(count__lt=F('copies'))
        else:
            books = Book.objects.all()

        # date published filter
        date_input = request.GET["date"]
        range_type = request.GET["range"]
        date = ""
        if date_input and "-" in date_input:
            dates = date_input.split("-")
            date_from = datetime.date(int(dates[0]), 1, 1) if dates[0] else ""
            date_to = datetime.date(int(dates[1]), 1, 1) if dates[1] else ""
        elif date_input:
            date = datetime.date(int(date_input), 1, 1)

        if range_type == "Before" and date:
            books = books.filter(publication_date__lt=date)
        elif range_type == "After" and date:
            books = books.filter(publication_date__gt=date)
        elif range_type == "Range" and date_from and date_to:
            books = books.filter(publication_date__gte=date_from, publication_date__lte=date_to)

        # genre filter
        genre = request.GET["genre"]
        if genre != "All":
            books = books.filter(genre=genre)

        # sorting
        sort_by = request.GET["sortBy"]
        if sort_by == "Popular":
            # most popular in the last 30 days
            thirty_days_ago = timezone.now().date() - datetime.timedelta(days=30)
            checked_out_30_days = Checkout.objects.filter(checkout_date__gte=thirty_days_ago)

            # get checkouts, group by book, get counts, sort in descending order
            check_out_counts = checked_out_30_days.values('book_id').annotate(count=Count('id'))
            sorted_book_ids = list(check_out_counts.order_by('-count').values_list('book_id', flat=True))

            # show more popular books first
            checked_out_books = books.filter(id__in=sorted_book_ids)
            sorted_checked_out_books = sorted(checked_out_books, key=lambda book: sorted_book_ids.index(book.id))
            books = list(chain(sorted_checked_out_books, books.exclude(id__in=sorted_book_ids)))
        elif sort_by == "Title":
            books = books.order_by("title")
        elif sort_by == "Author":
            books = books.order_by("author")
        elif sort_by == "Publication Date":
            books = books.order_by("publication_date")

        filtered_books_dict = [BookSerializer(book).data for book in books]
        return JsonResponse({"books": filtered_books_dict})

    def get_num_checked_out(book):
        return Checkout.objects.filter(book=book, returned_date__lte=datetime.date.today())


class GenreView(View):

    def get(self, request):
        return JsonResponse({"genres": [genre.value for genre in Genre]})

class BookInfo(View):

    def get(self, request, book_id):
        book = Book.objects.get(id=book_id)
        book_details = BookSerializer(book).data

        response = requests.get(GOOGLE_BOOKS_API.format(book.isbn)).json()

        if "items" in response:
            items = response["items"]

            if items:
                volume_info = items[0]["volumeInfo"]
                book_details["description"] = volume_info["description"]
                book_details["page_count"] = volume_info["pageCount"]
                book_details["cover"] = volume_info["imageLinks"]["thumbnail"].replace("zoom=1", "zoom=2").replace("http:", "https:")
                if "subtitle" in volume_info:
                    book_details["subtitle"] = volume_info["subtitle"]
        else:
            book_details["description"] = "No description found"
            book_details["page_count"] = ""
            book_details["cover"] = ""

        return JsonResponse({"book": book_details})
