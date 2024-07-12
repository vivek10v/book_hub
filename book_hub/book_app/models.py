from django.db import models

class User(models.Model):
    USER_TYPES = (
        ('librarian', 'Librarian'),
        ('patron', 'Patron'),
    )
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPES)

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    isbn = models.CharField(max_length=13, unique=True)

