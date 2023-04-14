const addBookForm = document.createElement('form');
addBookForm.innerHTML = `
  <label for="title">Title:</label>
  <input type="text" id="title" name="title" required>
  <label for="author">Author:</label>
  <input type="text" id="author" name="author" required>
  <button type="submit">Add Book</button>
`;
document.body.appendChild(addBookForm);

function handleFavoriteButtonClick(bookElement, book) {
    book.toggleFavorite();
    const favoriteButton = bookElement.querySelector('button');
    favoriteButton.innerText = book.isFavorite ? 'Unfavorite' : 'Favorite';
    if (book.isFavorite) {
      bookshelf.addFavorite(book);
    } else {
      bookshelf.removeFavorite(book);
    }
    updateFavoriteCountAndList();
  }

addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
  
    const newBook = new Book(title, author);
    bookshelf.addBook(newBook);
  
    // Clear the input fields
    event.target.title.value = '';
    event.target.author.value = '';
  
    const existingBookshelf = document.querySelector('.bookshelf');
    document.body.replaceChild(bookshelf.render(bookshelf.books), existingBookshelf);
  });