# Generated by Django 4.0 on 2022-02-07 15:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='_id',
            new_name='id',
        ),
        migrations.RenameField(
            model_name='review',
            old_name='_id',
            new_name='id',
        ),
    ]
