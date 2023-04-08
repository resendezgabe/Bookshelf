// Define the Book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.isFavorite = false;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  // Render the book as a DOM element
  render() {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const titleElement = document.createElement('h2');
    titleElement.innerText = this.title;
    bookElement.appendChild(titleElement);

    const authorElement = document.createElement('p');
    authorElement.innerText = `By ${this.author}`;
    bookElement.appendChild(authorElement);

    // Add favorite button
    const favoriteButton = document.createElement('button');
    favoriteButton.innerText = this.isFavorite ? 'Unfavorite' : 'Favorite';
    bookElement.appendChild(favoriteButton);

    return bookElement;
  }
}

// Define the Bookshelf class
class Bookshelf {
  constructor() {
    this.books = [];
    this.favorites = [];
  }

  // Add a book to the bookshelf
  addBook(book) {
    this.books.push(book);
  }

  // Add a book to favorites
  addFavorite(book) {
    this.favorites.push(book);
  }

  // Remove a book from favorites
  removeFavorite(book) {
    const index = this.favorites.indexOf(book);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  // Fill the bookshelf with data
  fillWithData(data) {
    for (const bookData of data) {
      const book = new Book(bookData.title, bookData.author);
      this.addBook(book);
    }
  }

  // Count the number of favorite books
  countFavorites() {
    return this.favorites.length;
  }

  // Render the list of favorite books as a DOM element
  renderFavorites() {
    const favoritesElement = document.createElement('div');
    favoritesElement.classList.add('favorites');

    for (const book of this.favorites) {
      favoritesElement.appendChild(book.render());
    }

    return favoritesElement;
  }

  // Search for books by title or author
  search(query) {
    return this.books.filter(book =>
      book.title.toString().toLowerCase().includes(query.toLowerCase()) ||
      book.author.toString().toLowerCase().includes(query.toLowerCase())
    );
}

  // Sort books
  sortBooks(sortBy, ascending) {
    const sortedBooks = [...this.books];
    const compareFunc = ascending ? (a, b) => a.localeCompare(b) : (a, b) => b.localeCompare(a);
  
    sortedBooks.sort((bookA, bookB) => {
      switch (sortBy) {
        case 'title':
          return compareFunc(bookA.title, bookB.title);
        case 'author':
          return compareFunc(bookA.author.toString().toLowerCase(), bookB.author.toString().toLowerCase());
        default:
          return null;
      }
    });
  
    return sortedBooks;
  }

  // Render the bookshelf as a DOM element
  render(books) {
    const bookshelfElement = document.createElement('div');
    bookshelfElement.classList.add('bookshelf');

    for (const book of books) {
      bookshelfElement.appendChild(book.render());
    }

    return bookshelfElement;
  }
}

// Create a new bookshelf instance and fill it with books from data
const bookshelf = new Bookshelf();
bookshelf.fillWithData(bookData);

document.body.appendChild(bookshelf.render(bookshelf.books));

// Create and update the favorite count DOM element
const favoriteCountElement = document.createElement('p');
updateFavoriteCountAndList();

function updateFavoriteCountAndList() {
 // Update favorite count
 const favoriteCount = bookshelf.countFavorites();
 favoriteCountElement.innerText = `Total Favorites: ${favoriteCount}`;

 // Update list of favorite books
 const existingFavoritesElement = document.querySelector('.favorites');
 if (existingFavoritesElement) {
   document.body.removeChild(existingFavoritesElement);
 }
 document.body.appendChild(bookshelf.renderFavorites());
}

// Add an eventlistener for the "Favorite" button
function addFavoriteButtonListener(bookElement, book) {
 const favoriteButton = bookElement.querySelector('button');
 favoriteButton.addEventListener('click', () => {
   book.toggleFavorite();
   favoriteButton.innerText = book.isFavorite ? 'Unfavorite' : 'Favorite';
   if (book.isFavorite) {
     bookshelf.addFavorite(book);
   } else {
     bookshelf.removeFavorite(book);
   }
   updateFavoriteCountAndList();
 });
}

// Loop through all books and add an event listener for the "Favorite" button
const allBookElements = document.querySelectorAll('.book');
allBookElements.forEach((bookElement, index) => {
 const book = bookshelf.books[index];
 addFavoriteButtonListener(bookElement, book);
});

// Append the favorite count element to the document body
document.body.appendChild(favoriteCountElement);

// Create UI elements for search and sorting
const searchForm = document.createElement('form');
searchForm.innerHTML = `
 <input type="text" placeholder="Search" name="query">
 <button type="submit">Search</button>`;

const sortBySelect = document.createElement('select');
sortBySelect.innerHTML = `
 <option value="">Sort by...</option>
 <option value="title">Title</option>
 <option value="author">Author</option>
`;

const sortOrderToggle = document.createElement('button');
sortOrderToggle.innerText = 'Toggle Sort Order (Ascending/Descending)';
sortOrderToggle.dataset.ascending = 'true';

// Append UI elements to the document body
document.body.appendChild(searchForm);
document.body.appendChild(sortBySelect);
document.body.appendChild(sortOrderToggle);

// Event listeners
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = event.target.query.value;
  const searchResults = bookshelf.search(query);
  const existingBookshelf = document.querySelector('.bookshelf');
  document.body.replaceChild(bookshelf.render(searchResults), existingBookshelf);
});

sortBySelect.addEventListener('change', () => {
 const sortBy = sortBySelect.value;
 let ascending = sortOrderToggle.getAttribute('data-ascending') !== 'false';
 const sortedBooks = bookshelf.sortBooks(sortBy, ascending);
 const existingBookshelf = document.querySelector('.bookshelf');
 document.body.replaceChild(bookshelf.render(sortedBooks), existingBookshelf);
});

sortOrderToggle.addEventListener('click', () => {
  const ascending = sortOrderToggle.dataset.ascending === 'true';
  sortOrderToggle.dataset.ascending = !ascending;
  const sortBy = sortBySelect.value;
  const sortedBooks = bookshelf.sortBooks(sortBy, !ascending);
  const existingBookshelf = document.querySelector('.bookshelf');
  document.body.replaceChild(bookshelf.render(sortedBooks), existingBookshelf);
 });