from django.urls import path
from .views import RegionsView, RegionView

urlpatterns = [
  path('regions/', RegionsView.as_view(), name='grp_regions'),
  path('region/<int:regionID>/', RegionView.as_view(), name='grp_region'),
]