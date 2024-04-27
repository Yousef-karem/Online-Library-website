
// Retrieve books from localStorage and parse them into a Map
let retrievedString = localStorage.getItem("books");
let myBooks = new Map(JSON.parse(retrievedString));

// Function to update localStorage with the modified book map
function updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(Array.from(myBooks.entries())));
}
var currentUserIndex = localStorage.getItem('currentUserIndex');
function displayBooks() {
    const bookCatalogDiv = document.getElementById("books");
    bookCatalogDiv.innerHTML = '';

    myBooks.forEach((books, category) => {
        let categoryDiv = document.createElement('div');
        categoryDiv.classList.add("book");
        categoryDiv.innerHTML = `<h2>${category}</h2>`;

        let outerfram = document.createElement('div');
        outerfram.classList.add('outerfram');
        let flag=0;
        books.forEach(book => {
            if(book.isFavourite == true){
                flag=1;
            let innerfram = document.createElement('div');
            innerfram.classList.add('innerfram');

            let availabilityText = !book.flag ? 'Unavailable' : 'Available';
            let availabilityClass = !book.flag ? 'unavailable' : 'availability';

            innerfram.innerHTML = `
                <div class="top">
                    <div class="favbutton"><button id="favbook")"><i class="fa-solid fa-heart"></i></button></div>
                    <div class="imgbook"><img src="${book.image}" alt="${book.title}"></div>
                    <div class="book_info">
                        <h2>${book.title}</h2>
                        <p id="author">Author: ${book.author}</p>
                        <p>Year: ${book.year}</p>
                        <p>Price: ${book.price}$</p>
                        <p>Availability: <span class="${availabilityClass}">${availabilityText}</span></p>
                    </div>
                </div>
                <div class="bottom">
                <button class="DeleteButton"><i class="fas fa-trash-alt"></i> Delete</button>
                    <button class="detailsButton"><i class="fas fa-info-circle"></i> More details</button>
                </div>
            `;
            let detailsButton = innerfram.querySelector('.detailsButton');
            detailsButton.addEventListener('click', () => {
                //const title = detailsButton.dataset.title;
                //const price = detailsButton.dataset.price;

                // Redirect to info-book.html and pass book details as URL parameters
                const urlParams = new URLSearchParams();
                urlParams.append("title", encodeURIComponent(book.title));
                urlParams.append("description", encodeURIComponent(book.description));
                //urlParams.append("image", encodeURIComponent(book.image));
                urlParams.append("price", encodeURIComponent(book.price));
                urlParams.append("year", encodeURIComponent(book.year));
                urlParams.append("category", encodeURIComponent(book.category));
                urlParams.append("author", encodeURIComponent(book.author));
                urlParams.append("ID", encodeURIComponent(book.ID));
                window.location.href = "info_book.html?" + urlParams.toString();;

            });
            let DeleteButton = innerfram.querySelector('.DeleteButton');
            DeleteButton.addEventListener('click', () => {
                if(currentUserIndex===-1)
                {
                    alert("Please login first!");
                    return ;
                }
                myBooks.forEach((books, category)=>
                {
                    books.forEach(b=>
                    {
                        if(b.ID===book.ID)
                        {
                            b.isFavourite=false;
                        }
                    })
                })
                // Update localStorage with the modified book map
                updateLocalStorage();
                displayBooks();
                window.location.href='favorite.html';
            });
            outerfram.appendChild(innerfram);
            }
        });
        if(flag===1)
        {
            categoryDiv.appendChild(outerfram);
        bookCatalogDiv.appendChild(categoryDiv);
    }
    });
}

// Initial display of books
displayBooks();
