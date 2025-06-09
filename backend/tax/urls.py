from django.urls import path
from .views import AnnualTaxSummaryView, QuarterlyTaxSummaryView, MonthlyTaxSummaryView, UserTaxSettingListCreateView

urlpatterns = [
    path('settings/', UserTaxSettingListCreateView.as_view(), name='tax-settings'),
    path('summary/annual/', AnnualTaxSummaryView.as_view(), name='annual-tax-summary'),
    path('summary/quarterly/', QuarterlyTaxSummaryView.as_view(), name='quarterly-tax-summary'),
    path('summary/monthly/', MonthlyTaxSummaryView.as_view(), name='monthly-tax-summary'),
]
