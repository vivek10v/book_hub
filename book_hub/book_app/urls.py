from django.urls import path
from .views import *

urlpatterns = [
    # path('users/', UserListCreateView.as_view(), name='user-list-create'),
    # path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
    # path('books/', BookListCreateView.as_view(), name='book-list-create'),
    # path('books/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book-detail'),
    path('users/', UserView.as_view()),
    path('user/<int:pk>/', UserView.as_view()),
    path('books/', BookView.as_view()),
    path('book/<int:pk>/', BookView.as_view()),
]
