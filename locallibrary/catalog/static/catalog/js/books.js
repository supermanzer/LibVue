/**
 * Create a Vue Router instance specific to the Books list and Detail pages
 */

const bookList = Vue.component('book-list', {
    template: `
    
    `
})

const BookListItem = Vue.component('book-list-item', {
    delimiters: ['[[', ']]'],
    props: {
        'book': {required: true, type: Object},
    },
    template: `
    <li class="collection-item avatar">
        <div>
            <i class="material-icons circle">book</i>
            <span class="title">[[book.title]]</span> 
            <p>by [[book.author]]</p> 
            <p>[[book.copies_available]] copies available</p>
            <a :href="book.url" class="secondary-content tooltipped" data-tooltip="View book details">
                <i class="material-icons">launch</i>
            </a>
        </div>
    </li>
    `
})

var app = new Vue({
    delimiters: ['[[', ']]'],
    el: '#app',
    props: {
        'book-list-item': BookListItem
    },
    data: {
        books: []
    },
    methods: {
        parseBooks: function() {
            this.books = JSON.parse(document.getElementById('vue-data').textContent);
        },
        uiInit: function() {
            document.addEventListener('DOMContentLoaded', function() {
                M.Tooltip.init(document.querySelectorAll('.tooltipped'));
            });
        }
    },
    mounted() {
        this.parseBooks();
        this.uiInit();
    }
})

const router = new VueRouter({
    // TODO Figure out how to build a basic router for each List - Detail combination
})
