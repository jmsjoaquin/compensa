from django.db import models
from django.conf import settings
from decimal import Decimal
from salary.models import SalaryRecord

class UserTaxSetting(models.Model):
    TAX_NAME_CHOICES = [
        ('Supplier of Services (5%)', 'Supplier of Services (5%)'),
        ('Professional Fee (5%)', 'Professional Fee (5%)'),
        ('Rentals (5%)', 'Rentals (5%)'),
        ('Board of Directors (10%)', 'Board of Directors (10%)'),
        ('Consultant - Corporate (10%)', 'Consultant - Corporate (10%)'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    year = models.PositiveIntegerField()
    tax_name = models.CharField(max_length=100, choices=TAX_NAME_CHOICES)
    tax_percentage = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        unique_together = ('user', 'year')

    def __str__(self):
        return f"{self.user.username} - {self.year} - {self.tax_name}"

