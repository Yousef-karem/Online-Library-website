/*  const Allbooks=[
    {
      title:"Most Popular",
      books:[
        {
          title:"REMARKABLE BOOKS",
          year:"2017",
          author:"Dorling Kindersley",
          category:"Historical",
          price:"20$",
          image:"Images/img1.jpg",
          flag:0
        },
        {
          title:"MATH ADVENTURES WITH PYTHON",
          year:"2019",
          author:"Peter Farrell",
          category:"Mathematics - Computational",
          price:"28.9$",
          image:"Images/img2.jpg",
          flag:1
        },
        {
          title:"THE ADVENTURES OF TINTIN",
          year:"2003",
          author:"Hergé",
          category:"Adventures",
          price:"36.9$",
          image:"Images/img3.jpg",
          flag:1
        },
        {
          title:"THINGS HAVE GOTTEN WORSE",
          year:"2021",
          author:"Eric LaRocca",
          category:"Fiction - Horror",
          price:"19.8$",
          image:"Images/img4.jpg",
          flag:1

        },
        {
          title:"KILLING HOPE",
          year:"2003",
          author:"William Blum",
          category:"Society, Politics & Philosophy",
          price:"48$",
          image:"Images/img5.jpg",
          flag:1

        },
        {
          title:"INTRODUCTION TO PHILOSOPHY SCIENCE",
          year:"2001",
          author:"John Losee",
          category:"Society, Politics & Philosophy",
          price:"19.6$",
          image:"Images/img6.jpg",
          flag:1

        },
        {
          title:"ALICE IN WONDERLAND",
          year:"2019",
          author:"Carroll Lewis",
          category:"Society, Politics & Philosophy",
          price:"40$",
          image:"Images/img7.jpg",
          flag:0
        },
        {
          title:"FLIPPED",
          year:"2011",
          author:"Wendelin Van Draanen",
          category:"Fiction",
          price:"40$",
          image:"Images/img8.jpg",
          flag:0
        },
        {
          title:"CORALINE GRAPHIC NOVEL",
          year:"2008",
          author:"Neil Gaiman",
          category:"Children's Books - Science Fiction",
          price:"30$",
          image:"Images/img9.jpg",
          flag:1
        },
        {
          title:"WEAPON",
          year:"2007",
          author:"Roger Ford",
          category:"Historical",
          price:"34$",
          image:"Images/img10.jpg",
          flag:1
        }
      ]
    },
    {
      title:"Historical",
      books:[
        {
          title:"REMARKABLE BOOKS",
          year:"2017",
          author:"Dorling Kindersley",
          category:"Historical",
          price:"20$",
          image:"Images/img1.jpg",
          flag:0
        },
        { title:"WEAPON",
        year:"2007",
        author:"Roger Ford",
        category:"Historical",
        price:"34$",
        image:"Images/img10.jpg",
        flag:1
        },
        {
          title:"Doctor Zhivago",
          year:"1957",
          author:"Roger Ford",
          category:"Historical",
          price:"39$",
          image:"Images/img15.jpg",
          flag:1
        },
        {
          title:"The turn of the screw",
          year:"1898",
          author:"Henry jems",
          category:"Historical",
          price:"19&",
          image:"Images/img16.jpg",
          flag:0
        },
        {
          title:"Emma",
          year:"1815",
          author:"Jane Austen",
          category:"Historical",
          price:"20&",
          image:"Images/img17.jpg",
          flag:0
        },
      ],
    },
    {
      title:"Society, Politics & Philosophy",
      books:[
        {
          title:"INTRODUCTION to PHILOSOPHY SCIENCE",
          year:"2001",
          author:"John Losee",
          category:"Society, Politics & Philosophy",
          price:"19.6$",
          image:"Images/img6.jpg",
          flag:0
        },
        {
          title:"KILLING HOPE",
          year:"2003",
          author:"William Blum",
          category:"Society, Politics & Philosophy",
          price:"48$",
          image:"Images/img5.jpg",
          flag:0
        },
        {
          title:"ALICE IN WONDERLAND",
          year:"2019",
          author:"Carroll Lewis",
          category:"Society, Politics & Philosophy",
          price:"40$",
          image:"Images/img7.jpg",
          flag:0
        },
        {
          title:"Philosophy, Politics and Society",
          year:"1972",
          author:"Barnes & Noble",
          category:"Society, Politics & Philosophy",
          price:"50$",
          image:"Images/img11.jpeg",
          flag:1

        },
        {
          title:"Political Philosophy of International Relations",
          year:"2016",
          author:"Michael Oakeshott",
          category:"Society, Politics & Philosophy",
          price:"56$",
          image:"Images/img12.png",
          flag:1
        },
        {
          title:"Russian Political Philosophy",
          year:"2022",
          author:"Evert van",
          category:"Society, Politics & Philosophy",
          price:"27$",
          image:"Images/img13.jpeg",
          flag:1
        },
        {
          title:" A critique of political economy",
          year:"1867",
          author:"Karl Marx",
          category:"Society, Politics & Philosophy",
          price:"27$",
          image:"Images/img14.jpg",
          flag:1
        }
      ]
    }
  ];
  
 //  adding books to favorites
function addToFavorites(book) {
  // Retrieve existing favorites from local storage or initialize an empty array
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  // Add the selected book to favorites if it's not already there
  if (!favorites.some(fav => fav.title === book.title)) {
      favorites.push(book);
      // Update local storage
      localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
function addtoBorrowList(book){
  let borrowBook=JSON.parse(localStorage.getItem('borrowBook'))||[];
  if(!borrowBook.some(borrowBooks=>borrowBooks.title==book.title)){
      borrowBook.push(book);
      localStorage.setItem('borrowBook',JSON.stringify(borrowBook));
  }
}
/*<!------------------------->*/
function addToBorrowListPage(book) {
  // Retrieve existing borrowed books from local storage or initialize an empty array
  let borrowBooks = JSON.parse(localStorage.getItem('borrowBooks')) || [];

  // Add the selected book to borrowed books if it's not already there
  if (!borrowBooks.some(borrowBook => borrowBook.title === book.title)) {
      borrowBooks.push(book);
      // Update local storage
      localStorage.setItem('borrowBooks', JSON.stringify(borrowBooks));
  }
}

