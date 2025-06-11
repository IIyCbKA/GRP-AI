from django.db import models


class RootInfo(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=255)
  created_at = models.DateTimeField(auto_now_add=True)


class Data(models.Model):
  root = models.ForeignKey(
    RootInfo,
    on_delete=models.CASCADE,
    related_name='data',
  )

  # fields