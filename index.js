// Define the Book class
class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
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
    
        return bookElement;
      }
    }


  // Define the Bookshelf class
  class Bookshelf {
    constructor() {
      this.books = [];
    }
  
    // Add a book to the bookshelf
    addBook(book) {
      this.books.push(book);
    }
  
      // Render the bookshelf as a DOM element
    render() {
        const bookshelfElement = document.createElement('ul');
        bookshelfElement.classList.add('bookshelf');
        
        for (let i = 0; i < this.books.length; i++) {
            const book = this.books[i];
            const bookElement = book.render();
            
            const liElement = document.createElement('li');
            liElement.appendChild(bookElement);
            bookshelfElement.appendChild(liElement);
        }

        return bookshelfElement;
  }
    
    // Fill the bookshelf with books from data
    fillWithData(data) {
        for (let i = 0; i < data.length; i++) {
            const bookData = data[i];
            const book = new Book(bookData.title, bookData.author);
            this.addBook(book);
        }
    }
 }
  
  // Create a new bookshelf instance and fill it with books from data
  const bookshelf = new Bookshelf();
  bookshelf.fillWithData(bookData);

  document.body.appendChild(bookshelf.render());