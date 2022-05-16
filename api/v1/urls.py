"""This module is containing routes for api v1"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.v1.views import PersonViewSet

router = DefaultRouter()
router.register(r'persons', PersonViewSet, basename='person')

urlpatterns = router.urls + [
    path('api-auth/', include('rest_framework.urls'))
]
