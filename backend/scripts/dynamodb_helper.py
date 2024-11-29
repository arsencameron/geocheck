import boto3
from django.conf import settings

# Initialize DynamoDB resource
dynamodb = boto3.resource(
    'dynamodb',
    region_name=settings.AWS_REGION,
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
)

# Access the table
table = dynamodb.Table(settings.DYNAMODB_TABLE_NAME)

# Example: Add an item to DynamoDB
def add_item(user_id, seminar_id, attendance_status):
    response = table.put_item(
        Item={
            'UserID': user_id,
            'SeminarID': seminar_id,
            'AttendanceStatus': attendance_status,
        }
    )
    return response

# Example: Retrieve an item from DynamoDB
def get_item(user_id):
    response = table.get_item(Key={'UserID': user_id})
    return response.get('Item', None)
