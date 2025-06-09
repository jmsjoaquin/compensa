from django.conf import settings
from django.db import models

class GovDeductionOption(models.Model):
    DEDUCTION_CHOICES = [
        ('philhealth', 'PhilHealth'),
        ('sss', 'SSS'),
        ('pagibig', 'Pag-IBIG'),
    ]

    name = models.CharField(max_length=50, choices=DEDUCTION_CHOICES, unique=True)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)  # ex. 4.50

    def __str__(self):
        return f"{self.get_name_display()} ({self.percentage}%)"


class UserGovDeduction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    deduction = models.ForeignKey(GovDeductionOption, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'deduction')

    def __str__(self):
        return f"{self.user.username} - {self.deduction}"