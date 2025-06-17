from django.contrib import admin
from .models import Regions, Parameters, Data

@admin.register(Regions)
class RegionsAdmin(admin.ModelAdmin):
    list_display       = ('id', 'name', 'created_at')
    search_fields      = ('name',)
    ordering           = ('id',)


@admin.register(Parameters)
class ParametersAdmin(admin.ModelAdmin):
    list_display       = ('id', 'name', 'measure')
    search_fields      = ('name',)
    list_filter        = ('measure',)
    ordering           = ('id',)


@admin.register(Data)
class DataAdmin(admin.ModelAdmin):
    list_display        = ('id', 'region', 'parameter', 'year', 'value')
    list_select_related = ('region', 'parameter')
    search_fields       = ('region__name', 'parameter__name')
    list_filter         = ('region', 'parameter', 'year')
    ordering            = ('id',)