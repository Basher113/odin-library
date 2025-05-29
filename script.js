const booksElement = document.querySelector(".books");
const formElement = document.querySelector("form");
const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead === "on" ? "Have Read.": "Have not read yet."
}

function addBookToLibrary(title, author, pages, haveRead) {
  const newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
  return newBook
}

// add default books
addBookToLibrary("Harry Potter", "J.K Rowling", 450, "off");
addBookToLibrary("The subtle art of not giving a f*ck", "Mark Manson", 244, "on")

const createBookCardElement = function (book) {
  // Create elements for the book card
  const bookCardElement = document.createElement("div");
  const bookImageElement = document.createElement("div");
  const bookInfoElement = document.createElement("div");
  const bookTitleElement = document.createElement("h3");
  const bookAuthorElement = document.createElement("div");
  const bookPagesElement = document.createElement("div");
  const bookHaveReadElement = document.createElement("div");
  const bookDeleteButtonElement = document.createElement("button");

  // Add class to new elements
  bookCardElement.classList.add("book-card");
  bookImageElement.classList.add("book-img");
  bookInfoElement.classList.add("book-info");
  bookTitleElement.classList.add("title");
  bookAuthorElement.classList.add("author");
  bookPagesElement.classList.add("pages");
  bookHaveReadElement.classList.add("read");
  bookDeleteButtonElement.classList.add("delete-button");

  // Add content to new elements
  bookImageElement.textContent = "Book Image";
  bookTitleElement.innerHTML = "<span>Title: </span>" + book.title;
  bookAuthorElement.innerHTML = "<span>Author: </span>" + book.author;
  bookPagesElement.innerHTML = "<span>Pages: </span>" + book.pages;
  bookHaveReadElement.textContent = book.haveRead;
  bookDeleteButtonElement.textContent = "Delete"
  
  // Appending elements
  bookInfoElement.appendChild(bookTitleElement);
  bookInfoElement.appendChild(bookAuthorElement);
  bookInfoElement.appendChild(bookPagesElement);
  bookInfoElement.appendChild(bookHaveReadElement);
  bookInfoElement.appendChild(bookDeleteButtonElement);

  bookCardElement.appendChild(bookImageElement);
  bookCardElement.appendChild(bookInfoElement);

    
  bookDeleteButtonElement.setAttribute("data-id", book.id);
  bookCardElement.setAttribute("id", book.id)
  return bookCardElement;
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formElement);
  const newBookTitle = formData.get("title");
  const newBookAuthor = formData.get("author");
  const newBookPages = formData.get("pages");
  const newBookHaveRead = formData.get("read");
  const newBook = addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookHaveRead);
  const bookCardElement = createBookCardElement(newBook);
  
  booksElement.appendChild(bookCardElement);
  
  // call so we can delete the new element if delete button is clicked
  canDeleteElement()
})

const renderBooks = function() {
  myLibrary.forEach((book) => {
    const bookCardElement = createBookCardElement(book);
    booksElement.appendChild(bookCardElement);
  })
}

const canDeleteElement = function () {
  const bookDeleteButtonElements = document.querySelectorAll(".delete-button");
  bookDeleteButtonElements.forEach((deleteButton, index) => {
  deleteButton.addEventListener("click", () => {
    // remove from myLibrary
    myLibrary.splice(index, 1);
    const bookId = deleteButton.dataset.id;
    console.log(bookId);
    const bookCardElement = document.getElementById(bookId);
    console.log(bookCardElement)
    bookCardElement.remove();
    })
  })
}



renderBooks();
canDeleteElement();

