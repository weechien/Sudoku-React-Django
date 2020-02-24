from django.views import View
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

from random import randint

from sudoku.models import Puzzle
from sudoku.serializers import PuzzleSerializer


# Home page
class Index(TemplateView):
    template_name = 'sudoku/index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


# Fetch a new game on request
class FetchGame(View):
    def post(self, request):
        puzzle_all = Puzzle.objects.all()
        puzzle_len = puzzle_all.count()
        rand_num = randint(1, puzzle_len)
        puzzle = Puzzle.objects.filter(pk=rand_num).first()
        serializer = PuzzleSerializer(puzzle)
        return JsonResponse(serializer.data)
