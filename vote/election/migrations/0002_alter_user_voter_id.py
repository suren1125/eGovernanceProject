# Generated by Django 5.1.4 on 2025-01-18 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('election', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='voter_id',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
