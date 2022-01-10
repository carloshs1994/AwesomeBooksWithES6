"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendBooksToList = appendBooksToList;

var _index = require("../modules/index.js");

function appendBooksToList() {
  _index.list.innerHTML = '';

  _index.books.bookList.forEach(function (book, index) {
    var li = document.createElement('li');

    if (index % 2 === 1) {
      li.classList = 'bg-white';
    }

    li.innerHTML = "\n    <p>\"<span>".concat(book.title, "</span>\" </p>\n    <p>by ").concat(book.author, "</p>\n    <button class=\"remove\">Remove</button>\n    ");

    _index.list.appendChild(li);
  });
}