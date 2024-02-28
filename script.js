// ------- button  ------------ //
document.querySelector("#book").addEventListener("click",
function(){
    document.querySelector(".book__form").classList.add("active")
});
document.querySelector(".book__form .close-btnF").addEventListener("click",
function(){
    document.querySelector(".book__form").classList.remove("active");
});

// main

const library = document.querySelector('.library');
const myLibrary = [];

const defaultBook = new Book('Name', 'The Great Author', 1337, 1);
myLibrary.push(defaultBook)
//manual book for example

function publishBook(array) {
    library.innerHTML = '';

    for (i = 0; i < array.length; i++){
    //creating new book card
        const newBook = document.createElement('div'); // create div
        newBook.classList.add('book__card');//add book__card class
        library.appendChild(newBook);

    // adding close button
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn')
        closeBtn.textContent = 'x'
        newBook.appendChild(closeBtn)
    

    // titel, author and pages elements created, filled with according value 
    // and added to book card 
        const title = document.createElement('h3');
        title.textContent = `${array[i].title}`;
        newBook.appendChild(title);
        
        const author = document.createElement('p');
        author.textContent = `${array[i].author}`;
        newBook.appendChild(author);
        
        const pages = document.createElement('p');
        pages.textContent = `${array[i].pages}`;
        newBook.appendChild(pages);
        
    // Status check (read or not)
        const statusWrap = document.createElement('div');
        statusWrap.classList.add('read');
        newBook.appendChild(statusWrap);
        const statusText = document.createElement('h5');
        statusText.textContent = 'Status';
        statusWrap.appendChild(statusText);

        const statusCheck = document.createElement('h2');
        statusCheck.classList.add('status')
        if (array[i].status == 1){
            statusCheck.innerHTML = '&#10003'
        }else{
            statusCheck.innerHTML = '&#10008'
        };
        statusWrap.appendChild(statusCheck);

        closeBtn.addEventListener('click', removeBook(i));

        statusCheck.addEventListener('click', statusChange(i));
    }
}

function removeBook(index) {
    return function() {
        myLibrary.splice(index, 1);
        publishBook(myLibrary);
    };
}

function statusChange(index) {
    return function() {
        myLibrary[index].status = myLibrary[index].status === 1 ? 2 : 1;
        publishBook(myLibrary);
    };
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function checkRadioStatus() {
    const radios = document.getElementsByName('read');
    for (i = 0; i < radios.length; i++){
        if (radios[i].checked){
                return radios[i].value;
        }
    }
}

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const status = checkRadioStatus();
    const newBook = new Book(title, author, pages, status)
    myLibrary.push(newBook)
}


const bookForm = document.querySelector(".book__form");

bookForm.addEventListener('submit', function(event){
    event.preventDefault();
    addBookToLibrary();
    
    document.querySelector(".book__form").classList.remove("active");
    publishBook(myLibrary);
})



publishBook(myLibrary)
