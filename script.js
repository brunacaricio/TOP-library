const myLibrary = [];
const cards = document.querySelector('.cards');
const addBtn = document.querySelector('.add-btn');
const form = document.querySelector('form');
const newBookDialog = document.querySelector('#new-book-dialog');
const closeBtn = document.querySelector('.close-btn')

class Book {
  constructor(title, author, genre, year, read = false) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.year = year;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}



// function Book(title, author, genre, year, read = false) {
//   this.title = title;
//   this.author = author;
//   this.genre = genre;
//   this.year = year;
//   this.read = read;
// }

// Book.prototype.toggleReadStatus = function() {
//   this.read = !this.read;
// }

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
        <div class="checkbox-deletebtn">
          <label>
            <input type="checkbox" class="read-checkbox" data-index=${index} ${book.read ? 'checked' : ''}>
            Read
          </label>
          <a href="#" class="delete-btn" data-index="${index}">Delete</a>
        </div>
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

  const readCheckboxes = document.querySelectorAll('.read-checkbox');
  readCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const bookIndex = checkbox.getAttribute('data-index');
      toggleReadStatus(bookIndex);
    })
  })

}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1); // Remove book by index from array
  renderBooks(); // Re-render books
}

function toggleReadStatus(index) {
  myLibrary[index].toggleReadStatus();
  renderBooks();
}

// Add sample books to the library
const book1 = new Book('1984', 'George Orwell', 'Dystopian, Science Fiction', 1949);
const book2 = new Book('Pride and Prejudice', 'Jane Austen', 'Romance, Classic', 1813, read);
const book3 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 'Tragedy, Fiction', 1925);

const books = [book1, book2, book3];

books.forEach((book) => {
  addBookToLibrary(book);
});

// Show/hide form functionality
addBtn.addEventListener('click', () => {
  newBookDialog.showModal();
});

// Form submission to add a new book
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const genre = document.getElementById('genre').value;
  const year = document.getElementById('year').value;
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, genre, year, read);
  addBookToLibrary(newBook);

  form.reset();
  newBookDialog.close();
});

closeBtn.addEventListener('click', () => {
  newBookDialog.close();
})

console.log(myLibrary);
