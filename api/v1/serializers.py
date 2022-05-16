from rest_framework import serializers

from contacts.models import Person


class PersonSerializer(serializers.ModelSerializer):
    key = serializers.SerializerMethodField()

    def get_key(self, instance):
        return instance.id

    class Meta:
        model = Person
        fields = [
            'id',
            'name',
            'age',
            'address',
            'key'
        ]
        read_only_fields = [
            'key',
        ]
