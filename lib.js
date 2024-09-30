const myLibrary = [];
const deleteBtns = [];
const context = document.querySelector(".context");

class Book  {

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
    

    info() {

      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read it" : "not read yet"}`;
    }

    set index(index) {
      this._index = index;
    }

    set deleteButton(button) {
      this._deleteButton = button;
    };
    
    set readButton(button) {
      this._readButton = button;
    };
    
    get deleteButton() {
      return this._deleteButton;
    };
    get index() {
      return this._index;
    };
    
    get readButton() {
      return this._readButton;
    };

} 

// ADD BOOK UI

const newButton = document.getElementById("showDialog");
const addBookDialog = document.getElementById("addBookUI");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const cancelBtn = addBookDialog.querySelector("#cancelBtn");

newButton.addEventListener("click", () => {
  addBookDialog.showModal();
  processDialog()
});

addBookDialog.addEventListener("close", (e) => {
});

function checkTitle(title)
{
  let titleError = document.querySelector("#title + span.error");
  if (title.validity.valueMissing)
  {
    titleError.textContent = "Do not leave blank!"
  }
  else
  {
    titleError.textContent = ""
  }
}

function checkAuthor(author)
{
  let authorError = document.querySelector("#author + span.error");
  if (author.validity.valueMissing)
  {
    authorError.textContent = "Do not leave blank!"
  }
  else
  {
    authorError.textContent = ""
  }
}

function checkPages(pages)
{
  let pagesError = document.querySelector("#pages + span.error");
  console.log(pages.validity)
  if (pages.validity.badInput)
  {
    pagesError.textContent = "Please enter a valid number!"
  }
  else if (pages.validity.valueMissing)
  {
    pagesError.textContent = "Please enter the number of pages in the book!"
  }
  else
  {
    pagesError.textContent = ""
  }
}

function processDialog()
{
  let title = document.getElementById("title")
  let author = document.getElementById("author")
  let pages = document.getElementById("pages")
  let read = document.getElementById("read")

  title.addEventListener("input", function() {
    checkTitle(title)
  });

  author.addEventListener("input", function() {
    checkAuthor(author)
  });

  pages.addEventListener("input", function() {
    checkPages(pages)
  });


  confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    let titleValue = title.value;
    let authorValue = author.value;
    let pagesValue = pages.value;
    let readValue = read.checked;

    console.log(title.validity.valid)
    if (!title.validity.valid || 
      !author.validity.valid ||
      !pages.validity.valid
    )
    {
      checkTitle(title)
      checkAuthor(author)
      checkPages(pages)
      return;
    }
  
  
    let newBook = new Book(titleValue, authorValue, pagesValue, readValue);
    
    myLibrary.push(newBook);
    newBook.index = myLibrary.length-1;
  
    addBookToUI(myLibrary);
  });

  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookDialog.close();
  });
  
  
}



function addBookToUI(library)
{
  let card = document.createElement("div");
  let cardInfo = document.createElement("p");
  let deleteBtn = document.createElement("button");
  let readBtn = document.createElement("button");

  library[library.length-1].deleteButton = deleteBtn;
  library[library.length-1].readButton = readBtn;

  deleteBtn.onclick = function(){

    let temp = 0;
    for (let i = 0; i < library.length; i++)
    {
      if (library[i].deleteButton === deleteBtn)
      {
        console.log(`library[i].index: ${library[i].index}`);
        library.splice(library[i].index, 1);
        temp = i;
        break;
      }
    }

    for (let i = 0; i < library.length; i++)
    {
      console.log(`${library[i].index}: ${library[i].info()}`);
    }

    for (; temp < library.length; temp++)
    {
      library[temp].index -= 1;
    }

    card.remove();

    for (let i = 0; i < library.length; i++)
    {
      console.log(`${library[i].index}: ${library[i].info()}`);
    }
    
  };

  readBtn.onclick = function(){

    for (let i = 0; i < library.length; i++)
    {
      if (library[i].readButton === readBtn)
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

  console.log(library[library.length-1].index);


}
