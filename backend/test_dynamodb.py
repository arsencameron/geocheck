import os
import django

# Set the settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'geocheck.settings')  # Replace 'geocheck.settings' with your actual settings path

# Initialize Django
django.setup()

from scripts.dynamodb_helper import dynamodb

print("Testing DynamoDB initialization...")
print("Region Name:", dynamodb.meta.client.meta.region_name)


