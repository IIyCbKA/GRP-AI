from django.urls import path
from .views import RegionsView, RegionView, CreateRegionView

urlpatterns = [
  path('regions/', RegionsView.as_view(), name='grp_regions'),
  path('region/<int:regionID>/', RegionView.as_view(), name='grp_region'),
  path('create/', CreateRegionView.as_view(), name='grp_create'),
]