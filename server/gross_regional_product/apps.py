from django.apps import AppConfig

class GRPConfig(AppConfig):
  name = 'gross_regional_product'
  verbose_name = 'Gross Regional Product'

  def ready(self):
    from .services import lazy_load
    lazy_load()