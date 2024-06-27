from django.core.serializers.json import DjangoJSONEncoder
from rest_framework import serializers

from books.models import Book
from user.models import Reader


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"