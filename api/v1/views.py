from rest_framework.viewsets import ModelViewSet

from api.v1.serializers import PersonSerializer
from contacts.models import Person


class PersonViewSet(ModelViewSet):
    queryset = Person.objects.all().order_by('-id')
    serializer_class = PersonSerializer
