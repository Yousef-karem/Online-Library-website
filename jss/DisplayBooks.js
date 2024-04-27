// Retrieve books from localStorage and parse them into a Map
let retrievedString = localStorage.getItem("books");
let myBooks = new Map(JSON.parse(retrievedString));
var currentUserIndex = localStorage.getItem('currentUserIndex');
// Function to update localStorage with the modified book map
function updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(Array.from(myBooks.entries())));
}
// Display books from the map
function displayBooks()
{
const bookCatalogDiv = document.getElementById("bookCatalog");
bookCatalogDiv.innerHTML = '';
    myBooks.forEach((books, category) => {
        if(myBooks.get(category).length === 0)
        {
            myBooks.delete(category);
            updateLocalStorage();
        }
        else
        {
            let categoryDiv = document.createElement('div');
    categoryDiv.classList.add("book");
    categoryDiv.innerHTML = `<h2>${category}</h2>`;
    let outerfram = document.createElement('div');
    outerfram.classList.add('outerfram');
    books.forEach(book => {
        let innerfram = document.createElement('div');
        innerfram.classList.add('innerfram');
        let availabilityText = !book.flag ? 'Unavailable' : 'Available';
        let availabilityClass = !book.flag ? 'unavailable' : 'availability';
        innerfram.innerHTML = `
            <div class="top">
                <div class="favbutton"> </div>
                <div class="imgbook"><image src=${book.image}></image></div>
                <div class="book_info">
                    <h2>${book.title}</h2>
                    <p>Author: ${book.author}</p>
                    <p>Year: ${book.year}</p>
                    <p>Price: ${book.price}$</p>
                    <p>Availability: <span class="${availabilityClass}">${availabilityText}</span></p>
                </div>
            </div>
            <div class="bottom"> 
                <button class="EditButton"><i class="fas fa-pencil-alt"></i> Edit</button>
                <button class="DeleteButton"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
        `;
        // Attach event listener to the delete button
        let DeleteButton = innerfram.querySelector('.DeleteButton');
        DeleteButton.addEventListener('click', () => {
            if(currentUserIndex==='-1')
            {
                alert("Please login first!");
                return ;
            }
            // Remove the book from the array
            let bookIndex = books.findIndex(b => b.id === book.id);
            if (bookIndex !== -1) {
                books.splice(bookIndex, 1);
                // Update localStorage and refresh display
                updateLocalStorage();
                outerfram.removeChild(innerfram);
                if(books.length==0)
                {
                    bookCatalogDiv.appendChild(categoryDiv);
                }
            }
        });
        let EditButton = innerfram.querySelector('.EditButton');
        EditButton.addEventListener('click', () => {
            outerfram.style="height:80vh;";
            if(currentUserIndex==='-1')
            {
                alert("Please login first!");
                return ;
            }
            // Create a form for editing the book details
            const editForm = document.createElement('form');
            editForm.setAttribute("id", "editForm");
            editForm.innerHTML = `
                <div id="edit">
                <div class="line">
                <label for="editTitle">Title:</label>
                <input type="text" id="editTitle" name="editTitle" value="${book.title}">
                </div>
                <br><br>
                <div class="line">
                <label for="editAuthor">Author:</label>
                <input type="text" id="editAuthor" name="editAuthor" value="${book.author}">
                </div>
                <br><br>
                <div class="line">
                <label for="editYear">Year:</label>
                <input type="text" id="editYear" name="editYear" value="${book.year}">
                </div>
                <br><br>
                <div class="line">
                <label for="editPrice">Price:</label>
                <input type="text" id="editPrice" name="editPrice" value="${book.price}">
                </div>
                <br><br>
                <div class="line">
                <input type="checkbox" id="editAvailable" name="editAvailable" ${book.flag ? 'checked' : ''}>
                <label for="editAvailable">Available</label>
                </div>
                <br><br>
                <div class="line">
                <label for="editImage">Image:</label>
                <input type="file" id="editImage" name="editImage" accept="image/*">
                </div>
                <br><br>
                <label for="editDescription" id ="Des">Description:</label>
                <br><br>
                <textarea id="editDescription" name="editDescription">${book.description}</textarea>
                <br><br>
                <div class="line">
                <button type="submit">Save Changes</button>
                <button type="button" class="cancelEdit">Cancel</button>
                </div>
                </div>
            `;
            // Replace the book details with the edit form
            innerfram.innerHTML = '';
            innerfram.appendChild(editForm);
        
            // Handle form submission
            editForm.addEventListener('submit', (event) => {
                event.preventDefault();
                if(currentUserIndex==='-1')
                {
                    alert("Please login first!");
                    return ;
                }
                // Get the edited values from the form
                const editedTitle = editForm.elements['editTitle'].value;
                const editedAuthor = editForm.elements['editAuthor'].value;
                const editedYear = editForm.elements['editYear'].value;
                const editedPrice = editForm.elements['editPrice'].value;
                const editedDescription = editForm.elements['editDescription'].value;
                const editedAvailable = editForm.elements['editAvailable'].checked;
                const rec=myBooks.get("Recently");
                // Handle image upload
                let fileInput = editForm.querySelector('#editImage');
                let imageFile = fileInput.files[0]; // Get the first selected file
                let editedImage = book.image; // Default to the current image
                if (imageFile) {
                    // Create a FileReader object to read the image file
                    let reader = new FileReader();
                    reader.onload = function(event) {
                        // Set the edited image data (base64 encoded)
                        editedImage = event.target.result;
        
                        // Update the book details in the data structure (Map)
                        book.title = editedTitle;
                        book.author = editedAuthor;
                        book.year = editedYear;
                        book.price = editedPrice;
                        book.description = editedDescription;
                        book.flag = editedAvailable;
                        book.image = editedImage;
                        myBooks.forEach((books, category) => {
                            books.forEach(B=>
                            {
                                if(B.ID==book.ID)
                                {
                                    B.title = editedTitle;
                                    B.author = editedAuthor;
                                    B.year = editedYear;
                                    B.price = editedPrice;
                                    B.description = editedDescription;
                                    B.flag = editedAvailable;
                                    B.image = editedImage;
                                }
                            });
                        });
                        // Update localStorage and refresh display
                        updateLocalStorage();
                        displayBooks(); // Assuming you have a function to refresh the display of books
                    };
                    // Read the image file as a data URL
                    reader.readAsDataURL(imageFile);
                } else {
                    // Update the book details in the data structure (Map) without changing the image
                    book.title = editedTitle;
                    book.author = editedAuthor;
                    book.year = editedYear;
                    book.price = editedPrice;
                    book.description = editedDescription;
                    book.flag = editedAvailable;
                    
                    myBooks.forEach((books, category) => {
                        books.forEach(B=>
                        {
                            if(B.ID==book.ID)
                            {
                                B.title = editedTitle;
                                B.author = editedAuthor;
                                B.year = editedYear;
                                B.price = editedPrice;
                                B.description = editedDescription;
                                B.flag = editedAvailable;
                                B.image = editedImage;
                            }
                        });
                    });
                    // Update localStorage and refresh display
                    updateLocalStorage();
                    displayBooks(); // Assuming you have a function to refresh the display of books
                }
            });
        
            // Handle cancel button click
            const cancelButton = editForm.querySelector('.cancelEdit');
            cancelButton.addEventListener('click', () => {
                // Refresh the display without making any changes
                displayBooks();
            });
        });

        outerfram.appendChild(innerfram);
    });
    categoryDiv.appendChild(outerfram);
    bookCatalogDiv.appendChild(categoryDiv);
        }
    
});
}
displayBooks();