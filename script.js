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

addBookToLibrary("The Hobbit, Or, There and Back Again", "J.R.R. Tolkien", 310, true);
addBookToLibrary("The Lord of The Rings, The Fellowship of The Ring", "J.R.R. Tolkien", 510, true);

console.log(library)