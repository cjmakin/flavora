# Generated by Django 4.2 on 2023-04-21 01:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_ingredient_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='name_scientific',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
