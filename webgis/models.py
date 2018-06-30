from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from django.contrib.gis.db import models
import datetime 
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from decimal import Decimal

# Create your models here.
class UserProfile(models.Model):    
    user = models.OneToOneField(User)
    activation_key = models.CharField(max_length=40, blank=True)
    key_expires = models.DateTimeField(default=datetime.date.today()) 
    
    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural='User profiles'


class Incidences(models.Model):
    name = models.CharField(max_length=20)
    location = models.PointField(srid=4326)
    objects = models.GeoManager()

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural =" Incidences"

class Generationplants(models.Model):
    name = models.CharField(max_length=254)
    internalgp = models.FloatField(null=True)
    capacity = models.FloatField()
    geom = models.PointField(srid=4326, null=True)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural =" Generationplants"

class Counties(models.Model):
    name = models.CharField(max_length=6)
    shape_leng = models.FloatField()
    shape_area = models.FloatField()
    geom = models.MultiPolygonField(srid=4326)


    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural =" Counties"



class Elevenkvmvlines(models.Model):
    county = models.CharField(max_length=254)
    internalpf = models.FloatField()
    controlcen = models.CharField(max_length=100)
    internalps = models.FloatField(null=True)
    primarysub = models.CharField(max_length=100)
    primaryfee = models.CharField(max_length=100)
    feederleng = models.FloatField()
    typeofsect = models.CharField(max_length=50)
    linevoltag = models.CharField(max_length=50)
    numberofph = models.CharField(max_length=100)
    geom = models.MultiLineStringField(srid=4326)


    def __unicode__(self):
        return self.primaryfee

    class Meta:
        verbose_name_plural =" Elevenkvmvlines"




class Primarysubstations(models.Model):
    county = models.CharField(max_length=254)
    internalps = models.FloatField()
    primarysub = models.CharField(max_length=254)
    internaltl = models.FloatField(null=True)
    transfeede = models.CharField(max_length=100, null=True)
    ownership = models.CharField(max_length=50)
    physicallo = models.CharField(max_length=100)
    incomingvo = models.CharField(max_length=50)
    outgoingvo = models.CharField(max_length=50)
    plotnumber = models.CharField(max_length=50)
    manned = models.CharField(max_length=50)
    geom = models.PointField(srid=4326, null=True)

   



    def __unicode__(self):
        return self.primarysub

    class Meta:
        verbose_name_plural =" Primarysubstations"




class Secondarysubstations(models.Model):
    name = models.CharField(max_length=30)
    substation = models.CharField(max_length=50)
    internalpf = models.FloatField(null=True)
    primaryfee = models.CharField(max_length=100)
    primarysub = models.CharField(max_length=100)
    county = models.CharField(max_length=254)
    internalsb = models.FloatField()
    customerss = models.FloatField()
    physicallo = models.CharField(max_length=50)
    geom = models.PointField(srid=4326, null=True)

   

   
    def __unicode__(self):
        return self.substation

    class Meta:
        verbose_name_plural =" Secondarysubstations"

class Thirtythreekvmvlines(models.Model):
    primaryfee = models.CharField(max_length=100)
    internalps = models.FloatField(null=True)
    primarysub = models.CharField(max_length=100)
    county = models.CharField(max_length=254)
    internalpf = models.FloatField()
    typeofsect = models.CharField(max_length=100)
    feederleng = models.FloatField()
    numberofph = models.CharField(max_length=100)
    linevoltag = models.CharField(max_length=50)
    geom = models.MultiLineStringField(srid=4326)



    def __unicode__(self):
        return self.primaryfee

    class Meta:
        verbose_name_plural =" Thirtythreekvmvlines"



class Transmissionlines(models.Model):
    transfeede = models.CharField(max_length=100)
    transsubta = models.CharField(max_length=100)
    internaltl = models.FloatField()
    internaltb = models.FloatField(null=True)
    county = models.CharField(max_length=254)
    typeofsect = models.CharField(max_length=100)
    feederleng = models.CharField(max_length=50)
    linevoltag = models.CharField(max_length=50)
    numberofph = models.CharField(max_length=50)
    geom = models.MultiLineStringField(srid=4326)



    def __unicode__(self):
        return self.transfeede

    class Meta:
        verbose_name_plural =" Transmissionlines"



class Transmissionsubstations(models.Model):
    name = models.CharField(max_length=100)
    incomingvo = models.CharField(max_length=10)
    outgoingvo = models.CharField(max_length=100)
    county = models.CharField(max_length=254)
    internaltb = models.FloatField()
    internalgp = models.FloatField(null=True)
    ownership = models.CharField(max_length=50)
    physicallo = models.CharField(max_length=50)
    plotnumber = models.CharField(max_length=50)
    manned = models.CharField(max_length=50)
    geom = models.PointField(srid=4326, null=True)

   



    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural =" Transmissionsubstations"

