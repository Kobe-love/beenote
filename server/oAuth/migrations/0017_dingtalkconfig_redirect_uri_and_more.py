# Generated by Django 5.1.4 on 2025-01-03 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oAuth', '0016_remove_dingtalkconfig_agent_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='dingtalkconfig',
            name='redirect_uri',
            field=models.URLField(blank=True, max_length=500, null=True, verbose_name='回调域名'),
        ),
        migrations.AddField(
            model_name='feishuconfig',
            name='redirect_uri',
            field=models.URLField(blank=True, max_length=500, null=True, verbose_name='回调域名'),
        ),
        migrations.AddField(
            model_name='wecomconfig',
            name='redirect_uri',
            field=models.URLField(blank=True, max_length=500, null=True, verbose_name='回调域名'),
        ),
        migrations.AlterField(
            model_name='dingtalkconfig',
            name='app_id',
            field=models.CharField(max_length=100, verbose_name='APP ID'),
        ),
        migrations.AlterField(
            model_name='dingtalkconfig',
            name='client_id',
            field=models.CharField(default='ddd', max_length=100, verbose_name='Client ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='dingtalkconfig',
            name='client_secret',
            field=models.CharField(default='dd', max_length=100, verbose_name='Client Secret'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='dingtalkconfig',
            name='enabled',
            field=models.BooleanField(default=True, verbose_name='是否启用'),
        ),
        migrations.AlterField(
            model_name='feishuconfig',
            name='app_secret',
            field=models.CharField(max_length=100, verbose_name='应用密钥'),
        ),
        migrations.AlterField(
            model_name='feishuconfig',
            name='enabled',
            field=models.BooleanField(default=True, verbose_name='是否启用'),
        ),
        migrations.AlterField(
            model_name='wecomconfig',
            name='enabled',
            field=models.BooleanField(default=True, verbose_name='是否启用'),
        ),
        migrations.AlterField(
            model_name='wecomconfig',
            name='secret',
            field=models.CharField(max_length=100, verbose_name='应用密钥'),
        ),
    ]
