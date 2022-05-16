"""This module is containing first level routes for api"""
from django.urls import include, path

urlpatterns = [
    path('v1/', include('api.v1.urls'))
]
