# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-15 05:52
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webgis', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='secondarysubstations',
            name='geom',
            field=django.contrib.gis.db.models.fields.PointField(null=True, srid=4326),
        ),
    ]
