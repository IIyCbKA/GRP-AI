from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status, generics

from .serializers import (
  RegionsSerializer,
  DataSerializer,
  CreateRegionsSerializer,
  CreateParametersSerializer,
  CreateDataSerializer,
  ParametersSerializer
)
from .models import Regions, Parameters
from .services import predict_region_period
from .constants import LOOKBACK_YEARS


class RegionsAndParametersView(APIView):
  def get(self, request: Request) -> Response:
    all_regions = Regions.objects.all()
    regions_serializer = RegionsSerializer(all_regions, many=True)

    all_parameters = Parameters.objects.all()
    parameters_serializer = ParametersSerializer(all_parameters, many=True)

    return Response(
      {
        "regions": regions_serializer.data,
        "parameters": parameters_serializer.data
      },
      status=status.HTTP_200_OK
    )


class RegionView(APIView):
  def get(self, request: Request, regionID: int) -> Response:
    try:
      root = Regions.objects.get(id=regionID)
    except Regions.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)

    data = root.data.all()
    serializer = DataSerializer(data, many=True)

    return Response(
      {
        'id': root.id,
        'name': root.name,
        'data': serializer.data,
        'created_at': root.created_at,
      },
      status=status.HTTP_200_OK
    )


class RegionPredictView(APIView):
  def get(
    self,
    request: Request,
    region_id: int,
    year: int,
    period: int
  ) -> Response:
    try:
      result = predict_region_period(
        region_id=region_id,
        start_year=year,
        period=period,
        window=LOOKBACK_YEARS,
      )
      return Response(
        {
          "id": region_id,
          "period": period,
          "predict": result
        }, status=status.HTTP_200_OK
      )

    except ValueError:
      return Response(status=status.HTTP_400_BAD_REQUEST)


class CreateRegions(generics.CreateAPIView):
  serializer_class = CreateRegionsSerializer


class CreateParameters(generics.CreateAPIView):
  serializer_class = CreateParametersSerializer


class CreateData(generics.CreateAPIView):
  serializer_class = CreateDataSerializer