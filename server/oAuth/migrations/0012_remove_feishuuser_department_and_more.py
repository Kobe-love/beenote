# Generated by Django 5.1.4 on 2025-01-03 00:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oAuth', '0011_alter_user_role'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feishuuser',
            name='department',
        ),
        migrations.RemoveField(
            model_name='feishuuser',
            name='employee_id',
        ),
        migrations.RemoveField(
            model_name='feishuuser',
            name='gender',
        ),
        migrations.RemoveField(
            model_name='feishuuser',
            name='position',
        ),
        migrations.RemoveField(
            model_name='feishuuser',
            name='status',
        ),
        migrations.AddField(
            model_name='feishuuser',
            name='tenant_key',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='企业标识'),
        ),
    ]
