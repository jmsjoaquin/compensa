from decimal import Decimal
from salary.models import SalaryRecord
from .models import UserTaxSetting
from calendar import monthrange

def compute_annual_tax(user, year):
    # Sum salary for the year
    salary_records = SalaryRecord.objects.filter(user=user, year=year)
    total_income = sum([record.total_salary for record in salary_records])

    # Get the user’s tax setting
    try:
        setting = UserTaxSetting.objects.get(user=user, year=year)
    except UserTaxSetting.DoesNotExist:
        return {
            "error": "No tax setting configured for this user in the given year."
        }

    # Compute tax
    tax_due = round(total_income * (setting.tax_percentage / 100), 2)

    return {
        "user": user.username,
        "year": year,
        "tax_name": setting.tax_name,
        "tax_percentage": float(setting.tax_percentage),
        "total_income": float(total_income),
        "tax_due": float(tax_due)
    }

def compute_quarterly_tax(user, year, quarter):


    # Quarter to month ranges
    quarter_map = {
        1: (1, 3),
        2: (4, 6),
        3: (7, 9),
        4: (10, 12),
    }

    if quarter not in quarter_map:
        return {"error": "Invalid quarter (must be 1 to 4)"}

    start_month, end_month = quarter_map[quarter]
    
    salary_records = SalaryRecord.objects.filter(
        user=user,
        year=year,
        month__gte=start_month,
        month__lte=end_month
    )

    total_income = sum([record.total_salary for record in salary_records])

    try:
        setting = UserTaxSetting.objects.get(user=user, year=year)
    except UserTaxSetting.DoesNotExist:
        return {"error": "Tax setting not found"}

    tax_due = round(total_income * (setting.tax_percentage / 100), 2)

    return {
        "user": user.username,
        "year": year,
        "quarter": quarter,
        "tax_name": setting.tax_name,
        "tax_percentage": float(setting.tax_percentage),
        "total_income": float(total_income),
        "tax_due": float(tax_due)
    }




def compute_monthly_tax(user, year, month):
    # Filter salary records for the given month/year
    salary_records = SalaryRecord.objects.filter(
        user=user,
        year=year,
        month=month
    )

    if not salary_records.exists():
        return {
            "user": user.username,
            "year": year,
            "month": month,
            "total_income": 0,
            "tax_due": 0,
            "message": "No salary records found for this month."
        }

    total_income = sum([record.total_salary for record in salary_records])

    try:
        setting = UserTaxSetting.objects.get(user=user, year=year)
    except UserTaxSetting.DoesNotExist:
        return {"error": "Tax setting not found for this year."}

    tax_due = round(total_income * (setting.tax_percentage / 100), 2)

    return {
        "user": user.username,
        "year": year,
        "month": month,
        "tax_name": setting.tax_name,
        "tax_percentage": float(setting.tax_percentage),
        "total_income": float(total_income),
        "tax_due": float(tax_due)
    }
