from django.urls import path
from . import views

urlpatterns = [
    path('mark/', views.mark_attendance, name='mark_attendance'),
    path('get/', views.get_attendance, name='get_attendance'),
]
