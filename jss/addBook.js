function checkUniqueId() {
    const inputId = parseInt(document.getElementById("bookID").value);

    // Retrieve existing books from localStorage
    const retrievedString = localStorage.getItem('books');
    const myBooks = new Map(JSON.parse(retrievedString) || []);

    let isUnique = true;
    myBooks.forEach((booksInCategory) => {
        booksInCategory.forEach((book) => {
            if (book.ID === inputId) {
                isUnique = false;
            }
        });
    });

    const idWarning = document.getElementById("idWarning");
    if (!isUnique) {
        idWarning.textContent = "ID is not unique";
    } else {
        idWarning.textContent = "";
    }
}
var currentUserIndex = localStorage.getItem('currentUserIndex');

function addBook() {
    if(currentUserIndex==='-1')
    {
        alert("Please login first!");
        return ;
    }
    const retrievedString = localStorage.getItem('books');
    const myBooks = new Map(JSON.parse(retrievedString) || []);

    const newBook = {
        title: document.getElementById("bookTitle").value,
        ID: parseInt(document.getElementById("bookID").value),
        year: parseInt(document.getElementById("bookYear").value),
        author: document.getElementById("Author").value,
        category: document.getElementById("Category").value,
        price: parseFloat(document.getElementById("price").value),
        description: document.getElementById("description").value,
        flag: document.getElementById("isAvailable").checked,
        isFavourite: false,
        isBorrowed: false
    };

    let isUnique = true;
    myBooks.forEach((booksInCategory) => {
        booksInCategory.forEach((book) => {
            if (book.ID === newBook.ID) {
                isUnique = false;
            }
        });
    });

    if (!isUnique) {
        alert("ID is not unique. Please enter a unique ID.");
        return;
    }

    const fileInput = document.getElementById('imageUpload');
    const imageFile = fileInput.files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            newBook.image = event.target.result;
            saveBook(newBook, myBooks);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveBook(newBook, myBooks);
    }
}

function saveBook(newBook, myBooks) {
    if (!myBooks.has(newBook.category)) {
        myBooks.set(newBook.category, []);
    }
    myBooks.get(newBook.category).push(newBook);

    if (!myBooks.has('Recently')) {
        myBooks.set('Recently', []);
    }
    const recentlyBooks = myBooks.get('Recently');
    recentlyBooks.push(newBook);

    if (recentlyBooks.length > 10) {
        recentlyBooks.shift();
    }

    localStorage.setItem('books', JSON.stringify(Array.from(myBooks.entries())));
    window.location.href = 'all-books.html'; // Assuming lowercase file name for consistency
}
