from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('books/', views.BookListView.as_view(), name='books'),
    path('books/<int:pk>/', views.BookDetail.as_view(), name="book-detail"),
    path('authors/', views.AuthorList.as_view(), name='authors'),
    path('authors/<int:pk>/', views.AuthorDetail.as_view(), name='author-detail'),
]
