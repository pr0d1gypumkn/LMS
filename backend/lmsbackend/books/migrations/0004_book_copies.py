# Generated by Django 5.0.6 on 2024-08-19 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0003_book_genre_book_issn'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='copies',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
