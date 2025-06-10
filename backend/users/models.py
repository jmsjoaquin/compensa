# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    JOB_TYPES = [
        ('Freelancer', 'Freelancer'),
        ('JO', 'Job Order'),
        ('COS', 'Contract of Service'),
    ]
    job_type = models.CharField(max_length=20, choices=JOB_TYPES, blank=True, null=True)
    salary_per_day = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    def __str__(self):
        return self.username
