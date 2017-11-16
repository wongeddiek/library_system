
var bookTemplate = $('#templates .book');
var borrowerTemplate = $('#templates .borrower');
var bookTable = $('#bookTable');
var borrowerTable = $('#borrowerTable');

// my library ID is 118
var libraryID = 118;

// initialize Requests class
const request = new Requests(libraryID);

var baseURL = `https://floating-woodland-64068.herokuapp.com/libraries/${libraryID}`;

// function for adding books to the webpage
// The bookData argument is passed in from the API
function addBookToPage(bookData) {
  // grab <tr> template DOM object
  var book = bookTemplate.clone();

  // set bookData.id as the data-id
  book.attr('data-id',bookData.id);
  // find the "bookTitle" class and set the text to bookData.title
  book.find('.bookTitle').text(bookData.title);
  // find the "bookImage" class and set the image src to bookData.url and alt to bookData.title
  book.find('.bookImage').attr('src', bookData.image_url).attr('alt', bookData.title);

  // add click handler to book <tr> to populate book detail modal
  book.click( () => {
    // populate book detail modal
    $('#bookDetailModal').attr('data-id', bookData.id);
    $('#bookDetailModalLabel').text(bookData.title);
    $('#bookDetailModalDescription').text(bookData.description);
    $('#bookDetailModalImage').attr('src', bookData.image_url).attr('alt', bookData.title);
  });

  // append book object to the DOM bookTable
  bookTable.append(book);
}

// function for adding borrowers to the webpage
// The borrowerData arugment is passed in from the API
function addBorrowerToPage(borrowerData) {
  // grab the <tr> template DOM object
  var borrower = borrowerTemplate.clone();
  // set borrowerData.id as the data-id
  borrower.attr('data-id', borrowerData.id);
  // find the borrowerName class and set the borrower first and last name in DOM
  borrower.find('.borrowerName').text(`${borrowerData.firstname} ${borrowerData.lastname}`);
  // append borrower object to the DOM borrowerTable
  borrowerTable.append(borrower);
}


// var bookData = {id: 1, title: "Lord of the Rings", image_url: "https://images-na.ssl-images-amazon.com/images/I/51tW-UJVfHL._SX321_BO1,204,203,200_.jpg",}

// get the books
var getBooks = request.getBooks();
getBooks.then(data => {
  data.forEach(bookData => {
    addBookToPage(bookData);
  });
});

// get the borrowers
var getBorrowers = request.getBorrowers();
getBorrowers.then(data => {
  data.forEach(borrowerData => {
    addBorrowerToPage(borrowerData);
  });
});

// function to create ajax data object from form
function createFormData(formObj) {
  var dataObj = {};
  // serializeArray() form data, output = [{name:formname, value:formvalue},{}..]
  //then map the data to the data object
  formObj.serializeArray().forEach(function(x){dataObj[x.name] = x.value;});
  return dataObj;
}

// add image input preview
$('#imageInput').on('input', () => {
  $('#imagePreviewText').text("Book Image Preview:");
  $('#imagePreview').attr('src', $('#imageInput').val()).attr('alt', "Invalid Image Link");
});

// add click handler for adding new books
$('#createBook').on('click', e => {
  e.preventDefault();
  // create new bookData object
  var bookData = createFormData($('#createBookForm'));
  // call the createbook ajax method, passing the bookData
  var createBook = request.createBook(bookData);
  // call the addBookToPage function to add the newly created book to page
  createBook.then(data => {
    addBookToPage(data);
  });
  // close the modal
  $('#bookModal').modal('toggle');
});

// clear create book modal on close
$("#bookModal").on("hidden.bs.modal", function(){
  // clear the form input fields
  $('#createBookForm')[0].reset();
  // clear the image preview
  $('#imagePreviewText').text("");
  $('#imagePreview').attr('src', "").attr('alt', "");
});

// add click handler for adding new borrowers
$('#createBorrower').on('click', e => {
  e.preventDefault();
  // create new borrowerData object
  var borrowerData = createFormData($('#createBorrowerForm'));
  // call the createborrower ajax method, passing the borrowerData
  var createBorrower = request.createBorrower(borrowerData);
  // call the addBorrowerToPage function to add the newly created borrower to page
  createBorrower.then(data => {
    addBorrowerToPage(data);
  });
  // close the modal
  $('#borrowerModal').modal('toggle');
});

// clear create borrower modal on close
$("#borrowerModal").on("hidden.bs.modal", function(){
  // clear the form input fields
  $('#createBorrowerForm')[0].reset();
});


// add click handler to book detail modal to delete book
$('#deleteBook').on('click', () => {
  if (confirm('Are you sure?')) {
    // ajax call to delete book from database
    var deleteBook = request.deleteBook({id:$('#bookDetailModal').attr('data-id')});
    deleteBook.then(data => {
      // remove the book <tr> from DOM
      $('.book').filter(`[data-id=${data.id}]`).remove();
      // close the modal
      $('#bookDetailModal').modal('toggle');
    });
  }
});

// <tr class="borrower" data-id="some-id">
//   <td class="borrwerName">Name of Borrower</td>
// </tr>


