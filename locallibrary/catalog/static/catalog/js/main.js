/**
 * Defin ALL catalog Vue app(s) and components
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


var AuthorListItem = {
    delimiters: ["[[", "]]"],
    props: {
       'author': {required: true, type: Object}
    },
    
    template: `
        <li class="collection-item"><strong><a :href="author.url">[[author.last_name]], [[author.first_name]]</a></strong> ([[author.date_of_birth]] - [[author.date_of_death]])</li>
    `
 }

 var app2 = new Vue({
     el: '#auth-list',
     components: {
         'author-list-item': AuthorListItem
     },
     data: {
         authors: []
     },
     methods: {
         parseAuthors: function() {
             this.authors = JSON.parse(document.getElementById('vue-data').textContent);
         }
     },
     created() {
         this.parseAuthors();
     }
 })

var AuthorDetail = Vue.component({
    name: 'author-detail',
    delimiters: ["[[", ']]'],
    props: {
        'author': {required: true, type: Object}
     },
     template: `
     <div class="card">
        <div class="card-image">
            <div class="gradient-card-image"></div>
            <span.card-title>[[author.first_name]] [[author.last_name]]
        </div>

    </div>
     `
})
var app3 = new Vue({
    el: "#author-detail",
    components: {
        'book-list-item': BookListItem,
        'author-detail': AuthorDetail
    },
    data: {
        author: {}
    },
    methods: {
        parseAuthor: function() {
            this.author = JSON.parse(document.getElementById('vue-data').textContent)
        }
    },
    created() {
        this.parseAuthor();
    }
})