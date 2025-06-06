from rest_framework import serializers
from .models import WorkLog
from .models import SalaryRecord

from rest_framework import serializers
from .models import WorkLog, SalaryRecord

class WorkLogSerializer(serializers.ModelSerializer):
    hours_worked = serializers.SerializerMethodField()
    hourly_rate = serializers.SerializerMethodField()
    per_minute_rate = serializers.SerializerMethodField()
    salary_earned = serializers.SerializerMethodField()

    class Meta:
        model = WorkLog
        fields = [
            'id', 'date', 'time_in', 'time_out', 'daily_rate',
            'hours_worked', 'hourly_rate', 'per_minute_rate', 'salary_earned'
        ]
        read_only_fields = [
            'hours_worked', 'hourly_rate', 'per_minute_rate',
            'salary_earned', 'user'
        ]

    def get_hours_worked(self, obj):
        return obj.hours_worked()

    def get_hourly_rate(self, obj):
        return obj.hourly_rate()

    def get_per_minute_rate(self, obj):
        return obj.per_minute_rate()

    def get_salary_earned(self, obj):
        return obj.salary_earned()

    def create(self, validated_data):
        # Let the view pass the user explicitly to avoid duplication
        return WorkLog.objects.create(**validated_data)


class SalaryRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalaryRecord
        fields = [
            'id', 'period', 'month', 'year',
            'start_date', 'end_date',
            'total_days_worked', 'total_hours_worked', 'total_salary'
        ]
