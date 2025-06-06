from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth import get_user_model
from .models import WorkLog, SalaryRecord
from .serializers import WorkLogSerializer, SalaryRecordSerializer
from .services import generate_salary_record

User = get_user_model()

# 🔧 Change this to the username of your test user
TEST_USERNAME = "james"  # or whatever test user exists in your DB


class WorkLogListCreateView(generics.ListCreateAPIView):
    serializer_class = WorkLogSerializer
    # permission_classes = [permissions.IsAuthenticated]  # 🔒 disabled for testing
    
    def get_queryset(self):
        test_user = User.objects.get(username=TEST_USERNAME)
        return WorkLog.objects.filter(user=test_user).order_by('-date')

    def perform_create(self, serializer):
        test_user = User.objects.get(username=TEST_USERNAME)
        serializer.save(user=test_user)


class MySalaryRecordListView(generics.ListAPIView):
    serializer_class = SalaryRecordSerializer
    # permission_classes = [permissions.IsAuthenticated]  # 🔒 disabled for testing

    def get_queryset(self):
        test_user = User.objects.get(username=TEST_USERNAME)
        return SalaryRecord.objects.filter(user=test_user).order_by('-year', '-month')


class GenerateSalaryRecordView(APIView):
    # permission_classes = [permissions.IsAuthenticated]  # 🔒 disabled for testing

    def post(self, request):
        test_user = User.objects.get(username=TEST_USERNAME)

        period = request.data.get('period')
        year = request.data.get('year')
        month = request.data.get('month')

        if not (period and year and month):
            return Response({"detail": "period, year, and month are required."}, status=400)

        try:
            year = int(year)
            month = int(month)
        except ValueError:
            return Response({"detail": "year and month must be integers."}, status=400)

        record = generate_salary_record(user=test_user, period=period, year=year, month=month)

        if record:
            return Response({"detail": "Salary summary generated."}, status=201)
        else:
            return Response({"detail": "No work logs found for that period."}, status=204)
