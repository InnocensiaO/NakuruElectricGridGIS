# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-23 18:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webgis', '0006_transmissionsubstations_internalgp'),
    ]

    operations = [
        migrations.RenameField(
            model_name='transmissionsubstations',
            old_name='incomingfe',
            new_name='incomingvo',
        ),
        migrations.RenameField(
            model_name='transmissionsubstations',
            old_name='outgoingfe',
            new_name='outgoingvo',
        ),
        migrations.AddField(
            model_name='transmissionlines',
            name='internaltb',
            field=models.FloatField(null=True),
        ),
    ]