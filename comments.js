function handleCommentButtonClick(bookElement) {
    const commentForm = bookElement.querySelector('.comment-form');
    commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none';
  }

  function handleCommentFormSubmit(event, bookElement, book) {
    event.preventDefault();
    const comment = event.target.comment.value;
  
    // Add comment to the book instance
    book.comments.push(comment);
  
    // Clear the input field
    event.target.comment.value = '';
  
    // Re-render the comments
    const commentList = bookElement.querySelector('.comment-list');
    commentList.innerHTML = '';
    book.comments.forEach((comment) => {
      const listItem = document.createElement('li');
      listItem.innerText = comment;
      commentList.appendChild(listItem);
    });
  }

  document.body.addEventListener('click', (event) => {
    // ...
    if (event.target.tagName === 'BUTTON' && event.target.closest('.book') && event.target.innerText === 'Comment') {
      const bookElement = event.target.closest('.book');
      handleCommentButtonClick(bookElement);
    }
  });
  
  document.body.addEventListener('submit', (event) => {
    if (event.target.tagName === 'FORM' && event.target.closest('.book')) {
      event.preventDefault();
      const bookElement = event.target.closest('.book');
      const bookIndex = Array.from(bookElement.parentElement.children).indexOf(bookElement);
      const book = bookshelf.books[bookIndex];
      handleCommentFormSubmit(event, bookElement, book);
    }
  });