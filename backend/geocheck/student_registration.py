import boto3

# Initialize AWS clients
s3 = boto3.client('s3')
rekognition = boto3.client('rekognition', region_name='us-west-2')
dynamodb = boto3.client('dynamodb', region_name='us-west-2')

# DynamoDB table
dynamodbTableName = 'student'
employeeTable = dynamodb.Table(dynamodbTableName)

def lambda_handler(event, context):
    print(event)  # Debugging: Log the incoming event

    # Extract bucket and key information from the S3 event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    try:
        # Call the indexing function
        response = index_student_image(bucket, key)
        print(response)  # Debugging: Log the response from Rekognition

        # Check if Rekognition responded successfully
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            faceId = response['FaceRecords'][0]['Face']['FaceId']
            name = key.split('.')[0].split('_')  # Split filename for names
            firstName = name[0]
            lastName = name[1]
            register_student(faceId, firstName, lastName)
            # Log or process the extracted data (faceId, firstName, lastName)
        return response

    except Exception as e:
        print(e)
        print(f"Error processing employee image {key} from bucket {bucket}")
        raise e

def index_student_image(bucket, key):
    response = rekognition.index_faces(
        Image={
            'S3Object': {
                'Bucket': bucket,
                'Name': key
            }
        },
        CollectionId="students"  # This collection will be created later
    )
    return response

def register_student(faceId, firstName, lastName):
    employeeTable.put_item(
        Item={
            'rekognitionId': faceId,
            'firstName': firstName,
            'lastName': lastName
        }
    )
