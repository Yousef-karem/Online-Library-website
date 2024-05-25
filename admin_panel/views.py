from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout
from .models import LibraryUser, Book
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.decorators import login_required
from .forms import BookForm, LibraryUserForm
from .decorators import admin_required
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.utils.http import urlsafe_base64_decode

UserModel = get_user_model()
def activate(request, uidb64, token):
    try:
        # Decode the user ID from base64
        uid = urlsafe_base64_decode(uidb64).decode()
        # Retrieve the user object using the decoded user ID
        user = UserModel.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
        # Handle exceptions if decoding fails or user does not exist
        user = None

    # Check if the user object exists and the token is valid
    if user is not None and default_token_generator.check_token(user, token):
        # Activate the user account and save
        user.is_active = True
        user.save()
        # Return a success message
        return HttpResponse('Your account has been activated successfully!')
    else:
        # Return an error message for invalid or expired token
        return HttpResponse('Activation link is invalid or has expired.')


def signin(request):
    if request.method == 'POST':
        username_or_email = request.POST.get('username')
        password = request.POST.get('password')

        user = LibraryUser.objects.filter(username=username_or_email).first()
        if not user:
            user = LibraryUser.objects.filter(email=username_or_email).first()
        
        if user and user.check_password(password):
            if not user.isAdmin:
                return render(request, 'loginAdmin.html', {'mesageSignin': 'Only admins allow to log in.'})
            if not user.is_active:
                return render(request, 'loginAdmin.html', {'mesageSignin': 'Please verify your email before logging in.'})
            login(request, user)
            return redirect('HomeAdmin')
        else:
            return render(request, 'loginAdmin.html', {'mesageSignin': 'Wrong Username / Email or Password'})
    return render(request, 'loginAdmin.html', {'mesageSignin': '', 'mesageSignup': ''})

def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        phoneNumber = request.POST.get('phoneNumber')
        email = request.POST.get('userEmail')
    
        if LibraryUser.objects.filter(email=email).exists():
            return render(request, 'loginAdmin.html', {'mesageSignup': 'Email is already in use', 'mesageSignin': ''})
        if LibraryUser.objects.filter(username=username).exists():
            return render(request, 'loginAdmin.html', {'mesageSignup': 'Username '+ str(username) +' is already taken try another one.', 'mesageSignin': ''})
        try:
            validate_password(password)
        except ValidationError as e:
            return render(request, 'loginAdmin.html', {'mesageSignup': e.messages, 'mesageSignin': ''})

        user = LibraryUser.objects.create_user(username, email, password)
        user.phoneNumber = phoneNumber
        user.isAdmin = True
        user.is_active = False  # Set the user as inactive until email is confirmed
        user.save()

        # Send email confirmation link
        current_site = get_current_site(request)
        mail_subject = 'Confirm your email address'
        message = render_to_string('email_confirmation.html', {
            'user': user,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': default_token_generator.make_token(user),
        })
        send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [email])

        return render(request, 'loginAdmin.html', {'mesageSignup': 'Please check your email to confirm your email address and complete the registration.', 'mesageSignin': ''})
    return render(request, 'loginAdmin.html', {'mesageSignup': '', 'mesageSignin': ''})



def Home(request):
    return render(request, 'HomeAdmin.html')


def signout(request):
    logout(request)
    return render(request, 'loginAdmin.html')


def DisplayBooks(request):
    # Retrieve the last 10 added books
    recently_added_books = Book.objects.order_by('-id')[:10]

    # Group books by category
    books_by_category = {}
    all_categories = set(Book.objects.values_list('category', flat=True))

    for category in all_categories:
        books_by_category[category] = Book.objects.filter(category=category)
    for category, books in books_by_category.items() :
        for book in books :
            if book.CopiesNum==0:
                book.available=False

    for book in recently_added_books:
        if book.CopiesNum==0:
                book.available=False

    # Render the template with grouped books and recently added books
    return render(request, 'booksAdmin.html', {'categories': all_categories, 'books_by_category': books_by_category, 'recently_added_books': recently_added_books})
@login_required
def DeleteBook(request, book_id):
    # Retrieve the book object from the database
    book = get_object_or_404(Book, pk=book_id)

    if request.method == 'POST':
        # Handle book deletion upon form submission
        book.delete()
        return redirect('BooksAdmin')  # Redirect to a specific URL after deletion

    # Render a confirmation template for deleting the book
    return render(request, 'confirm_delete_book.html', {'book': book})

@login_required

def EditBook(request, book_id):
    # Retrieve the book object from the database
    book = get_object_or_404(Book, pk=book_id)

    if request.method == 'POST':
        # Handle form submission for editing book details
        form = BookForm(request.POST, request.FILES, instance=book)
        if form.is_valid():
            form.save()
            return redirect('BooksAdmin')  # Redirect to a specific URL after editing
    else:
        # Render a form for editing book details
        form = BookForm(instance=book)

    return render(request, 'EditBook.html', {'form': form, 'book': book})
@login_required

def AddBook(request):
    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('/admin/Books/')  # Redirect to the books list after saving
    else:
        form = BookForm()
    return render(request, 'AddBook.html', {'form': form})

@login_required

def EditUser(request, user_id):
    user = get_object_or_404(LibraryUser, id=user_id)
    if request.method == 'POST':
        form = LibraryUserForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            login(request, user)
            return redirect('EditUser', user_id=user.id)  # Redirect to a user detail page or another page
    else:
        form = LibraryUserForm(instance=user)
    return render(request, 'EditUser.html', {'form': form})


def SearchBooksAdmin(request):
    query = request.GET.get('query', '')
    search_by = request.GET.get('choose', '')
    if search_by == 'ID':
        books = Book.objects.filter(id__icontains=query)
    elif search_by == 'title':
        books = Book.objects.filter(title__icontains=query)
    elif search_by == 'author':
        books = Book.objects.filter(author__icontains=query)
    elif search_by == 'category':
        books = Book.objects.filter(category__icontains=query)
    else:
        books = Book.objects.none()

    books_by_category = {}
    all_categories = set(books.values_list('category', flat=True))

    for category in all_categories:
        books_by_category[category] = books.filter(category=category)
    for category, books in books_by_category.items() :
        for book in books :
            if book.CopiesNum==0:
                book.available=False

    # Render the template with grouped books and recently added books
    return render(request, 'booksAdmin.html', {'categories': all_categories, 'books_by_category': books_by_category})