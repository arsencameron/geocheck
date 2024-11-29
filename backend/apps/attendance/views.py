from django.http import JsonResponse
from utils.dynamodb_helper import add_item, get_item

def mark_attendance(request):
    user_id = request.GET.get('user_id')
    seminar_id = request.GET.get('seminar_id')
    attendance_status = 'Present'

    # Add item to DynamoDB
    response = add_item(user_id, seminar_id, attendance_status)
    return JsonResponse({'message': 'Attendance marked', 'response': response})

def get_attendance(request):
    user_id = request.GET.get('user_id')

    # Get item from DynamoDB
    attendance = get_item(user_id)
    if attendance:
        return JsonResponse(attendance)
    return JsonResponse({'message': 'No attendance record found'}, status=404)

# Create your views here.
