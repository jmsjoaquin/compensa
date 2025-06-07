from django.db import models
from django.conf import settings
from decimal import Decimal
from salary.models import SalaryRecord

class UserTaxSetting(models.Model):
    TAX_CODE_CHOICES = [
        ('WC640', 'Supplier of Goods (1%)'),
        ('WC157', 'Supplier of Services (2%)'),
        ('WC650', 'Supplier of Services (5%)'),
        ('WI010', 'Professional / Honorarium < 3M (5%)'),
        ('WI011', 'Professional / Honorarium > 3M (10%)'),
        ('WC050', 'Tech Consultant - Corp (5%)'),
        ('WC051', 'Tech Consultant - Corp (10%)'),
        ('WI091', 'Board of Directors (10%)'),
        ('WC100', 'Rentals (5%)'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    year = models.PositiveIntegerField()
    atc_code = models.CharField(max_length=10, choices=TAX_CODE_CHOICES)
    tax_percentage = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        unique_together = ('user', 'year')

    def __str__(self):
        return f"{self.user.username} - {self.year} - {self.get_atc_code_display()} ({self.tax_percentage}%)"
