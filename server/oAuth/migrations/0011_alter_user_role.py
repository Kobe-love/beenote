# Generated by Django 5.1.4 on 2025-01-03 00:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oAuth', '0010_alter_user_options_alter_dingtalkconfig_table_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('user', '普通用户'), ('admin', '管理员'), ('superuser', '超级管理员')], default='user', max_length=20, verbose_name='角色'),
        ),
    ]