"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeBook = exports.updateDomAndLocalStorage = exports.books = exports.list = void 0;

var _localstorage = require("./localstorage.js");

var _addbooks = require("./addbooks.js");

var _singleBook = require("./singleBook.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var list = document.querySelector('ul');
exports.list = list;
var form = document.querySelector('form');
var title = document.querySelector('#title');
var author = document.querySelector('#author');
var modalContainer = document.querySelector('.modal-container');
var nav = document.querySelector('nav');
var listTab = document.querySelector('.list-tab');
var formTab = document.querySelector('.form-tab');
var contactTab = document.querySelector('.contact-tab');
var listSection = document.getElementById('list-section');
var formSection = document.getElementById('form-section');
var contactSection = document.getElementById('contact-section');
var DateTime = luxon.DateTime;
document.querySelector('.time-and-date').innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);

var Books =
/*#__PURE__*/
function () {
  function Books() {
    _classCallCheck(this, Books);

    this.bookList = [];
  }

  _createClass(Books, [{
    key: "addNewBook",
    value: function addNewBook(newBook) {
      return this.bookList.push(newBook);
    }
  }, {
    key: "removeBooksFromList",
    value: function removeBooksFromList(element) {
      for (var i = 0; i < this.bookList.length; i += 1) {
        if (element === this.bookList[i].title) {
          this.bookList.splice(i, 1);
        }
      }

      return this.bookList;
    }
  }]);

  return Books;
}();

var books = new Books();
exports.books = books;

function checkIfEmpty() {
  if (books.bookList.length !== 0) {
    list.style.display = 'block';
  } else {
    list.style.display = 'none';
  }
}

var updateDomAndLocalStorage = function updateDomAndLocalStorage() {
  (0, _addbooks.appendBooksToList)();
  localStorage.clear();
  (0, _localstorage.addToLocalStorage)(books);
  checkIfEmpty();
};

exports.updateDomAndLocalStorage = updateDomAndLocalStorage;

var removeBook = function removeBook() {
  var removeButtons = document.getElementsByClassName('remove');

  for (var i = 0; i < removeButtons.length; i += 1) {
    var button = removeButtons[i];
    button.addEventListener('click', function (event) {
      var element = event.target.parentElement.firstElementChild.firstElementChild.innerText;
      books.removeBooksFromList(element);
      updateDomAndLocalStorage();
      removeBook();
    });
  }
};
/* eslint max-classes-per-file: ["error", 2] */
// class Book {
//   constructor(title, author) {
//     this.title = title;
//     this.author = author;
//   }
// }


exports.removeBook = removeBook;
(0, _localstorage.getFromLocalStorage)(); // another js  file.

form.addEventListener('submit', function (event) {
  event.preventDefault();
  var newBook = new _singleBook.Book(title.value, author.value);
  title.value = '';
  author.value = '';
  books.addNewBook(newBook);
  updateDomAndLocalStorage();
  modalContainer.style.display = 'flex';
  setTimeout(function () {
    modalContainer.style.display = 'none';
  }, 2000);
  removeBook();
});
nav.addEventListener('click', function (event) {
  if (event.target.innerText === 'List') {
    listSection.style.display = 'block';
    formSection.style.display = 'none';
    contactSection.style.display = 'none';
    listTab.classList.add('red');
    formTab.classList.remove('red');
    contactTab.classList.remove('red');
  } else if (event.target.innerText === 'Add new') {
    listSection.style.display = 'none';
    formSection.style.display = 'block';
    contactSection.style.display = 'none';
    listTab.classList.remove('red');
    formTab.classList.add('red');
    contactTab.classList.remove('red');
  } else if (event.target.innerText === 'Contact') {
    listSection.style.display = 'none';
    formSection.style.display = 'none';
    contactSection.style.display = 'block';
    listTab.classList.remove('red');
    formTab.classList.remove('red');
    contactTab.classList.add('red');
  }
});