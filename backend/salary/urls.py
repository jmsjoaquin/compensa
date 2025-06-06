from django.urls import path
from .views import WorkLogListCreateView, MySalaryRecordListView, GenerateSalaryRecordView

urlpatterns = [
    path('logs/', WorkLogListCreateView.as_view(), name='worklog-list-create'),
    path('my-summaries/', MySalaryRecordListView.as_view(), name='my-salary-records'),
    path('generate-summary/', GenerateSalaryRecordView.as_view(), name='generate-salary-record'),
]
