    let myBooks = new Map();
  // Adding books
    let bs=
    [{ title: "REMARKABLE BOOKS",
        ID:1,
        year:2020,
        author:"Author1",
        category:"Most Popular",
        price:20,
        image :"Images/img1.jpg",
        isAvaliable:false,
        isFavorite:true,
        isBorrowed: false,
        description:"Description1",},
    {
        title:"REMARKABLE BOOKS",
        ID:2,
        year:"2017",
        author:"Dorling Kindersley",
        category:"Historical",
        price:"20$",
        image:"Images/img1.jpg",
        flag:0
    },
    {
        title:"MATH ADVENTURES WITH PYTHON",
        ID:3,
        year:"2019",
        author:"Peter Farrell",
        category:"Mathematics - Computational",
        price:"28.9$",
        image:"Images/img2.jpg",
        flag:1
    },
    {
        title:"THE ADVENTURES OF TINTIN",
        ID:4,
        year:"2003",
        author:"Hergé",
        category:"Adventures",
        price:"36.9$",
        image:"Images/img3.jpg",
        flag:1
    },
    {
        title:"THINGS HAVE GOTTEN WORSE",
        ID:5,
        year:"2021",
        author:"Eric LaRocca",
        category:"Fiction - Horror",
        price:"19.8$",
        image:"Images/img4.jpg",
        flag:1

    },
    {
        title:"KILLING HOPE",
        ID:6,
        year:"2003",
        author:"William Blum",
        category:"Society, Politics & Philosophy",
        price:"48$",
        image:"Images/img5.jpg",
        flag:1

    },
    {
        title:"INTRODUCTION TO PHILOSOPHY SCIENCE",
        ID:7,
        year:"2001",
        author:"John Losee",
        category:"Society, Politics & Philosophy",
        price:"19.6$",
        image:"Images/img6.jpg",
        flag:1

    },
    {
        title:"ALICE IN WONDERLAND",
        ID:8,
        year:"2019",
        author:"Carroll Lewis",
        category:"Society, Politics & Philosophy",
        price:"40$",
        image:"Images/img7.jpg",
        flag:0
    },
    {
        title:"FLIPPED",
        ID:9,
        year:"2011",
        author:"Wendelin Van Draanen",
        category:"Fiction",
        price:"40$",
        image:"Images/img8.jpg",
        flag:0
    },
    {
        title:"CORALINE GRAPHIC NOVEL",
        ID:10,
        year:"2008",
        author:"Neil Gaiman",
        category:"Children's Books - Science Fiction",
        price:"30$",
        image:"Images/img9.jpg",
        flag:1
    },
    {
        title:"WEAPON",
        ID:11,
        year:"2007",
        author:"Roger Ford",
        category:"Historical",
        price:"34$",
        image:"Images/img10.jpg",
        flag:1
    }]
    

    function addBook(book)
    {
        if (!myBooks.has(book.category)) {
            myBooks.set(book.category, []);
        }
        myBooks.get(book.category).push(book);
    }
    bs.forEach(book=>{
        addBook(book);
    });
let jsonString = JSON.stringify(Array.from(myBooks.entries()));
localStorage.setItem('books', jsonString);