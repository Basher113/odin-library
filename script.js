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
  const bookAuthorSpanElement = document.createElement("span");
  const bookPagesSpanElement = document.createElement("span");
  const bookPagesElement = document.createElement("div");
  const bookHaveReadElement = document.createElement("div");

  // Add class to new elements
  bookCardElement.classList.add("book-card");
  bookImageElement.classList.add("book-img");
  bookInfoElement.classList.add("book-info");
  bookTitleElement.classList.add("title");
  bookAuthorElement.classList.add("author");
  bookPagesElement.classList.add("pages");
  bookHaveReadElement.classList.add("read");

  // Add content to new elements
  bookImageElement.textContent = "Book Image";
  bookTitleElement.innerHTML = "<span>Title: </span>" + book.title;
  bookAuthorElement.innerHTML = "<span>Author: </span>" + book.author;
  bookPagesElement.innerHTML = "<span>Pages: </span>" + book.pages;
  bookHaveReadElement.textContent = book.haveRead;
  
  // Appending elements
  bookInfoElement.appendChild(bookTitleElement);
  bookInfoElement.appendChild(bookAuthorElement);
  bookInfoElement.appendChild(bookPagesElement);
  bookInfoElement.appendChild(bookHaveReadElement);

  bookCardElement.appendChild(bookImageElement);
  bookCardElement.appendChild(bookInfoElement);


  return bookCardElement;
}

const renderBooks = function() {
  myLibrary.forEach((book) => {
    const bookCardElement = createBookCardElement(book);
    booksElement.appendChild(bookCardElement);
  })
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formElement);
  const newBookTitle = formData.get("title");
  const newBookAuthor = formData.get("author");
  const newBookPages = formData.get("pages");
  const newBookHaveRead = formData.get("read");
  console.log(newBookTitle, newBookAuthor, newBookPages, newBookHaveRead);
  const newBook = addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookHaveRead);
  const bookCardElement = createBookCardElement(newBook);
  booksElement.appendChild(bookCardElement);
})



renderBooks()
