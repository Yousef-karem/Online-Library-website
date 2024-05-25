// var login=localStorage.getItem('currentUserIndex')!=-1;
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


