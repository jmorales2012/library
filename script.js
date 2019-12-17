const bookContainer = document.querySelector('.book-container');
const inputContainer = document.querySelector('.input-container');
const inputs = document.querySelectorAll('input');
const addButton = document.querySelector('.add-book');

addButton.addEventListener('click', createBook);
bookContainer.addEventListener('click', e => {
  if (e.target.classList.contains('delete-book')) {
    deleteBook(e);
  } else if (e.target.classList.contains('read-status')) {
    changeReadStatus(e);
  }
});

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

// create id for each book to match on page
Book.prototype.id = 0;

const books = [];

// loop through books array, create elements for each key in book, add to page
function displayBooks() {
  bookContainer.innerHTML = '';
  books.forEach(book => {
    let newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.setAttribute('data-id', String(book.id));

    for (key in book) {
      let el;
      if (key === 'id') {
        // create a delete btn matched with each specific book id
        el = document.createElement('button');
        el.classList.add('delete-book', 'fa', 'fa-times');
        el.setAttribute('data-id', book.id);
      } else if (key === 'read-status') {
        // create p tag for read-status, yes they have or no they haven't read
        el = document.createElement('button');
        el.classList.add('read-status');
        el.setAttribute('data-id', book.id);
        el.innerText = book[key] === true ? 'Yes' : 'No';
      } else {
        // create p tag for remaining keys, fill with key value
        el = document.createElement('p');
        el.innerText = book[key];
      }
      newBook.appendChild(el);
    }
    bookContainer.appendChild(newBook);
  });
}

function resetForm() {
  document.querySelector('form').reset();
}

// make sure each input is filled out, otherwise return false
function validateInput() {
  let validated;
  inputs.forEach(input => {
    if (input.id !== 'read-status') {
      // read-status checkbox can be left empty
      validated = input.value !== '' ? true : false;
    }
  });
  return validated;
}

// create book and add key for each input in form
function createBook() {
  if (validateInput()) {
    let book = new Book();
    inputs.forEach(input => {
      book[input.id] = input.id === 'read-status' ? input.checked : input.value;
    })
    // assign book id, increase prototype so no book gets same id
    book.id = Book.prototype.id;
    Book.prototype.id++;
    
    books.push(book);
    displayBooks();
    resetForm();
  }
}

// set read-status to opposite of current value
function changeReadStatus(e) {
  e.target.innerText = e.target.innerText === 'Yes' ? 'No' : 'Yes';
  books.forEach((book, i) => {
    if (book.id === Number(e.target.getAttribute('data-id'))) {
      books[i]['read-status'] = !books[i]['read-status'];
    }
  })
}

// remove the correct book from page and from books array
function deleteBook(e) {
  e.target.parentElement.parentElement.removeChild(e.target.parentElement);
  books.forEach((book, i) => {
    if (book.id === Number(e.target.getAttribute('data-id'))) {
      books.splice(i, 1);
    }
  })
}