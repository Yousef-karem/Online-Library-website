var login=localStorage.getItem('currentUserIndex')!=-1;
function editDetails() {
    if(!login)
        window.location.href = "login.html";
    else
        window.location.href = "edit-details.html";
}

function logout() {
    localStorage.setItem('currentUserIndex',-1);
    window.location.href = "login.html";
}
var users = JSON.parse(localStorage.getItem('users'));
var currentUserIndex = localStorage.getItem('currentUserIndex');
document.getElementById("navigation").innerHTML=`
<section>
    <nav>
    <div class="top-section">
        <div class="logoimg">
            <img src="Images/bknav1.jpg" alt="Logo">
        </div>
        <div id="user-info">
        <button onclick="editDetails()" class="user-btn">${((!login) ?"User":users[currentUserIndex].username)}</button>
        <button onclick="logout()" class="user-btn">${login?"Logout":"Login"}</button>
        </div>
    </div>

    <div class="bottom-section">
        <ul>
            <li><a href="admin-page.html" id="homeButton">Home</a></li>
            <li><a href="All-books.html">All Books</a></li>
            <li><a href="add-book.html">Add Book</a></li>
        </ul>
        
        <form action="info_book.html" method="GET">
            <label for="choose" style="color:white";>Search by</label>
            <select id="choose" name="choose">
                <option value="ID">ID</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="category">Category</option>
            </select>
            <input type="search" id="search" name="query" placeholder="Search">
            <button type="submit" style=" background-color:#3498db";>Search</button>
        </form>
    </div>
    </nav>
</section>
`;
document.getElementById("footer").innerHTML=`    <footer>
<div class="fotlogo">
    <i class='fas fa-book'></i></div>
<p class="copyr">&copy; 2024 My Website. All rights reserved.</p>
<!--        <p>Contact: contact@mywebsite.com</p>-->
<div class="loca">
    <i class="ourlocation">our locations</i>
    <i  id="location" class='fas fa-map-marker-alt' > Dokki</i>
    <i id="location" class='fas fa-map-marker-alt' > Cairo</i>
    <i  id="location" class='fas fa-map-marker-alt'> Alex</i>
</div>
<div class="phone">
    <i class="ournums"> Contact us</i>
    <i class='fas fa-phone' id="phlog"> 01#########</i>
    <i class='fas fa-phone' id="phlog"> 01#########</i>
    <i class='fas fa-phone' id="phlog"> 01#########</i>
</div>
<div class="about-us">
    <i class="aboutus">About us</i>
        <i class="Aus">Support policy</i>
        <i class="Aus">Careers</i>
        <i class="Aus">Terms And Conditions</i>
</div>
</footer>`;
