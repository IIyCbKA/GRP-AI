from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status, generics

from .serializers import (
  RegionsSerializer,
  DataSerializer,
  CreateRegionsSerializer,
  CreateParametersSerializer,
  CreateDataSerializer
)
from .models import Regions


class RegionsView(APIView):
  def get(self, request: Request) -> Response:
    allRegions = Regions.objects.all()
    serializer = RegionsSerializer(allRegions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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
      },
      status=status.HTTP_200_OK
    )


class CreateRegions(generics.CreateAPIView):
  serializer_class = CreateRegionsSerializer


class CreateParameters(generics.CreateAPIView):
  serializer_class = CreateParametersSerializer


class CreateData(generics.CreateAPIView):
  serializer_class = CreateDataSerializer