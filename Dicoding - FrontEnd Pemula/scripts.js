const bookShelf = [];

const STORAGE_KEY = "bookShelf";


function saveBookShelf() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookShelf));
}


function loadBookShelf() {
  const storedBookShelf = localStorage.getItem(STORAGE_KEY);
  if (storedBookShelf) {
    bookShelf.length = 0;
    const parsedBookShelf = JSON.parse(storedBookShelf);
    bookShelf.push(...parsedBookShelf);
  }
  ShowData(bookShelf)
}

function updateLocalStorage() {
  saveBookShelf();
}


function generateId() {
  return +new Date();
}

function generateBook(id, title, author, year, isComplete) {
  year = parseInt(year, 10);
  return { id, title, author, year, isComplete };
}

function findBookIndex(bookId) {
  return bookShelf.findIndex((book) => book.id === bookId);
}

function findBookTitle() {
  const findBookInput = document.getElementById("find-book");
  const findBook = findBookInput.value.trim().toLowerCase();


  const foundBooks = bookShelf.filter((book) => book.title.toLowerCase().includes(findBook));
  if (foundBooks.length === 0) {
    alert("Tidak Ada Buku yang Cocok");
    ShowData(bookShelf);
    return;
  }

  ShowData(foundBooks);
}

function deleteBook(bookId) {
  const bookIndex = findBookIndex(bookId);

  if (bookIndex !== -1) {
    bookShelf.splice(bookIndex, 1);
    ShowData(bookShelf);
  }
  updateLocalStorage()
}

function addBookToComplete(bookId) {
  const bookIndex = findBookIndex(bookId);

  if (bookIndex !== -1) {
    bookShelf[bookIndex].isComplete = !bookShelf[bookIndex].isComplete;
    ShowData(bookShelf);
  }
  updateLocalStorage()
}

function addBook() {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const timestampInput = document.getElementById("date");
  
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const timestamp = timestampInput.value.trim();

  if (!title || !author || !timestamp) {
    alert("Isi semua detail buku!!");
    return;
  }

  const generatedID = generateId();
  const year = parseInt(timestamp, 10);
  const book = generateBook(generatedID, title, author, year, false);
  bookShelf.push(book);
  ShowData(bookShelf);


  titleInput.value = "";
  authorInput.value = "";
  timestampInput.value = "";
  updateLocalStorage()
}

function createBookRow(index, book) {
  const newBookRow = document.createElement("tr");

  const newBookId = document.createElement("td");
  newBookId.textContent = index + 1;
  newBookRow.appendChild(newBookId);

  const newBookName = document.createElement("td");
  newBookName.textContent = book.title;
  newBookRow.appendChild(newBookName);

  const newBookAuthor = document.createElement("td");
  newBookAuthor.textContent = book.author;
  newBookRow.appendChild(newBookAuthor);

  const newBookTimestamp = document.createElement("td");
  newBookTimestamp.textContent = book.year;
  newBookRow.appendChild(newBookTimestamp);

  const newBookAction = document.createElement("td");

  const newBookReadButton = document.createElement("button");
  newBookReadButton.className = "btn btn-primary";
  newBookReadButton.innerHTML = book.isComplete ? "Kembali Membaca" : "Selesai Membaca";
  newBookReadButton.addEventListener("click", () => addBookToComplete(book.id));
  newBookAction.appendChild(newBookReadButton);

  const newBookEditButton = document.createElement("button");
  newBookEditButton.className = "btn btn-success";
  newBookEditButton.innerHTML = "Edit Buku";
  newBookEditButton.setAttribute("data-bs-target", "#modalEdit");
  newBookEditButton.setAttribute("data-bs-toggle", "modal");
  newBookEditButton.addEventListener("click", () => openEditModal(book.id));
  newBookAction.appendChild(newBookEditButton);

  const newBookDeleteButton = document.createElement("button");
  newBookDeleteButton.className = "btn btn-danger";
  newBookDeleteButton.innerHTML = "Hapus Buku";
  newBookDeleteButton.addEventListener("click", () => {
  const deleteConfirmationModal = new bootstrap.Modal(document.getElementById("deleteConfirmationModal"));
  const confirmDeleteButton = document.getElementById("confirmDeleteButton");

  confirmDeleteButton.addEventListener("click", () => {
    deleteConfirmationModal.hide(); 
    deleteBook(book.id);
    });

  deleteConfirmationModal.show();
  });

  newBookAction.appendChild(newBookDeleteButton);

  newBookRow.appendChild(newBookAction);
  return newBookRow;
}

function openEditModal(bookId, index) {
  const bookIndex = findBookIndex(bookId);
  if (bookIndex === -1) return;

  const editTitleInput = document.getElementById("edit-title");
  const editAuthorInput = document.getElementById("edit-author");
  const editTimestampInput = document.getElementById("edit-date");


  editTitleInput.value = bookShelf[bookIndex].title;
  editAuthorInput.value = bookShelf[bookIndex].author;
  editTimestampInput.value = bookShelf[bookIndex].year;

  const saveEditButton = document.getElementById("save-edit-button");

  saveEditButton.addEventListener("click", () => {
    const editedTitle = editTitleInput.value.trim();
    const editedAuthor = editAuthorInput.value.trim();
    const editedTimestamp = editTimestampInput.value.trim();

    if (!editedTitle || !editedAuthor || !editedTimestamp) {
      alert("Masukkan Semua Detail Buku!!");
      return;
    }

    bookShelf[bookIndex].title = editedTitle;
    bookShelf[bookIndex].author = editedAuthor;
    bookShelf[bookIndex].year = parseInt(editedTimestamp, 10);

    updateLocalStorage();

    location.reload();

  });

}



function ShowData(bookShelf) {
  const unreadBookTable = document.getElementById("unread-book").querySelector("tbody");
  const readBookTable = document.getElementById("readed-book").querySelector("tbody");

  unreadBookTable.innerHTML = "";
  readBookTable.innerHTML = "";

  for (let index = 0; index < bookShelf.length; index++) {
    const book = bookShelf[index];
    const newBookRow = createBookRow(index, book);

    if (book.isComplete) {
      readBookTable.appendChild(newBookRow);
    } else {
      unreadBookTable.appendChild(newBookRow);
    }
  }
}

const submitButton = document.getElementById("add-book-button");
submitButton.addEventListener("click", addBook);

const findButton = document.getElementById("find-book-button");
findButton.addEventListener("click", findBookTitle);

loadBookShelf();
