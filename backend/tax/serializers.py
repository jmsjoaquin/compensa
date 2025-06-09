from rest_framework import serializers
from .models import UserTaxSetting

class UserTaxSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTaxSetting
        fields = ['id', 'year', 'tax_name', 'tax_percentage']
        read_only_fields = ['id']
