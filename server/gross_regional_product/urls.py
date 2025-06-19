from django.urls import path
from .views import (
  RegionsAndParametersView,
  RegionView,
  RegionPredictionView,
  CreateRegions,
  CreateParameters,
  CreateData
)

urlpatterns = [
  path('root/', RegionsAndParametersView.as_view(), name='grp_root'),
  path('region/<int:region_id>/', RegionView.as_view(), name='grp_region'),
  path('predictions/<int:region_id>/<int:year>/<int:period>/', RegionPredictionView.as_view(), name='grp_predict'),
  path('create/regions/', CreateRegions.as_view(), name='grp_create_regions'),
  path('create/parameters/', CreateParameters.as_view(), name='grp_create_parameters'),
  path('create/data/', CreateData.as_view(), name='grp_create_data'),
]