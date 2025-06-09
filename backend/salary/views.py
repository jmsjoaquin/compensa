from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from .models import WorkLog, SalaryRecord
from .serializers import WorkLogSerializer, SalaryRecordSerializer
from .services import generate_salary_record


class WorkLogListCreateView(generics.ListCreateAPIView):
    serializer_class = WorkLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkLog.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MySalaryRecordListView(generics.ListAPIView):
    serializer_class = SalaryRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SalaryRecord.objects.filter(user=self.request.user).order_by('-year', '-month')


class GenerateSalaryRecordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
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

        record = generate_salary_record(user=request.user, period=period, year=year, month=month)

        if record:
            return Response({"detail": "Salary summary generated."}, status=201)
        else:
            return Response({"detail": "No work logs found for that period."}, status=204)
