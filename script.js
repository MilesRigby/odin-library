function Book(title, author, pageCount, haveRead) {
  if (!new.target) {
    throw Error("Nah m8");
  }

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

var theHobbit = new Book("The Hobbit, Or, There and Back Again", "J.R.R. Tolkien", 310, true);

console.log(Object.getPrototypeOf(theHobbit) === Object.prototype)