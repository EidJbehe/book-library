let books = [];

// Function to render the book catalog
function renderBooks() {
  const catalog = document.getElementById("book-catalog");
  catalog.innerHTML = ""; // Clear the catalog

  if (books.length === 0) {
    catalog.innerHTML = `<p class="no-books-message">There are no books in your library yet!</p>`;
    return;
  }

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
      <button onclick="confirmRemoveBook(${index})">Remove</button>
    `;

    // Animate the new book
    bookItem.style.opacity = 0;
    setTimeout(() => {
      bookItem.style.opacity = 1;
    }, 100);

    catalog.appendChild(bookItem);
  });
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

    // Show success message
    showAlert("Book added successfully!", "success");
  } else {
    showAlert("Please fill all the fields!", "error");
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

  // Show status change message
  showAlert("Book status updated!", "info");
}

// Function to confirm removal of a book
function confirmRemoveBook(index) {
  const confirmAction = confirm("Are you sure you want to remove this book?");
  if (confirmAction) {
    removeBook(index);
  }
}

// Function to remove a book
function removeBook(index) {
  books.splice(index, 1);
  renderBooks();

  // Show success message
  showAlert("Book removed successfully!", "success");
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

  if (filteredBooks.length === 0) {
    catalog.innerHTML = `<p class="no-books-message">No books match your search criteria.</p>`;
    return;
  }

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
      <button onclick="confirmRemoveBook(${index})">Remove</button>
    `;
    catalog.appendChild(bookItem);
  });
});

// Function to show alerts
function showAlert(message, type) {
  const alertBox = document.createElement("div");
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = message;

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.style.opacity = 0;
    setTimeout(() => alertBox.remove(), 500);
  }, 2000);
}
