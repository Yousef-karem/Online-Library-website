# Generated by Django 5.0.6 on 2024-05-17 22:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_panel', '0006_alter_book_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='CopiesNum',
            field=models.IntegerField(default=0),
        ),
    ]
