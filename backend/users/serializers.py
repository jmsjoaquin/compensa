# users/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "username", "email", "password",
            "first_name", "last_name", "job_type",
            "salary_per_day"  # 👈 include here
        )

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            job_type=validated_data.get("job_type"),
            salary_per_day=validated_data.get("salary_per_day")  # 👈 include here
        )
