from rest_framework import serializers
from .models import RootInfo, Data


class DataSerializer(serializers.ModelSerializer):
  class Meta:
    model = Data
    fields = ['id', ]
    read_only_fields = ['id', ]


class RootInfoSerializer(serializers.ModelSerializer):
  class Meta:
    model = RootInfo
    fields = ['id', 'name', 'created_at']
    read_only_fields = ['id', 'created_at']
