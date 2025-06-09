from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .services import compute_annual_tax, compute_quarterly_tax, compute_monthly_tax
from datetime import datetime
from rest_framework import generics
from .models import UserTaxSetting
from .serializers import UserTaxSettingSerializer

class UserTaxSettingListCreateView(generics.ListCreateAPIView):
    serializer_class = UserTaxSettingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserTaxSetting.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AnnualTaxSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        year = int(request.query_params.get("year", datetime.now().year))
        data = compute_annual_tax(request.user, year)
        return Response(data)


class QuarterlyTaxSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
    
        year = int(request.query_params.get("year", datetime.now().year))
        quarter = int(request.query_params.get("quarter", 1))  # default to Q1
        data = compute_quarterly_tax(request.user, year, quarter)
        return Response(data)


class MonthlyTaxSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        year = int(request.query_params.get("year", datetime.now().year))
        month = int(request.query_params.get("month", datetime.now().month))
        data = compute_monthly_tax(request.user, year, month)
        return Response(data)