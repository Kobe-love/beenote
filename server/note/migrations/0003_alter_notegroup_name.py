# Generated by Django 5.1.4 on 2024-12-31 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('note', '0002_alter_note_creator_alter_notegroup_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notegroup',
            name='name',
            field=models.CharField(max_length=100, unique=True, verbose_name='名称'),
        ),
    ]
