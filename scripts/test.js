/* global Requests */

const requests = new Requests()

requests.createLibrary("With Promises").then((data) => {
  //Create Borrowers
  var borrowers = [
    {firstname: "Leslie", lastname: "Knope"},
    {firstname: "Ron", lastname: "Swanson"},
    {firstname: "Andy", lastname: "Dwyer"},
  ]

  //Create Books
  var books = [
    {title: "The Golden Compass", description: "test", image_url: "https://images.gr-assets.com/books/1505766203l/119322.jpg"},
    {title: "Promises to Keep", description: "test", image_url: "https://images-na.ssl-images-amazon.com/images/I/5178f2gBMtL._SX322_BO1,204,203,200_.jpg"},
    {title: "Paddle Your Own Canoe", description: "test", image_url: "https://images-na.ssl-images-amazon.com/images/I/51CD8MTSM1L.jpg"},
    {title: "Pawnee, the Greatest Town in America", description: "test", image_url: "https://images-na.ssl-images-amazon.com/images/I/51%2Bf-4bYl5L._SX258_BO1,204,203,200_.jpg"},
    {title: "The Ruby Programming Language", description: "test", image_url: "http://www.rubyinside.com/wp-content/uploads/2008/02/hummingbird-book-the-ruby-programming-language.jpg"},
  ]

  //Wait until all objects are created then log the output
  var promises = []

  borrowers.forEach((borrower) => {
    promises.push(requests.createBorrower(borrower))
  })

  books.forEach((book) => {
    promises.push(requests.createBook(book))
  })

  //Wait until all 5 books and 3 borrowers are created then log the output
  Promise.all(promises).then( values => {
    console.log(values)

    //Now try to delete some stuff
    requests.deleteBorrower(values[0]).then((data) => {
      console.log(`Deleted: ${data.firstname} ${data.lastname}`)

      // Finally get all Borrowers
      requests.getBorrowers().then((data) => {
        console.log("Printing all Borrowers:")
        console.log(data)
      })
    })

    
    requests.deleteBook(values[3]).then((data) => {
      console.log(`Deleted: ${data.title}`)

      requests.updateBook(values[4]).then((data) => {
        console.log(`Updated Book: ${data.title}`)
        console.log(data)

        // Finally get all Books
        requests.getBooks().then((data) => {
          console.log("Printing all Books:")
          console.log(data)
        })
      })
    })

    // Add a borrower to a book
    values[4].borrower_id = values[1].id
  })

})
