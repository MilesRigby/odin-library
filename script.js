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

function addBookToLibrary(title, author, pageCount, haveRead) {
    var newBook = new Book(title, author, pageCount, haveRead)

    library.push(newBook)

    // Update display when implemented
}

function drawBooksToPage() {
    var booksDisplay = document.getElementById("books");

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

        booksDisplay.appendChild(card);
    }
}

function removeBook(id) {
    for (var book in library) {
        if (library[book].id == id) { library.splice(book, 1); }
    }

    for (var card of document.getElementsByClassName("book-card")) {
        var cardId = card.querySelector(".book-id").textContent;
        if (cardId == id) { card.remove(); }
    }
}

addBookToLibrary("The Hobbit, Or, There and Back Again", "J.R.R. Tolkien", 310, true);
addBookToLibrary("The Lord of The Rings: The Fellowship of The Ring", "J.R.R. Tolkien", 510, false);
addBookToLibrary("testboooooooooooooooooook", "testmaaaaaaaaaan", 11000110011, true);

drawBooksToPage();