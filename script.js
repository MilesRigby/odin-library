const library = []

function Book(title, author, pageCount, haveRead) {
    if (!new.target) {
        throw Error("Nah m8");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;

    this.info = function() {
    if (this.haveRead) {var readString = "Yes"}
    else               {var readString = "No"}

    return `

Title: ${this.title}
Author: ${this.author}
Page Count: ${this.pageCount}
Read: ${readString}

    `.trim();

    }
}

// Modal form to get data for new books to add to the library
function openBookFormModal() {
    var bookModalBackground = document.createElement("div");
    bookModalBackground.className = "modal-background";

    var bookModal = document.createElement("div");
    bookModal.className = "modal";

    var bookModalHeader = document.createElement("p");
    bookModalHeader.className = "modal-header";
    bookModalHeader.innerText = "Add New Book";
    bookModal.appendChild(bookModalHeader);

    var bookForm = document.createElement("form");
    bookForm.action = "#";
    bookForm.method = "get";
    bookForm.className = "book-form"


    var titleLabel = document.createElement("label");
    titleLabel.className = "form-label";
    titleLabel.for = "title";
    titleLabel.innerText = "Book Title:";
    bookForm.appendChild(titleLabel);

    var titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "name";
    titleInput.className = "text-input";
    titleInput.setAttribute("required", "");
    titleInput.placeholder = "Enter Book Title";
    bookForm.appendChild(titleInput);


    var authorLabel = document.createElement("label");
    authorLabel.className = "form-label";
    authorLabel.for = "author";
    authorLabel.innerText = "Book Author:";
    bookForm.appendChild(authorLabel);

    var authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.name = "author";
    authorInput.className = "text-input";
    authorInput.setAttribute("required", "");
    authorInput.placeholder = "Enter Author";
    bookForm.appendChild(authorInput);


    var pageCountLabel = document.createElement("label");
    pageCountLabel.className = "form-label";
    pageCountLabel.for = "pages";
    pageCountLabel.innerText = "Number of Pages:";
    bookForm.appendChild(pageCountLabel);

    var pageCountInput = document.createElement("input");
    pageCountInput.type = "number";
    pageCountInput.name = "pages";
    pageCountInput.className = "text-input";
    pageCountInput.setAttribute("required", "");
    pageCountInput.min = "1";
    pageCountInput.placeholder = "Enter Page Count";
    bookForm.appendChild(pageCountInput);


    var bookSubmitButton = document.createElement("button");
    bookSubmitButton.type = "submit";
    bookSubmitButton.className = "submit-button";
    bookSubmitButton.innerText = "Add";
    bookForm.appendChild(bookSubmitButton);

    bookForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formData = new FormData(event.target);
        addBookToLibrary(formData.get("name"), formData.get("author"), formData.get("pages"), false);
        bookModalBackground.remove();
    })

    bookModal.appendChild(bookForm);

    var bookCloseButton = document.createElement("button");
    bookCloseButton.className = "exit-modal-button";
    bookCloseButton.innerText = "X";

    bookCloseButton.addEventListener("click", (event) => {
        event.currentTarget.parentElement.parentElement.remove()
    })

    bookModal.appendChild(bookCloseButton)

    bookModalBackground.appendChild(bookModal);
    document.getElementById("page").appendChild(bookModalBackground);
}

// Create a new book's data and card
function addBookToLibrary(title, author, pageCount, haveRead) {
    var newBook = new Book(title, author, pageCount, haveRead)

    library.push(newBook)

    // Update display when implemented
    document.getElementById("books").innerHTML = "";
    drawBooksToPage();
}

function drawBooksToPage() {
    var booksDisplay = document.getElementById("books");

    booksDisplay.innerHTML = "";

    for (var book of library) {
    
        // Card to display info about one book
        var card = document.createElement("div");
        card.className = "book-card";

        // Hidden element that stores the id
        var idElement = document.createElement("div");
        idElement.className = "book-id";
        idElement.textContent = book.id;
        card.appendChild(idElement);

        // Book title, author, page count, and read status
        var titleElement = document.createElement("p");
        titleElement.className = "book-title";
        titleElement.textContent = book.title;
        card.appendChild(titleElement);

        var authorElement = document.createElement("p");
        authorElement.className = "book-author";
        authorElement.textContent = "Author: " + book.author;
        card.appendChild(authorElement);

        var pageCountElement = document.createElement("p");
        pageCountElement.className = "book-page-count";
        pageCountElement.textContent = "Pages: " + book.pageCount;
        card.appendChild(pageCountElement);

        var readElement = document.createElement("p");
        readElement.className = "book-read";
        if (book.haveRead) { readElement.innerText = "Read: Yes"; }
        else               { readElement.innerText = "Read: No"; }
        card.appendChild(readElement);

        // Button to permanently remove the book from the library
        var deleteButton = document.createElement("button");
        deleteButton.className = "book-delete";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", (event) => { 
            var bookId = event.currentTarget.parentElement.querySelector(".book-id").textContent;
            removeBook(bookId); 
        })

        card.appendChild(deleteButton);

        // Button to toggle whether a book has been read
        var readToggleButton = document.createElement("button");
        readToggleButton.className = "book-read-toggle";
        readToggleButton.textContent = "Set read/\nunread";

        readToggleButton.addEventListener("click", (event) => { 
            var bookId = event.currentTarget.parentElement.querySelector(".book-id").textContent;
            toggleBookRead(bookId); 
        })

        card.appendChild(readToggleButton);

        booksDisplay.appendChild(card);
    }
}

// Remove a book from the library and display by ID
function removeBook(id) {
    for (var book in library) {
        if (library[book].id == id) { library.splice(book, 1); }
    }

    drawBooksToPage();
}

// Toggle whether haveRead is true or false and update display
function toggleBookRead(id) {
    for (var book in library) {
        if (library[book].id == id) { library[book].haveRead = !library[book].haveRead; }
    }

    for (var card of document.getElementsByClassName("book-card")) {
        var cardId = card.querySelector(".book-id").textContent;
        var haveRead = card.querySelector(".book-read");
        if (cardId == id) { haveRead.textContent == "Read: Yes" ? haveRead.textContent = "Read: No" : haveRead.textContent = "Read: Yes"; }
    }
}

document.getElementById("add-book-button").addEventListener("click", () => { openBookFormModal(); })

addBookToLibrary("The Hobbit, Or, There and Back Again", "J.R.R. Tolkien", 310, true);
addBookToLibrary("The Lord of The Rings: The Fellowship of The Ring", "J.R.R. Tolkien", 510, false);
addBookToLibrary("testbooooooooook", "testmaaaaaaaaaan", 11000110011, true);
addBookToLibrary("The Hobbit, Or, There and Back Again", "J.R.R. Tolkien", 310, true);
addBookToLibrary("The Lord of The Rings: The Fellowship of The Ring", "J.R.R. Tolkien", 510, false);
addBookToLibrary("testbooooooooook", "testmaaaaaaaaaan", 11000110011, true);