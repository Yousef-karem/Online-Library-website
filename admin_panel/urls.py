from django.urls import path
from . import views

urlpatterns = [
    path('signin/', views.signin, name='signinAdmin'),
    path('signup/', views.signup, name='signupAdmin'),
    path('signout/', views.signout, name='signoutAdmin'),
    path('Books/',views.DisplayBooks,name='BooksAdmin'),
    path('Add/',views.AddBook,name='AddBook'),
    path('admin/EditBook/<int:book_id>/', views.EditBook, name='EditBook'),
    path('admin/DeleteBook/<int:book_id>/', views.DeleteBook, name='DeleteBook'),
    path('Admin/EditUser/<int:user_id>/', views.EditUser, name='EditUser'),
    path('Home/', views.Home, name='HomeAdmin'),
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),
    path('search/', views.SearchBooksAdmin, name='SearchBooksAdmin'),

]
