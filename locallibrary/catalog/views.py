from django.shortcuts import render
from django.views import generic
from .models import Book, Author, BookInstance, Genre
# Create your views here.


def index(request):
    """View function for home page site"""

    # Total number of Books and Copies
    num_books = Book.objects.count()
    num_instances = BookInstance.objects.count()
    # Available Book copies
    num_available = BookInstance.objects.filter(
        status__exact=BookInstance.AVAILABLE).count()

    # Number of authors
    num_authors = Author.objects.count()

    context = {
        'json_data': {
            'Number of Books': num_books,
            'Number of Copies': num_instances,
            'Copies Available': num_available,
            'Number of Authors': num_authors
        }
    }

    return render(request, 'index.html', context=context)


class BookListView(generic.ListView):
    model = Book

    def get_queryset(self):
        return self.model.objects.select_related('author').all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["books_objects"] = [
            {
                'url': book.get_absolute_url(),
                'title': book.title,
                'author': str(book.author),
                'copies_available': book.copies.filter(status__exact='a').count()
            } for book in context['object_list']
        ]
        return context


class BookDetail(generic.DetailView):
    model = Book
    hidden_fields = [
        'id',
    ]

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["book_json"] = {
            field.name: str(getattr(context['book'], field.name))
            for field in context['book']._meta.fields
            if field.name not in self.hidden_fields
        }
        context['book_json']['genres'] = context['book'].display_genre
        context['book_json']['author_id'] = context['book'].author.id
        context['book_json']['copies'] = [{
            'status': copy.status,
            'display_status': copy.get_status_display(),
            'due_back': copy.due_back,
            'imprint': copy.imprint,
            'id': copy.id
        } for copy in context['book'].copies.all()]
        return context
