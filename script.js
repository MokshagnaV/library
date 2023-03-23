function Book(title, pages, author, isRead) {
    this.title = title,
    this.pages = pages,
    this.author = author,
    this.isRead = isRead? true: false
}

Book.prototype.info = function () {
    let readinfo = this.isRead? "read": "not read yet"
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readinfo}`
}

Book.prototype.read = function() {
    this.isRead = this.isRead? false : true
}
let myLibrary = [];

function addToLibrary(book){
    myLibrary.push(book);
}


const book1 = new Book("The Hobbit", 295, "J.R.R. Tolkien", true);
const book2 = new Book("Atomic Habits", 435, "James Clear");
const book3 = new Book("It Ends with Us", 598, "Colleen Hoover", true);


addToLibrary(book1);
addToLibrary(book2);
addToLibrary(book3);

const allBooksDiv = document.querySelector('.all-books');

function viewBooks() {
    allBooksDiv.innerHTML = "";
    for (const book of myLibrary) {
        const bookDiv = document.createElement("div");
        let readStatus;
        if(book.isRead){ 
            readStatus = "Already Read!";
        }else{
            readStatus = "Not Read";
        }
        bookDiv.classList.add("book");
        bookDiv.innerHTML += `<h1>${book.title}</h1>
                        <p>${book.pages} pages</p>
                        <p>Author: ${book.author}</p>
                        <p>${readStatus}</p>
                        <button class="read-but" onclick="read(this)" data-book="${myLibrary.indexOf(book)}">Read</button>
                        <button class="remove-but" onclick="remove(this)" data-book="${myLibrary.indexOf(book)}">Remove</button>
                        `;

        allBooksDiv.appendChild(bookDiv);
    }
}

viewBooks();


const modal = document.querySelector(".modal");
const addBook = document.querySelector("#add-book")
const close = document.querySelector(".close");
close.addEventListener("click", ()=>{
    modal.style.display = "none";
})
addBook.addEventListener("click", ()=>{
    modal.style.display = "block";
})

const add = document.querySelector("#add");
const form = document.querySelector("form");

add.addEventListener("click", (evt) =>{
    evt.preventDefault();
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
    isRead = document.getElementsByName("#read").value;
    book = new Book(title, pages, author, isRead);
    addToLibrary(book);
    viewBooks();
    modal.style.display = "none";
    form.reset();
})

const read = (but) =>{
    bookIndex = but.getAttribute("data-book");
    book = myLibrary[bookIndex];
    book.read()
    viewBooks();
}

const remove = (but) =>{
    bookIndex = but.getAttribute("data-book");
    myLibrary = myLibrary.filter((item)=>{
        return item != myLibrary[bookIndex]
    })
    viewBooks();
}