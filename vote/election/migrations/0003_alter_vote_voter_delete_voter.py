# Generated by Django 5.1.4 on 2025-04-14 09:29

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('election', '0002_alter_user_citizenship_number_alter_user_voter_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vote',
            name='voter',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='vote', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Voter',
        ),
    ]
