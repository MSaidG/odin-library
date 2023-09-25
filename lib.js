const myLibrary = [];
const context = document.querySelector(".context");

function Book (title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {

      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read it" : "not read yet"}`;
    };

    this.saveIndex = function(index) {
      this.index = index;
    };

    this.returnIndex = function() {
      
      return this.index;
    };

    this.saveDeleteButton = function(button) {
      this.deleteButton = button;
    };
    
    this.returnDeleteButton = function() {
      return this.deleteButton;
    };

    this.saveReadButton = function(button) {
      this.readButton = button;
    };
    
    this.returnReadButton = function() {
      return this.readButton;
    };

} 


// ADD BOOK UI

const newButton = document.getElementById("showDialog");
const addBookDialog = document.getElementById("addBookUI");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const cancelBtn = addBookDialog.querySelector("#cancelBtn");

cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookDialog.close();
});

newButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

addBookDialog.addEventListener("close", (e) => {
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let titleValue = document.getElementById("title").value;
  let authorValue = document.getElementById("author").value;
  let pagesValue = document.getElementById("pages").value;
  let readValue = document.getElementById("read").checked;

  if (titleValue === ""
    || authorValue === ""
    || pagesValue === "") return;


  let newBook = new Book(titleValue, authorValue, pagesValue, readValue);
  
  myLibrary.push(newBook);
  newBook.saveIndex(myLibrary.length-1);

  addBookToUI(myLibrary);



});

function addBookToUI(library)
{
  let card = document.createElement("div");
  let cardInfo = document.createElement("p");
  let deleteBtn = document.createElement("button");
  let readBtn = document.createElement("button");

  library[library.length-1].saveDeleteButton(deleteBtn);
  library[library.length-1].saveReadButton(readBtn);

  deleteBtn.onclick = function(){

    for (let i = 0; i < library.length; i++)
    {
      if (library[i].returnDeleteButton() === deleteBtn)
      {
        library.splice(library[i].returnIndex(), 1);
      }
    }

      card.remove();

      for (let i = 0; i < library.length; i++)
      {
        console.log(library[i].info());
      }
    
  };

  readBtn.onclick = function(){

    for (let i = 0; i < library.length; i++)
    {
      if (library[i].returnReadButton() === readBtn)
      {
        console.log(library[i].read);
        library[i].read = !library[i].read;
        cardInfo.textContent = library[i].info();
        console.log(library[i].info());

      }
    }



  };

  deleteBtn.textContent = "DELETE";
  readBtn.textContent = "READ";

  card.classList.add("card");
  cardInfo.textContent = library[library.length-1].info();
  card.appendChild(cardInfo);
  card.appendChild(deleteBtn);
  card.appendChild(readBtn);
  context.appendChild(card);

  console.log(library[library.length-1].returnIndex());


}
