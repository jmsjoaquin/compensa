from datetime import date, timedelta
from calendar import monthrange
from .models import WorkLog, SalaryRecord

def generate_salary_record(user, period, year, month):
    """Generates a SalaryRecord for the given user, period, year, and month."""
    
    # Define date range
    if period == 'monthly':
        start_date = date(year, month, 1)
        end_date = date(year, month, monthrange(year, month)[1])

    elif period == 'bi-monthly':
        # 1st half
        start_date = date(year, month, 1)
        end_date = date(year, month, 15)
        # 2nd half
        second_half = False
        # if already exists, create second half
        if SalaryRecord.objects.filter(user=user, month=month, year=year, period='bi-monthly', start_date=start_date).exists():
            start_date = date(year, month, 16)
            end_date = date(year, month, monthrange(year, month)[1])
            second_half = True

    elif period == 'weekly':
        # Get latest weekly record
        last_record = SalaryRecord.objects.filter(user=user, period='weekly').order_by('-end_date').first()
        if last_record:
            start_date = last_record.end_date + timedelta(days=1)
        else:
            start_date = date.today() - timedelta(days=date.today().weekday())
        end_date = start_date + timedelta(days=6)

    else:
        raise ValueError("Invalid period value")

    # Get logs in the period
    logs = WorkLog.objects.filter(user=user, date__range=[start_date, end_date])
    if not logs.exists():
        return None  

    total_days = logs.count()
    total_hours = sum([log.hours_worked() for log in logs])
    total_salary = sum([log.salary_earned() for log in logs])

    salary_record = SalaryRecord.objects.create(
        user=user,
        period=period,
        start_date=start_date,
        end_date=end_date,
        year=start_date.year,
        month=start_date.month,
        total_days_worked=total_days,
        total_hours_worked=total_hours,
        total_salary=total_salary
    )

    return salary_record
