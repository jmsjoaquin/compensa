from django.db import models
from django.conf import settings
from datetime import datetime

class SalaryRecord(models.Model):
    PERIOD_CHOICES = [
        ('weekly', 'Weekly'),
        ('bi-monthly', 'Bi-Monthly'),
        ('monthly', 'Monthly'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    year = models.IntegerField()
    month = models.IntegerField() 
    
    period = models.CharField(max_length=20, choices=PERIOD_CHOICES)
    
    start_date = models.DateField()
    end_date = models.DateField()

    total_days_worked = models.PositiveIntegerField()
    total_hours_worked = models.DecimalField(max_digits=5, decimal_places=2)
    total_salary = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user.username} - {self.period()} {self.month}/{self.year}"


class WorkLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    time_in = models.TimeField()
    time_out = models.TimeField()
    daily_rate = models.DecimalField(max_digits=10, decimal_places=2)

    def hours_worked(self):
        dt_in = datetime.combine(self.date, self.time_in)
        dt_out = datetime.combine(self.date, self.time_out)
        total_hours = (dt_out - dt_in).total_seconds() / 3600
        return min(total_hours, 8)

    def hourly_rate(self):
        return round(self.daily_rate / 8, 2)

    def per_minute_rate(self):
        return round(self.hourly_rate() / 60, 2)

    def salary_earned(self):
        return round(self.hours_worked() * self.hourly_rate(), 2)

    def __str__(self):
        return f"{self.user.username} - {self.date}"