from django.db import transaction
from rest_framework import serializers
from .models import RootInfo, Data


class DataSerializer(serializers.ModelSerializer):
  class Meta:
    model = Data
    fields = ['id', ]
    read_only_fields = ['id', ]


class RootInfoSerializer(serializers.ModelSerializer):
  data = DataSerializer(many=True, write_only=True)

  class Meta:
    model = RootInfo
    fields = ['id', 'name', 'created_at', 'data']
    read_only_fields = ['id', 'created_at']

  @transaction.atomic
  def create(self, validatedData):
    dataList = validatedData.pop('data')
    root = RootInfo.objects.create(**validatedData)
    for item in dataList:
      Data.objects.create(root=root, **item)

    return root
