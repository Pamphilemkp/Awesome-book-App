import Storage from './Storage.js';

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

export default UI;