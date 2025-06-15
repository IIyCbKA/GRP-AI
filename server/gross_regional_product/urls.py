from django.urls import path
from .views import (
  RegionsView,
  RegionView,
  CreateRegions,
  CreateParameters,
  CreateData
)

urlpatterns = [
  path('regions/', RegionsView.as_view(), name='grp_regions'),
  path('region/<int:regionID>/', RegionView.as_view(), name='grp_region'),
  path('create/regions/', CreateRegions.as_view(), name='grp_create_regions'),
  path('create/parameters/', CreateParameters.as_view(), name='grp_create_parameters'),
  path('create/data/', CreateData.as_view(), name='grp_create_data'),
]