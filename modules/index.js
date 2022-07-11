import UI from './UserBooks.js';
import Storage from './Storage.js';
// import { Navigation } from './Navigation.js';

// book constructor
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// HANDLING THE FORM BY OREVENTING THE DEFAULT AND ADD AND DISPLAY BOOKS
const form = document.getElementById('Form');
form.addEventListener('submit', (e) => {
  // preventing the default
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  let id = 0;
  const error = document.querySelector('.error-message');

  // check if the input are empty and display the errors messsages
  if (title.trim() === '' && author.trim() === '') {
    error.textContent = 'please fill out the book title and the author name';
    error.classList.add('error');
  } else if (title.trim() === '') {
    error.textContent = 'please fill out the book title';
    error.classList.add('error');
  } else if (author.trim() === '') {
    error.textContent = 'please fill out the author name';
    error.classList.add('error');
    error.classList.remove('succes');
  } else {
    // display the book received from the form
    const book = new Book(title, author, id);
    id += 1;
    UI.bookDisplayList(book);

    // add to LocalStorage
    Storage.addToLocalStorage(book);

    /// show the success messsage
    error.textContent = 'Book added';
    error.classList.add('succes');
    error.classList.remove('error');

    // clear the fields
    UI.clearFields();

    // remove book from the list
    document.querySelector('.book-List').addEventListener('click', (e) => {
      const val = e.target;
      if (val.classList.contains('remove')) {
        val.parentElement.parentElement.remove();
      }
      // remove book from storage
      const titleVal = val.parentElement.previousElementSibling.innerText;
      Storage.removeBooks(titleVal);
    });
  }

  setTimeout(() => {
    error.textContent = '';
  }, 3000);
});

// display the book test testDisplay()

document.addEventListener('DOMContentLoaded', UI.testDisplayBooks());

// add naviagtion

const list1 = document.querySelector('.list1');
const list2 = document.querySelector('.list2');
const list3 = document.querySelector('.list3');

// tagging elements
const addBook = document.getElementById('form');
const List = document.getElementById('list');
const contact = document.getElementById('contact');

list1.addEventListener('click', () => {
  // show focus color
  list3.style.color = '#000';
  list2.style.color = '#000';
  list1.style.color = 'rgba(43, 64, 250,1)';

  // navigation
  List.classList.remove('hide-nav');
  addBook.classList.add('hide-nav');
  contact.classList.add('hide-nav');
});

list2.addEventListener('click', () => {
  list3.style.color = '#000';
  list2.style.color = 'rgba(43, 64, 250,1)';
  list1.style.color = '#000';

  addBook.classList.remove('hide-nav');
  contact.classList.add('hide-nav');
  List.classList.add('hide-nav');
});

list3.addEventListener('click', () => {
  list3.style.color = 'rgba(43, 64, 250,1)';
  list2.style.color = '#000';
  list1.style.color = '#000';

  contact.classList.remove('hide-nav');
  List.classList.add('hide-nav');
  addBook.classList.add('hide-nav');
});