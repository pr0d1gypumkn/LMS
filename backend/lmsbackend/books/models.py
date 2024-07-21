from django.db import models
from .enums import Genre

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    publication_date = models.DateField()
    isbn = models.CharField(max_length=20)
    issn = models.CharField(max_length=20)
    genre = models.CharField(max_length=50, choices=[(genre.name, genre.value) for genre in Genre])
    
class Checkout(models.Model):
    book = models.ForeignKey(Book, on_delete=models.PROTECT)
    reader = models.ForeignKey('user.Reader', on_delete=models.PROTECT)
    checkout_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(null=True, blank=True)
    returned = models.BooleanField(default=False)
    returned_date = models.DateField(null=True, blank=True)