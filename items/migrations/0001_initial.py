# Generated by Django 4.2.13 on 2024-05-29 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=100)),
                ('colour', models.CharField(max_length=100)),
                ('year_of_release', models.PositiveIntegerField()),
                ('size', models.CharField(max_length=2)),
                ('price', models.DecimalField(decimal_places=2, max_digits=5)),
                ('description', models.CharField(blank=True, default='', max_length=250, null=True)),
            ],
        ),
    ]
