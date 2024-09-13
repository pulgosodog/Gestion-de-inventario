const form = document.querySelector('form');
const bookSection = document.querySelector('#book-list');

let jsonBooks = [];
let bookLibrary = [];

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    bookLibrary.push(this);
    jsonBooks = JSON.stringify(bookLibrary);
    localStorage.setItem('booksStorage', jsonBooks);
  }

  removeBook() {
    bookLibrary = bookLibrary.filter((books) => books.title !== `${this.title}` && books.author !== `${this.author}`);
    jsonBooks = JSON.stringify(bookLibrary);
    localStorage.setItem('booksStorage', jsonBooks);
  }

  insertBookHtml() {
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const tittelName = document.createElement('li');
    const authorName = document.createElement('li');
    const button = document.createElement('button');

    tittelName.textContent = `"${this.title}"`;
    authorName.textContent = this.author;
    button.textContent = 'Remove';

    button.addEventListener('click', () => {
      div.remove();
      this.removeBook();
    });

    ul.appendChild(tittelName);
    ul.appendChild(authorName);
    div.appendChild(ul);
    div.appendChild(button);
    div.classList.add('book');
    bookSection.appendChild(div);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#tittle-name').value;
  const author = `by ${document.querySelector('#author-name').value}`;
  const book = new Books(title, author);
  book.addBook();
  book.insertBookHtml();

  document.querySelector('#tittle-name').value = '';
  document.querySelector('#author-name').value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  if (jsonBooks) {
    jsonBooks = JSON.parse(localStorage.getItem('booksStorage'));
    bookLibrary = jsonBooks.map((book) => new Books(book.title, book.author));
    bookLibrary.forEach((n) => {
      n.insertBookHtml();
    });
  }
});