function createBook(bookframe) {
  const framediv = document.createElement("div");
  framediv.classList.add("book");

  const titleH1 = document.createElement("h1");
  titleH1.textContent = bookframe.title;
  framediv.appendChild(titleH1);

  const outerFrameDiv = document.createElement("div");
  outerFrameDiv.classList.add("outerfram");
  framediv.appendChild(outerFrameDiv);

  for (const book of bookframe.books) {
      const innerFrameDiv = document.createElement("div");
      innerFrameDiv.classList.add("innerfram");
      outerFrameDiv.appendChild(innerFrameDiv);

      const topDiv = document.createElement("div");
      topDiv.classList.add("top");
      innerFrameDiv.appendChild(topDiv);

      const heartdiv=document.createElement("div");
    heartdiv.classList.add("favbutton");
    topDiv.appendChild(heartdiv);
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("imgbook");
      const image = new Image();
      image.src = book.image;
      image.height = 200;
      imageDiv.appendChild(image);
      topDiv.appendChild(imageDiv);

      const bookInfoDiv = document.createElement("div");
      bookInfoDiv.classList.add("book_info");
      topDiv.appendChild(bookInfoDiv);

    const bookTitleH2 = document.createElement("h2");
      bookTitleH2.textContent = book.title;
      bookInfoDiv.appendChild(bookTitleH2);

      const bookYear = document.createElement("p");
      bookYear.classList.add("year");
      bookYear.textContent = `${book.year}`;
      bookInfoDiv.appendChild(bookYear);

      const bookAuthor = document.createElement("p");
      bookAuthor.classList.add("author");
      bookAuthor.textContent = `${book.author}`;
      bookInfoDiv.appendChild(bookAuthor);

      const bookCategory = document.createElement("p");
      bookCategory.classList.add("category");
      bookCategory.textContent = book.category;
      bookInfoDiv.appendChild(bookCategory);

      const bookPrice = document.createElement("p");
      bookPrice.classList.add("price");
      bookPrice.textContent = `${book.price}`;
      bookInfoDiv.appendChild(bookPrice);

      const bottomDiv = document.createElement("div");
      bottomDiv.classList.add("bottom");
      innerFrameDiv.appendChild(bottomDiv);

      if (book.flag === 0) {
          const unavailableLabel = document.createElement("label");
          unavailableLabel.htmlFor = "Not";
          const delText = document.createElement("p");
          delText.innerHTML = `<del><strong>Available</strong></del>`;
          unavailableLabel.appendChild(delText);
          topDiv.appendChild(unavailableLabel);
      } else {
          const borrowButton = document.createElement("button");
          borrowButton.textContent = "Borrow";
          borrowButton.addEventListener("click", () => {
              addtoBorrowList(book);
              addToBorrowListPage(book);
              alert("Book added to Borrow list!");
          });
          bottomDiv.appendChild(borrowButton);

          const buyButton = document.createElement("button");
          buyButton.textContent = "Buy";
          bottomDiv.appendChild(buyButton);
      }

      const detailsButton = document.createElement("button");
      detailsButton.textContent = "More Details";
      bottomDiv.appendChild(detailsButton);

      const heartButton = document.createElement("button");
      const heartIcon = document.createElement("i");
      heartIcon.classList.add("fa-solid", "fa-heart");
      heartButton.id = "favbook";
      heartButton.appendChild(heartIcon);
      heartButton.addEventListener("click", () => {
          addToFavorites(book);
          alert("Book added to Favourite!");
      });
      heartdiv.appendChild(heartButton);
  }

  return framediv;
}

const container = document.getElementById("books");
for (const bookframe of Allbooks) {
  const framediv = createBook(bookframe);
  container.appendChild(framediv);
}
/*<!----------------------------->*/
