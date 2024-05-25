from django.urls import path
from . import views
urlpatterns = [
    path('signin/', views.signin, name='signinStudent'),
    path('signup/', views.signup, name='signupStudent'),
    path('signout/', views.signout, name='signoutStudent'),
    path('Home/', views.Home, name='HomeStudent'),
    path('Books/', views.DisplayBooks, name='BooksStudent'),
    path('borrow/<int:book_id>/', views.borrow_book, name='borrowBook'),
    path('favorite/<int:book_id>/', views.favorite_book, name='favoriteBook'),
    path('favorite-list', views.DisplayFavorite, name='favoriteList'),
    path('borrow-list', views.DisplayBorrow, name='borrowList'),
    path('Student/EditUser/<int:user_id>/', views.EditUserStudent, name='EditUserStudent'),
    path('search/', views.SearchBooks, name='SearchBooks'),
    path('book/<int:book_id>/', views.BookDetails, name='BooksDetails'),
]
