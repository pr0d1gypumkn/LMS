from django.urls import path
from books.views import *


app_name = "books"

urlpatterns = [
    path('', SearchBooks.as_view()),
    path('search/', SearchBooks.as_view()),
    path('filter/', FilterBooks.as_view()),
    path('genres/', GenreView.as_view())
]
