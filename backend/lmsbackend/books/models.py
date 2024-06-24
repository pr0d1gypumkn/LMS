from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    publication_date = models.DateField()
    isbn = models.CharField(max_length=20)
    checked_out = models.BooleanField(default=False)
    reader = models.ForeignKey('user.Reader', on_delete=models.PROTECT, null=True, blank=True)