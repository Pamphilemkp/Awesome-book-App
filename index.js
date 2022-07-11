class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class UI {
  static testDisplayBooks() {
    const books = Storage.getBook();

    books.forEach((book) => {
      UI.bookDisplayList(book);
    });
  }

  static bookDisplayList(book) {
    const row = document.createElement('tr');
    row.innerHTML = `
                        <td>${book.author}</td>
                        <td>${book.title}</td>
                        <td><a href="#" class="remove">remove</a></td> `;
    const tableList = document.querySelector('.book-List');
    tableList.appendChild(row);
  }

  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}

// storing books in localStorage
class Storage {
  static getBook() {
    let bookStore;
    if (localStorage.getItem('bookStore') === null) {
      bookStore = [];
    } else {
      bookStore = JSON.parse(localStorage.getItem('bookStore'));
    }

    return bookStore;
  }

  static addToLocalStorage(book) {
    const bookStore = Storage.getBook();
    bookStore.push(book);
    localStorage.setItem('bookStore', JSON.stringify(bookStore));
  }

  static removeBooks(titleVal) {
    const bookStore = Storage.getBook();
    // console.log(book.title);
    // console.log(tileVal);

    bookStore.forEach((book, index) => {
      if (book.title == titleVal) {
        bookStore.splice(index, 1);
      }
    });

    // localStorage.clear()
    localStorage.setItem('bookStore', JSON.stringify(bookStore));
  }
}

// display the book test testDisplay()

document.addEventListener('DOMContentLoaded', UI.testDisplayBooks());

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
      console.log(e.target);
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
