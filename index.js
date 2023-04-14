// Define the Book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.isFavorite = false;
    this.comments = [];
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

    const commentsButton = document.createElement('button');
    commentsButton.innerText = 'Comment';
    bookElement.appendChild(commentsButton);

    // Add comment form
    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form');
    commentForm.style.display = 'none'; // Hide form by default
    commentForm.innerHTML = `
      <input type="text" placeholder="Leave a comment..." name="comment" maxlength="280" required>
      <button type="submit">Send</button> `;

    bookElement.appendChild(commentForm);

    // Add comment list
    const commentList = document.createElement('ul');
    commentList.classList.add('comment-list');
    this.comments.forEach((comment) => {
      const listItem = document.createElement('li');
      listItem.innerText = comment;
      commentList.appendChild(listItem);
    });

    bookElement.appendChild(commentList);

    return bookElement;
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

document.body.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.closest('.book') && (event.target.innerText === 'Favorite' || event.target.innerText === 'Unfavorite')) {
    const bookElement = event.target.closest('.book');
    const bookIndex = Array.from(bookElement.parentElement.children).indexOf(bookElement);
    const book = bookshelf.books[bookIndex];
    handleFavoriteButtonClick(bookElement, book);
  }
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