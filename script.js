const booksElement = document.querySelector(".books");
const formElement = document.querySelector("form");
const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead? "Yes": "No"
  this.updateHaveRead = () => {
    this.haveRead = this.haveRead === "Yes" ? "No" : "Yes";
  }
}

function addBookToLibrary(title, author, pages, haveRead) {
  const newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
  return newBook;
}

// add default books
addBookToLibrary("Harry Potter", "J.K Rowling", 450, "off");
addBookToLibrary("The subtle art of not giving a f*ck", "Mark Manson", 244, "on");

function createBookCardElement (book) {
  // Create elements for the book card
  const bookCardElement = document.createElement("div");
  const bookImageElement = document.createElement("div");
  const bookInfoElement = document.createElement("div");

  const bookTitleContainerElement = document.createElement("div");
  const bookTitleSpanElement = document.createElement("span");
  const bookTitleElement = document.createElement("h3");

  const bookAuthorContainerElement = document.createElement("div");
  const bookAuthorSpanElement = document.createElement("span");
  const bookAuthorElement = document.createElement("div");

  const bookPagesContainerElement = document.createElement("div");
  const bookPagesSpanElement = document.createElement("span");
  const bookPagesElement = document.createElement("div");

  const bookHaveReadContianerElement = document.createElement("div");
  const bookHaveReadSpanElement = document.createElement("span");
  const bookHaveReadElement = document.createElement("div");
  const bookUpdateButtonlement = document.createElement("button");
  
  const bookDeleteButtonElement = document.createElement("button");

  // Add class to new elements
  bookCardElement.classList.add("book-card");
  bookImageElement.classList.add("book-img");
  bookInfoElement.classList.add("book-info");
  bookTitleElement.classList.add("title");
  bookAuthorElement.classList.add("author");
  bookPagesElement.classList.add("pages");
  bookHaveReadElement.classList.add("read");
  bookHaveReadElement.classList.add(`read-${book.id}`)
  bookUpdateButtonlement.classList.add("update-button");
  bookDeleteButtonElement.classList.add("delete-button");

  // Add content to new elements
  bookImageElement.textContent = "Book Image";

  bookTitleSpanElement.textContent = "Title: ";
  bookTitleElement.textContent =  book.title;

  bookAuthorSpanElement.textContent = "Author: ";
  bookAuthorElement.textContent = book.author;

  bookPagesSpanElement.textContent = "Pages: ";
  bookPagesElement.textContent = book.pages;

  bookHaveReadSpanElement.textContent = "Have read: "
  bookHaveReadElement.textContent = book.haveRead;

  bookUpdateButtonlement.textContent = "Update"
  bookDeleteButtonElement.textContent = "Delete";

  // Appending elements
  bookTitleContainerElement.appendChild(bookTitleSpanElement);
  bookTitleContainerElement.appendChild(bookTitleElement);
  
  bookAuthorContainerElement.appendChild(bookAuthorSpanElement);
  bookAuthorContainerElement.appendChild(bookAuthorElement);
  
  bookPagesContainerElement.appendChild(bookPagesSpanElement);
  bookPagesContainerElement.appendChild(bookPagesElement);

  bookHaveReadContianerElement.appendChild(bookHaveReadSpanElement);
  bookHaveReadContianerElement.appendChild(bookHaveReadElement);
  bookHaveReadContianerElement.appendChild(bookUpdateButtonlement);



  bookInfoElement.appendChild(bookTitleContainerElement);
  bookInfoElement.appendChild(bookAuthorContainerElement);
  bookInfoElement.appendChild(bookPagesContainerElement);
  bookInfoElement.appendChild(bookHaveReadContianerElement);
  bookInfoElement.appendChild(bookDeleteButtonElement);

  bookCardElement.appendChild(bookImageElement);
  bookCardElement.appendChild(bookInfoElement);

    
  bookDeleteButtonElement.setAttribute("data-id", book.id);
  bookUpdateButtonlement.setAttribute("data-id", book.id);
  bookCardElement.setAttribute("id", book.id);
  return bookCardElement;
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formElement);
  const newBookTitle = formData.get("title");
  const newBookAuthor = formData.get("author");
  const newBookPages = formData.get("pages");
  const newBookHaveRead = formData.get("read");
  addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookHaveRead);
  renderBooks();
  formElement.reset();
})

const renderBooks = function() {
  booksElement.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookCardElement = createBookCardElement(book);
    booksElement.appendChild(bookCardElement);
  });
  activateUpdateAndDeleteButton();
}

function getBook(bookId) {
  return myLibrary.find((book) => book.id === bookId)
}

function activateUpdateAndDeleteButton () {
  const bookUpdateButtonElements = document.querySelectorAll(".update-button");
  bookUpdateButtonElements.forEach((updateButton) => {
    updateButton.addEventListener("click", () => {
      const bookId = updateButton.dataset.id;
      
      // update the book haveRead property
      const book = getBook(bookId);
      book.updateHaveRead();

      // Update text content
      const haveReadElement = document.querySelector(`.read-${bookId}`);
      haveReadElement.textContent = book.haveRead;
    })
  })

  const bookDeleteButtonElements = document.querySelectorAll(".delete-button");
  bookDeleteButtonElements.forEach((deleteButton, index) => {
  deleteButton.addEventListener("click", () => {
    myLibrary.splice(index, 1);
    const bookId = deleteButton.dataset.id;
    const bookCardElement = document.getElementById(bookId);
    console.log(bookCardElement, bookId)
    bookCardElement.remove();
    })
  })
}

renderBooks();