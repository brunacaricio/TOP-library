const myLibrary = [];
const cards = document.querySelector('.cards');
const addBtn = document.querySelector('.add-btn');
const form = document.querySelector('form');

function Book(title, author, genre, year) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.year = year;
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  renderBooks();
}

function renderBooks() {
  cards.innerHTML = ''; // Clear existing books

  myLibrary.forEach((book, index) => {
    cards.insertAdjacentHTML('beforeend', `
      <div class="card">
        <p><b>${book.title}</b></p>
        <p>a ${book.genre} by <b>${book.author}</b> published in ${book.year}.</p>
        <a href="#" class="delete-btn" data-index="${index}">Delete</a>
      </div>
    `);
  });

  // Attach delete event listeners to each button after rendering
  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const bookIndex = button.getAttribute('data-index');
      removeBookFromLibrary(bookIndex);
    });
  });
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1); // Remove book by index from array
  renderBooks(); // Re-render books
}

// Add sample books to the library
const book1 = new Book('1984', 'George Orwell', 'Dystopian, Science Fiction', 1949);
const book2 = new Book('Pride and Prejudice', 'Jane Austen', 'Romance, Classic', 1813);
const book3 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 'Tragedy, Fiction', 1925);

const books = [book1, book2, book3];

books.forEach((book) => {
  addBookToLibrary(book);
});

// Show/hide form functionality
addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (form.classList.contains('d-none')) {
    form.classList.remove('d-none');
    addBtn.innerText = 'Hide form';
  } else {
    form.classList.add('d-none');
    addBtn.innerText = 'Add a new book';
  }
});

// Form submission to add a new book
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const genre = document.getElementById('genre').value;
  const year = document.getElementById('year').value;

  const newBook = new Book(title, author, genre, year);
  addBookToLibrary(newBook);

  form.reset(); // Reset form fields
});

console.log(myLibrary);
