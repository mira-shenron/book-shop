var gCurrLang = 'en';

var gTrans = {
    welcomeMsg: {
        en: 'Welcome to my book shop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    newBookBtn: {
        en: 'Create New book',
        he: 'צור ספר חדש'
    },
    thId: {
        en: 'Id',
        he: 'מק"ט'
    },
    thTitle: {
        en: 'Title',
        he: 'שם'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    thActions: {
        en: 'Actions',
        he: 'פעולות',
    },
    rate: {
        en: 'Rate',
        he: 'דרג',
    },
    btnUpdate: {
        en: 'Update',
        he: 'עדכן'
    },
    btnRead: {
        en: 'Read',
        he: 'קרא'
    },
    btnDelete: {
        en: 'Delete',
        he: 'מחק'
    },
    ratingCount: {
        en: 'Rating',
        he: 'דירוג'
    },
    addBtn: {
        en: 'Add',
        he: 'הוסף'
    },
    newPrice: {
        en: 'Enter new price',
        he: 'הכנס מחיר חדש'
    },
    enterBookDetails: {
        en: 'Enter new book details:',
        he: 'הכנס פרטי הספר החדש'
    },
    bookName: {
        en: 'Enter book name',
        he: 'הכנס את שם הספר'
    },
    bookPrice: {
        en: 'Enter price',
        he: 'הכנס מחיר'
    }
}

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN';

    var trans = transMap[gCurrLang]
    if (!trans) trans = transMap['en'];
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(function (el) {
        const transKey = el.dataset.trans;
        if (el.placeholder) el.placeholder = getTrans(transKey)
        else el.innerText = getTrans(transKey)
    });
}

function setLang(lang) {
    gCurrLang = lang;
}

function getCurrLang(){
    return gCurrLang;
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatHebrewCurrency(num) {
    return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
}

function formatCurrency(num,lang){
    if(lang === 'he'){
        return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
    }else{
        return new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(num);
    }
}