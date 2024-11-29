import boto3

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
table = dynamodb.create_table(
    TableName='AttendanceRecords',
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
print("Table status:", table.table_status)