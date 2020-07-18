/**
 * Define Vue components and App for Authors pages
 */

 import BookListItem from './books.js';

 var AuthorListItem = {
    delimiters: ["[[", "]]"],
    props: {
       'author': {required: true, type: Object}
    },
    
    template: `
        <li class="collection-item"><strong><a :href="author.url">[[author.last_name]], [[author.first_name]]</a></strong> ([[author.date_of_birth]] - [[author.date_of_death]])</li>
    `
 }

 var AuthorDetail = Vue.component({
     delimiters: ["[[", "]]"],

 })

 var app = new Vue({
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

var app2 = new Vue({
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
    },
    template
})