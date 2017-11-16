
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

// // function getNewBookData() {
// //   var newBookData = {
// //     title: $('#createBookForm').
// //
// //   }
//
//
// }

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

// add click handler for adding new books
$('#createBook').on('click', e => {
  e.preventDefault();
  // create new bookData object
  var bookData = {};
  // serializeArray() form data, output = [{name:formname, value:formvalue},{}..]
  //then map the data to the bookData object
  $('#createBookForm').serializeArray().forEach(function(x){bookData[x.name] = x.value;});

  // call the createbook ajax method, passing the bookData
  var createBook = request.createBook(bookData);
  // call the addBookToPage function to add the newly created book to page
  createBook.then(data => {
    addBookToPage(data);
  });
  // clear the form input fields
  $('#createBookForm').find("input[type=text]").val("");
});

// add click handler for adding new borrowers
$('#createBorrower').on('click', e => {
  e.preventDefault();
  // create new borrowerData object
  var borrowerData = {};
  // serializeArray() form data, output = [{name:formname, value:formvalue},{}..]
  //then map the data to the bookBorrower object
  $('#createBorrowerForm').serializeArray().forEach(function(x){borrowerData[x.name] = x.value;});

  // call the createborrower ajax method, passing the borrowerData
  var createBorrower = request.createBorrower(borrowerData);
  // call the addBorrowerToPage function to add the newly created borrower to page
  createBorrower.then(data => {
    addBorrowerToPage(data);
  });
  // clear the form input fields
  $('#createBorrowerForm').find("input[type=text]").val("");
});

// <tr class="borrower" data-id="some-id">
//   <td class="borrwerName">Name of Borrower</td>
// </tr>


