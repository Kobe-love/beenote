# Generated by Django 5.1.4 on 2025-01-03 00:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oAuth', '0012_remove_feishuuser_department_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=models.URLField(blank=True, max_length=500, null=True, verbose_name='头像'),
        ),
    ]
