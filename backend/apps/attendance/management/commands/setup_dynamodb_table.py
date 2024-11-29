from django.core.management.base import BaseCommand
from scripts.dynamodb_helper import dynamodb

class Command(BaseCommand):
    help = 'Set up DynamoDB table'

    def handle(self, *args, **kwargs):
        table_name = 'AttendanceRecords'
        existing_tables = dynamodb.meta.client.list_tables()['TableNames']

        if table_name not in existing_tables:
            table = dynamodb.create_table(
                TableName=table_name,
                KeySchema=[
                    {'AttributeName': 'UserID', 'KeyType': 'HASH'}
                ],
                AttributeDefinitions=[
                    {'AttributeName': 'UserID', 'AttributeType': 'S'}
                ],
                ProvisionedThroughput={
                    'ReadCapacityUnits': 5,
                    'WriteCapacityUnits': 5
                }
            )
            self.stdout.write(f"Table {table_name} created.")
        else:
            self.stdout.write(f"Table {table_name} already exists.")
