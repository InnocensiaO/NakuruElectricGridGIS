# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-23 18:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webgis', '0004_auto_20180623_2109'),
    ]

    operations = [
        migrations.AddField(
            model_name='generationplants',
            name='internalgp',
            field=models.FloatField(null=True),
        ),
    ]
