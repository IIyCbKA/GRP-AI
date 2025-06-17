from django.db import models
from datetime import datetime


class Regions(models.Model):
  id = models.BigIntegerField(primary_key=True, unique=True)
  name = models.CharField(max_length=255)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name


class Parameters(models.Model):
  id = models.BigIntegerField(primary_key=True, unique=True)
  name = models.CharField(max_length=511, unique=True)
  measure = models.CharField(max_length=255)

  def __str__(self):
    return self.name


class Data(models.Model):
  id = models.AutoField(primary_key=True)
  region = models.ForeignKey(
    Regions,
    on_delete=models.CASCADE,
    related_name='data',
  )
  parameter = models.ForeignKey(
    Parameters,
    on_delete=models.CASCADE,
    related_name='data',
  )
  year = models.IntegerField(default=datetime.now().year)
  value = models.FloatField(default=0.0)

  class Meta:
    unique_together = [('region', 'parameter', 'year')]

  def __str__(self):
    return f"{self.region} - {self.parameter} {self.year}: {self.value}"
