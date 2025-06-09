# deductions/services.py

from .models import UserGovDeduction
from salary.models import SalaryRecord
from decimal import Decimal

def compute_selected_deductions(user, year):
    salary_records = SalaryRecord.objects.filter(user=user, year=year)
    total_income = sum([r.total_salary for r in salary_records])

    user_deductions = UserGovDeduction.objects.filter(user=user).select_related('deduction')

    breakdown = {}
    total_deductions = Decimal(0)

    for item in user_deductions:
        percent = item.deduction.percentage
        amount = total_income * (percent / Decimal(100))
        breakdown[item.deduction.get_name_display()] = round(amount, 2)
        total_deductions += amount

    return {
        "user": user.username,
        "year": year,
        "total_income": float(total_income),
        "deductions": breakdown,
        "total_deductions": round(total_deductions, 2)
    }
