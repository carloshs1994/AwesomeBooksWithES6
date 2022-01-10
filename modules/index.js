const list = document.querySelector('ul');
const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const modalContainer = document.querySelector('.modal-container');
const nav = document.querySelector('nav');
const listTab = document.querySelector('.list-tab');
const formTab = document.querySelector('.form-tab');
const contactTab = document.querySelector('.contact-tab');
const listSection = document.getElementById('list-section');
const formSection = document.getElementById('form-section');
const contactSection = document.getElementById('contact-section');
class Books {
  constructor() {
    this.bookList = [];
  }

  addNewBook(newBook) {
    return this.bookList.push(newBook);
  }

  removeBooksFromList(element) {
    for (let i = 0; i < this.bookList.length; i += 1) {
      if (element === this.bookList[i].title) {
        this.bookList.splice(i, 1);
      }
    }
    return this.bookList;
  }
}

const books = new Books();

function checkIfEmpty() {
  if (books.bookList.length !== 0) {
    list.style.display = 'block';
  } else {
    list.style.display = 'none';
  }
}

function addToLocalStorage(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

function appendBooksToList() {
  list.innerHTML = '';
  books.bookList.forEach((book, index) => {
    const li = document.createElement('li');

    if (index % 2 === 1) {
      li.classList = 'bg-white';
    }

    li.innerHTML = `
    <p>"<span>${book.title}</span>" </p>
    <p>by ${book.author}</p>
    <button class="remove">Remove</button>
    `;
    list.appendChild(li);
  });
}

function updateDomAndLocalStorage() {
  appendBooksToList();
  localStorage.clear();
  addToLocalStorage(books);
  checkIfEmpty();
}

function removeBook() {
  const removeButtons = document.getElementsByClassName('remove');
  for (let i = 0; i < removeButtons.length; i += 1) {
    const button = removeButtons[i];
    button.addEventListener('click', (event) => {
      const element = event.target.parentElement.firstElementChild.firstElementChild.innerText;
      books.removeBooksFromList(element);
      updateDomAndLocalStorage();
      removeBook();
    });
  }
}

/* eslint max-classes-per-file: ["error", 2] */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function getFromLocalStorage() {
  if (localStorage.length !== 0) {
    const booksFromLocStg = JSON.parse(localStorage.getItem('books'));
    booksFromLocStg.bookList.forEach((book) => {
      books.bookList.push(book);
    });
    updateDomAndLocalStorage();
    removeBook();
  }
}

getFromLocalStorage();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newBook = new Book(title.value, author.value);
  title.value = '';
  author.value = '';
  books.addNewBook(newBook);
  updateDomAndLocalStorage();
  modalContainer.style.display = 'flex';
  setTimeout(() => {
    modalContainer.style.display = 'none';
  }, 2000);
  removeBook();
});

nav.addEventListener('click', (event) => {
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

setInterval(() => {
  const today = new Date();
  let month = '';
  let day = '';
  let hour = today.getHours();
  let hourType = 'am';

  if (hour > 12) {
    hour -= 12;
    hourType = 'pm';
  } else if (hour === 12) {
    hourType = 'pm';
  }

  switch (today.getDate()) {
    case 1:
      day = 'st';
      break;
    case 2:
      day = 'nd';
      break;
    case 3:
      day = 'rd';
      break;
    default:
      day = 'th';
  }

  switch (today.getMonth()) {
    case 0:
      month = 'January';
      break;
    case 1:
      month = 'February';
      break;
    case 2:
      month = 'March';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
      break;
    case 7:
      month = 'August';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'October';
      break;
    case 10:
      month = 'November';
      break;
    case 11:
      month = 'December';
      break;
    default:
      month = 'Do not know';
  }

  const date = `${month} ${today.getDate()}${day} ${today.getFullYear()},`;
  const time = `${hour}:${today.getMinutes()}:${today.getSeconds()} ${hourType}`;
  const dateTime = `${date} ${time}`;
  document.querySelector('.time-and-date').innerHTML = dateTime;
}, 1000);