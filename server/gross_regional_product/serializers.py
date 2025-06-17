from django.db import transaction
from rest_framework import serializers

from .models import Regions, Data, Parameters


class BulkCreateListSerializer(serializers.ListSerializer):
  def create(self, validated_data):
    model = self.child.Meta.model
    objs = [model(**item) for item in validated_data]
    model.objects.bulk_create(objs)
    return objs


class RegionsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Regions
    fields = ['id', 'name', 'created_at']
    read_only_fields = ['created_at']
    list_serializer_class = BulkCreateListSerializer


class ParametersSerializer(serializers.ModelSerializer):
  class Meta:
    model = Parameters
    fields = ['id', 'name', 'measure']
    list_serializer_class = BulkCreateListSerializer


class DataSerializer(serializers.ModelSerializer):
  region_id = serializers.PrimaryKeyRelatedField(
    queryset=Regions.objects.all(), source='region'
  )
  parameter_id = serializers.PrimaryKeyRelatedField(
    queryset=Parameters.objects.all(), source='parameter'
  )

  class Meta:
    model = Data
    fields = ['id', 'region_id', 'parameter_id', 'value', 'year']
    read_only_fields = ['id', ]
    list_serializer_class = BulkCreateListSerializer


class ListEnvelopeMixin:
  envelope_key = 'data'
  child_serializer = None

  def to_representation(self, instances):
    serializer = self.child_serializer
    return {self.envelope_key: serializer(instances, many=True).data}


class CreateManySerializer(ListEnvelopeMixin, serializers.Serializer):
  child_serializer = None

  @transaction.atomic
  def create(self, validatedData):
    data = validatedData['data']
    instances = self.fields['data'].create(data)
    return instances


class CreateRegionsSerializer(CreateManySerializer):
  data = RegionsSerializer(many=True)
  child_serializer = RegionsSerializer


class CreateParametersSerializer(CreateManySerializer):
  data = ParametersSerializer(many=True)
  child_serializer = ParametersSerializer


class CreateDataSerializer(CreateManySerializer):
  data = DataSerializer(many=True)
  child_serializer = DataSerializer
