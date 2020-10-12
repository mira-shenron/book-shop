'use strict';
var gCurrBookId;

function onInit() {
    renderBooks();
    doTrans();
}

function renderBooks() {
    var currLang = getCurrLang();
    var books = getBooks();

    var strHTML = '';
    for (var i = 0; i < books.length; i++) {
        var price = formatCurrency(books[i].price, currLang);
        strHTML += `<tr>
        <td>${i + 1}</td>
        <td>${books[i].name}</td>
        <td>${price}</td>
        <td><button class="btn read" data-trans="btnRead" onclick="onReadBook('${books[i].id}')">Read</button></td>
        <td><button class="btn update" data-trans="btnUpdate" onclick="onUpdateBook('${books[i].id}')">Update</button></td>
        <td><button class="btn delete" data-trans="btnDelete" onclick="onRemoveBook('${books[i].id}')">Delete</button></td>
        </tr>`
    }
    document.querySelector('.books').innerHTML = strHTML;
}


function onReadBook(bookId) {
    var book = getBook(bookId);
    doTrans();
    renderBookDetails(book);
    
}

function renderBookDetails(book){
    gCurrBookId = book.id;

    var elBookName = document.querySelector('.book-name');
    elBookName.innerText = book.name;

    var elBookPrice = document.querySelector('.book-price');
    elBookPrice.innerText = formatCurrency(book.price, gCurrLang);

    var elBookImg = document.querySelector('.book-img-container');
    console.log(elBookImg);
    var strHTML = `<img src="${book.imgUrl}"></img>`;
    elBookImg.innerHTML = strHTML;

    var elRating = document.querySelector('.current-rating');
    var elRate = document.querySelector('.rateCount');

    elRating.innerText = book.rating;
    elRate.innerText = book.rating;

    var elModal = document.querySelector('.book-details');
    elModal.style.display = 'block';
}

function onUpdateBook(bookId) {
    changeModalDisplay('.update-book-modal','block'); 
    gCurrBookId = bookId;
}

function onUpdate(){
    var elPrice = document.querySelector('.update-book-price');
    if(!elPrice.value){
        return;
    }
    updateBook(gCurrBookId, elPrice.value);
    renderBooks();
    elPrice.value = '';
    changeModalDisplay('.update-book-modal','none'); 
}


function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() { 
    changeModalDisplay('.create-book-modal','block'); 
}

function onAdd(){
    var elBookName = document.querySelector('.new-book-name');
    var elPrice = document.querySelector('.new-book-price');

    var bookName = elBookName.value;
    var price = elPrice.value;

    console.log(bookName, price);
    if(!bookName || !price){
        return;
    }
    addBook(bookName, price);
    renderBooks();

    elBookName.value = '';
    elPrice.value = '';
    changeModalDisplay('.create-book-modal','none'); 
}

function closeBookDetails(){
    gCurrBookId = null;

    var elModal = document.querySelector('.book-details');
    elModal.style.display = 'none';

    var elBookName = document.querySelector('.book-name');
    elBookName.innerText = '';

    var elBookPrice = document.querySelector('.book-price');
    elBookPrice.innerText = '';

    var elBookImg = document.querySelector('.book-img-container');
    elBookImg.innerHTML = '';
}

function onPlus(){
    onChangeRate(1);
}

function onMinus(){
    onChangeRate(-1);
}

function onChangeRate(diff){
    var elRateCount = document.querySelector('.rateCount');
    var count = parseInt(elRateCount.innerText);
    if(count <= 0 && diff < 0 || count >= 10 && diff > 0){
        return;
    }
    elRateCount.innerText = count + diff;
}

function onRate(){
    var elRateCount = document.querySelector('.rateCount');
    var elRating = document.querySelector('.current-rating');
    var count = parseInt(elRateCount.innerText);
    updateRating(gCurrBookId, count);
    
    elRateCount.innerText = count;
    elRating.innerText = count;
}

function closeAddBookModal(){
    changeModalDisplay('.create-book-modal', 'none'); 
}

function closeUpdateBookModal(){
    changeModalDisplay('.update-book-modal', 'none'); 
}

function changeModalDisplay(modalClass, mode){
    var elModal = document.querySelector(modalClass);
    elModal.style.display = mode;
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    
    renderBooks();
    doTrans();
}

function onTitleClick(){
    handleSort('NAME');
}

function onPriceClick(){
    handleSort('PRICE');
}

function handleSort(sortBy){
    setGSortBy(sortBy);
    renderBooks();
    doTrans();
}
    
    