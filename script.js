// Array to hold the books
let books = [];

// Function to render the book catalog
function renderBooks() {
  const catalog = document.getElementById("book-catalog");
  catalog.innerHTML = ""; // Clear the catalog

  books.forEach((book, index) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-item";
    bookItem.innerHTML = `
            <img src="${book.cover}" alt="${
      book.title
    } Cover" style="width:100px; height:auto;">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <span class="status">${book.read ? "Read" : "Unread"}</span>
            <button onclick="toggleReadStatus(${index})">${
      book.read ? "Mark as Unread" : "Mark as Read"
    }</button>
            <button onclick="removeBook(${index})">Remove</button>
        `;
    catalog.appendChild(bookItem);
  });
  console.log(catalog.firstChild);

  if (!catalog.firstChild) {
    // catalog.style.gridTemplateColumns = "1fr";
    // catalog.style.textAlign = "center";
    catalog.innerHTML = `<p>There is no added books</p>`;
  }
}

// Function to add a new book
document.getElementById("add-button").addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const cover = document.getElementById("cover").value;

  if (title && author && cover) {
    books.push({ title, author, cover, read: false });
    renderBooks();
    clearInputFields();
  }
});

// Function to clear input fields
function clearInputFields() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("cover").value = "";
}

// Function to toggle read status
function toggleReadStatus(index) {
  books[index].read = !books[index].read;
  renderBooks();
}

// Function to remove a book
function removeBook(index) {
  books.splice(index, 1);
  renderBooks();
}

// Function to search for books
document.getElementById("search-button").addEventListener("click", () => {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchInput) ||
      book.author.toLowerCase().includes(searchInput)
  );

  const catalog = document.getElementById("book-catalog");
  catalog.innerHTML = ""; // Clear the catalog

  filteredBooks.forEach((book, index) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-item";
    bookItem.innerHTML = `
            <img src="${book.cover}" alt="${
      book.title
    } Cover" style="width:100px; height:auto;">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <span class="status">${book.read ? "Read" : "Unread"}</span>
            <button onclick="toggleReadStatus(${index})">${
      book.read ? "Mark as Unread" : "Mark as Read"
    }</button>
            <button onclick="removeBook(${index})">Remove</button>
        `;
    catalog.appendChild(bookItem);
  });
});
