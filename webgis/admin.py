from django.contrib import admin
from .models import Incidences, Counties, Elevenkvmvlines, Generationplants, Primarysubstations, Secondarysubstations, Thirtythreekvmvlines, Transmissionlines, Transmissionsubstations
from django.forms import ModelForm
from .models import *
from leaflet.admin import LeafletGeoAdmin



# Register your models here.

class IncidencesAdmin(LeafletGeoAdmin):
    pass
	#list_display =('name','location')


class CountiesAdmin(LeafletGeoAdmin):
    pass
	#list_display =('name')

class ElevenkvmvlinesAdmin(LeafletGeoAdmin):
    pass
	#list_display =('primaryfee','primarysub','linevoltag')


class GenerationplantsAdmin(LeafletGeoAdmin):
    pass
	#list_display =('name','type')


class PrimarysubstationsAdmin(LeafletGeoAdmin):
    pass
	#list_display =('primarysub','incomingvo','outgoingvo')

class SecondarysubstationsAdmin(LeafletGeoAdmin):
    pass
	#list_display =('name','primarysub')


class ThirtythreekvmvlinesAdmin(LeafletGeoAdmin):
    pass
	#list_display =('primaryfee','primarysub')


class TransmissionlinesAdmin(LeafletGeoAdmin):
    pass
	#list_display =('transfeede','transsubta')


class TransmissionsubstationsAdmin(LeafletGeoAdmin):
    pass
	#list_display =('name','incomingfe','outgoingfe')

admin.site.register(Incidences, IncidencesAdmin)
admin.site.register(Counties, CountiesAdmin)
admin.site.register(Elevenkvmvlines, ElevenkvmvlinesAdmin)
admin.site.register(Generationplants, GenerationplantsAdmin)
admin.site.register(Primarysubstations, PrimarysubstationsAdmin)
admin.site.register(Secondarysubstations, SecondarysubstationsAdmin)
admin.site.register(Thirtythreekvmvlines, ThirtythreekvmvlinesAdmin)
admin.site.register(Transmissionlines, TransmissionlinesAdmin)
admin.site.register(Transmissionsubstations, TransmissionsubstationsAdmin)


