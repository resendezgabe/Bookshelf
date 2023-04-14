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
  