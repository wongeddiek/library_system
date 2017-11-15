
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
function addBorrowertoPage(borrowerData) {
  // grab the <tr> template DOM object
  var borrower = borrowerTemplate.clone();
  // set borrowerData.id as the data-id
  borrower.attr('data-id', borrowerData.id);
  // find the borrowerName class and set the Borrower Name in DOM
  borrower.find('.borrwerName').text(`${borrowerData.firstname} ${borrowerData.lastname}`);
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
    addBorrowertoPage(borrowerData);
  });
});


// <tr class="borrower" data-id="some-id">
//   <td class="borrwerName">Name of Borrower</td>
// </tr>


