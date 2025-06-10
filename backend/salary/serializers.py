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
            'id', 'date', 'time_in', 'time_out',
            'hours_worked', 'hourly_rate', 'per_minute_rate', 'salary_earned'
        ]
        read_only_fields = [
            'hours_worked', 'hourly_rate', 'per_minute_rate',
            'salary_earned', 'user'
        ]

    def get_hours_worked(self, obj):
        return obj.hours_worked()

    def get_hourly_rate(self, obj):
        # Use salary_per_day from user's profile
        return round(obj.user.salary_per_day / 8, 2) if obj.user.salary_per_day else 0

    def get_per_minute_rate(self, obj):
        hourly = self.get_hourly_rate(obj)
        return round(hourly / 60, 2)

    def get_salary_earned(self, obj):
        return round(self.get_hours_worked(obj) * self.get_hourly_rate(obj), 2)

    def create(self, validated_data):
        # Let the view attach user before saving
        return WorkLog.objects.create(**validated_data)



class SalaryRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalaryRecord
        fields = [
            'id', 'period', 'month', 'year',
            'start_date', 'end_date',
            'total_days_worked', 'total_hours_worked', 'total_salary'
        ]
