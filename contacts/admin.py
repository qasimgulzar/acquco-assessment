from django.contrib import admin

from contacts.models import Person


class PersonAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'age',
    )


admin.site.register(Person, PersonAdmin)
