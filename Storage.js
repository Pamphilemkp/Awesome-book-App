// storing books in localStorage
export default class Storage {
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

    bookStore.forEach((book, index) => {
      if (book.title === titleVal) {
        bookStore.splice(index, 1);
      }
    });

    // localStorage.clear()
    localStorage.setItem('bookStore', JSON.stringify(bookStore));
  }
}
