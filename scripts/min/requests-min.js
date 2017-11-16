class Requests {

  constructor(libraryID) {
    this.serverURL = "https://floating-woodland-64068.herokuapp.com/";
    // this.serverURL = "http://localhost:3000"
    this.libraryID = libraryID;
  }

  // ajax call function for to be used for the below class methods
  ajaxCall(actionStr, urlStr, dataObj = {}, createLib = false) {
    return new Promise((resolve) => {
      var req = $.ajax({
        type: actionStr,
        url: this.serverURL + urlStr,
        data: dataObj
      });
      req.done((data) => {
        if(createLib) this.libraryID = data.id;
        resolve(data);
      });
    });
  }

  /*
    POST -> /libraries
    Create a new library with the given name
  */
  createLibrary(name) {
    return this.ajaxCall('POST', `libraries`, {library: {name: name,}}, true);
  }

  /*
  ==================================================================
    BORROWERS
  ==================================================================
  */

  getBorrowers() {
    return this.ajaxCall('GET', `libraries/${this.libraryID}/borrowers`);
  }

  /*
    POST -> /libraries/:library_id/borrowers
    Create a new borrower with the given arguments
  */
  createBorrower(borrower) {
    return this.ajaxCall('POST', `libraries/${this.libraryID}/borrowers`,
      {borrower: borrower});
  }

  updateBorrower(borrower) {
    return this.ajaxCall('PUT', `libraries/${this.libraryID}/borrowers/${borrower.id}`,
      {borrower: borrower});
  }

  deleteBorrower(borrower) {
    return this.ajaxCall('DELETE', `libraries/${this.libraryID}/borrowers/${borrower.id}`);
  }

  /*
  ==================================================================
    BOOKS
  ==================================================================
  */

  getBooks() {
    return this.ajaxCall('GET', `libraries/${this.libraryID}/books`);
  }

  getBook(book) {
    return this.ajaxCall('GET', `libraries/${this.libraryID}/books/${book.id}`);
  }

  /*
    POST -> /libraries/:library_id/books
    Create a new book with the given arguments
  */
  createBook(book) {
    return this.ajaxCall('POST', `libraries/${this.libraryID}/books`,
      {book: book});
  }

  updateBook(book) {
    return this.ajaxCall('PUT',`libraries/${this.libraryID}/books/${book.id}`,
      {book: book});
  }

  deleteBook(book) {
    return this.ajaxCall('DELETE',`libraries/${this.libraryID}/books/${book.id}`);
  }

}


