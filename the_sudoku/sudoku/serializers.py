from rest_framework.serializers import ModelSerializer
from sudoku.models import Puzzle


class PuzzleSerializer(ModelSerializer):
    class Meta:
        model = Puzzle
        fields = '__all__'
