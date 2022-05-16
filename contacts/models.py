from django.db import models


class Person(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    age = models.IntegerField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
