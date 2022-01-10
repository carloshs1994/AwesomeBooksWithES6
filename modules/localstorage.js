import {updateDomAndLocalStorage, removeBook, books} from '../modules/index.js';

export function addToLocalStorage(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

export function getFromLocalStorage() {
  if (localStorage.length !== 0) {
    const booksFromLocStg = JSON.parse(localStorage.getItem('books'));
    booksFromLocStg.bookList.forEach((book) => {
      books.bookList.push(book);
    });
    updateDomAndLocalStorage();
    removeBook();
  }
}

