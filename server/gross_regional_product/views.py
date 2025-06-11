from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from .serializers import RootInfoSerializer, DataSerializer
from .models import RootInfo


class RegionsView(APIView):
  def get(self, request) -> Response:
    allRegions = RootInfo.objects.all()
    serializer = RootInfoSerializer(allRegions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class RegionView(APIView):
  def get(self, request, regionID: int) -> Response:
    try:
      root = RootInfo.objects.get(id=regionID)
    except RootInfo.DoesNotExist:
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


class CreateRegionView(generics.CreateAPIView):
  serializer_class = RootInfoSerializer
