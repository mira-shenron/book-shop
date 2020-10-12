'use strict';

const STORAGE_KEY = 'booksDB';

var gBooks = _createBooks();

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books) {
        books = [];
        books.push(_createBook('Learn CSS', '18.90', '../img/cssBookImg.jpg'));
        books.push(_createBook('Learn Javascript', '10.0', '../img/jsBookImg.png'));
        books.push(_createBook('Learn HTML', '99.99', '../img/htmlBookImg.jpg'));
        _saveBooks(books);
    }
    return books;
}

function _createBook(name, price, imgUrl='../img/FalmerBook.png', rating=0) {
    return {
        id: makeId(),
        name,
        price,
        imgUrl,
        rating
    };
}

function _saveBooks(books){
    saveToStorage(STORAGE_KEY, books);
}

function getBooks(){
    return gBooks;
}

function removeBook(bookId){
    var idx = getBookIdx(bookId);
    gBooks.splice(idx,1);
    _saveBooks(gBooks);
}

function addBook(name,price){
    var newBook = _createBook(name,price);
    gBooks.push(newBook);
    _saveBooks(gBooks);
}

function updateBook(bookId,price){
    var idx = getBookIdx(bookId);
    gBooks[idx].price = price;
    _saveBooks(gBooks);
}

function getBook(bookId){
    return gBooks.find(book => book.id === bookId);
}

function updateRating(bookId, rating){
    var idx = getBookIdx(bookId);
    gBooks[idx].rating = rating;
    _saveBooks(gBooks);
}

function getBookIdx(bookId){    
    var idx = gBooks.findIndex(book => book.id === bookId);
    return idx;
}