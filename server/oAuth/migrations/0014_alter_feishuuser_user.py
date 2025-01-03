# Generated by Django 5.1.4 on 2025-01-03 01:35

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oAuth', '0013_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feishuuser',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='feishu_info', to=settings.AUTH_USER_MODEL),
        ),
    ]