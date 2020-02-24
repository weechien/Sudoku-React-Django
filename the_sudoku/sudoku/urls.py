from django.urls import path
from .views import Index, FetchGame

urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('fetch-game/', FetchGame.as_view(), name='fetch-game')
]
