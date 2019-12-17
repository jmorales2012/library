const bookContainer = document.querySelector('.book-container');
const inputContainer = document.querySelector('.input-container');
const inputs = document.querySelectorAll('input');
const addButton = document.querySelector('.add-book');

addButton.addEventListener('click', createBook);
bookContainer.addEventListener('click', deleteBook);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.id = 0;

const books = [];

function displayBooks() {
  bookContainer.innerHTML = '';
  books.forEach(book => {
    let newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.setAttribute('data-id', String(book.id));

    let title = document.createElement('p');
    let author = document.createElement('p')
    let pages = document.createElement('p');
    let read = document.createElement('p');
    
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-book');
    deleteBtn.classList.add('fa');
    deleteBtn.classList.add('fa-times');
    deleteBtn.setAttribute('data-id', book.id);

    title.innerText = book.title;
    author.innerText = book.author;
    pages.innerText = book.pages;
    read.innerText = book.read;
    deleteBtn.innerText = '';

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(read);
    newBook.appendChild(deleteBtn);

    bookContainer.appendChild(newBook);
  })
}

function resetForm() {
  document.querySelector('form').reset();
}

function validateInput() {
  let validated;
  inputs.forEach(input => {
    validated = input.value !== '' ? true : false;
  });
  return validated;
}

function createBook() {
  if (validateInput()) {
    let book = new Book();
    inputs.forEach(input => {
      book[input.id] = input.value;
    })
    book.id = Book.prototype.id;
    Book.prototype.id++;
    
    books.push(book);
    displayBooks();
    resetForm();
  }
}

function deleteBook(e) {
  if (e.target.classList.contains('delete-book')) {
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    books.forEach((book, i) => {
      if (book.id === Number(e.target.getAttribute('data-id'))) {
        books.splice(i, 1);
      }
    })
  }
}