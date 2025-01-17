# Generated by Django 5.1.4 on 2025-01-17 07:27

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('election', '0004_candidatesfordeputymayor_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidatesfordeputymayor',
            name='candidate_type',
            field=models.CharField(default='deputy_mayor', max_length=20),
        ),
        migrations.AddField(
            model_name='candidatesformayor',
            name='candidate_type',
            field=models.CharField(default='mayor', max_length=20),
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deputy_mayor_candidate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='votes_for_deputy_mayor', to='election.candidatesfordeputymayor')),
                ('mayor_candidate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='votes_for_mayor', to='election.candidatesformayor')),
                ('voter', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='vote', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
