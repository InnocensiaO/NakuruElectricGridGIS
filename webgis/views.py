
from django.shortcuts import render
from django.template import Context
from django.http import HttpResponse
from django.core import serializers
from django.core.serializers import serialize
from django.views.generic.base import TemplateView
from django.shortcuts import render_to_response, HttpResponseRedirect, render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.template.context_processors import csrf
from django.template.context import RequestContext
import hashlib, datetime, random
from django.core.mail import send_mail
from .forms import *
from django.db.models import Count, Min, Sum, Avg
from .models import Counties,Elevenkvmvlines, Generationplants,Primarysubstations,Secondarysubstations,Thirtythreekvmvlines,Transmissionlines, Transmissionsubstations

#Create views here

def DashboardView(request):
		return render(request, 'index.html', {})
@login_required
def HomePageView(request):
    return render(request, 'HomePageView.html', {})

def county_datasets(request):
	data = serialize('geojson', Counties.objects.all())
	return HttpResponse(data,content_type='json')

def elevenkvmvline_datasets(request):
	data = serialize('geojson', Elevenkvmvlines.objects.all())
	return HttpResponse(data,content_type='json')

def generationplant_datasets(request):
	data = serialize('geojson', Generationplants.objects.all())
	return HttpResponse(data,content_type='json')


def primarysubstation_datasets(request):
	data = serialize('geojson', Primarysubstations.objects.all())
	return HttpResponse(data,content_type='json')


def secondarysubstation_datasets(request):
	data = serialize('geojson', Secondarysubstations.objects.all())
	return HttpResponse(data,content_type='json')


def thirtythreekvmvline_datasets(request):
	data = serialize('geojson', Thirtythreekvmvlines.objects.all())
	return HttpResponse(data,content_type='json')


def transmissionline_datasets(request):
	data = serialize('geojson', Transmissionlines.objects.all())
	return HttpResponse(data,content_type='json')


def transmissionsubstation_datasets(request):
	data = serialize('geojson', Transmissionsubstations.objects.all())
	return HttpResponse(data,content_type='json')


 

def user_login(request):
	args = {}
	args.update(csrf(request))
	if request.user.is_authenticated(): #Checks if the user is already login adn refuses to display the login page
		return HttpResponseRedirect('/')
	if request.method == 'POST':
		
		username = request.POST.get('username')
		password = request.POST.get('password')

		user = authenticate(username=username, password=password)

		if user:
			
			if user.is_active:

				if user.is_staff:
					login(request, user)
					return HttpResponseRedirect('/admin/')
				else:

					login(request, user)
					return HttpResponseRedirect('/')
				
			else:
				#return HttpResponseRedirect(reverse("login"))
				messages.error(request, "Error")
		else:            
			messages.error(request, "Invalid username and password.Try again!")
			return render_to_response('login.html', args)    
	else:
		
		return render(request, 'login.html', {})

@login_required
def user_logout(request):
	logout(request)

	return HttpResponseRedirect('accounts/login/')

def change_password(request):
	template_response = views.password_change(request)
	# Do something with `template_response`
	return template_response
	messages.success(request, 'Password changed successfully!')





