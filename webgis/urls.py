from __future__ import unicode_literals
from django.conf.urls import url, include
from django.views import generic
from django.contrib.auth import views as auth_views
from . import views
from .models import *



urlpatterns = [
    #url(r'^$', views.DashboardView,name="home"),
	url(r'^$', views.HomePageView, name ='map'),
	url(r'^county_data/$', views.county_datasets, name = 'county'),
	url(r'^elevenkvmvlines_data/$', views.elevenkvmvline_datasets, name = 'elevenkvmvlines'),
	url(r'^generationplants_data/$', views.generationplant_datasets, name = 'generationplant'),
	url(r'^primarysubstations_data/$', views.primarysubstation_datasets, name = 'primarysubstation'),
	url(r'^secondarysubstations_data/$', views.secondarysubstation_datasets, name = 'secondarysubstation'),
	url(r'^thirtythreekvmvlines_data/$', views.thirtythreekvmvline_datasets, name = 'thirtythreekvmvline'),
	url(r'^transmissionlines_data/$', views.transmissionline_datasets, name = 'transmissionline'),
	url(r'^transmissionsubstations_data/$', views.transmissionsubstation_datasets, name = 'transmissionsubstation'),
	url(r'^accounts/login/$',views.user_login, name='login'),
    url(r'^accounts/logout/', views.user_logout, name='loggedout'),
    url(r'^accounts/changepassword/', views.change_password, name='changepassword'),     
    url(r'^accounts/', include('registration.backends.simple.urls')),
    #url(r'^register_success/', register_success),


]
	