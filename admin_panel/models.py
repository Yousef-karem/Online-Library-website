from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    available = models.BooleanField(default=True)
    CopiesNum=models.IntegerField(default=0)
    image = models.ImageField(upload_to='books/', blank=True, null=True)
    description = models.TextField(null=True,blank=True)
    def __str__(self):
        return self.title

class LibraryUser(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        related_name='LibraryUser_set',  # Unique related_name
        blank=True,
        help_text='The groups this LibraryUser belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='LibraryUser_set',  # Unique related_name
        blank=True,
        help_text='Specific permissions for this LibraryUser.',
        verbose_name='LibraryUser permissions',
    )
    phoneNumber = PhoneNumberField(blank=True, null=True, default='+201234567891', region='EG')
    isAdmin=models.BooleanField(default=False, null=True)
    favorite_books = models.ManyToManyField(Book, related_name='favored_by', blank=True)
    borrowed_books = models.ManyToManyField(Book, related_name='borrowed_by', blank=True)
    Mybooks = models.ManyToManyField(Book, related_name='addedBooks', blank=True)
