from sudoku.models import Puzzle
from .solver import generate_answer_puzzle, generate_masked_puzzle


def create_new_puzzle():
    answer_puzzle = generate_answer_puzzle()
    masked_puzzle = generate_masked_puzzle(answer_puzzle)

    queryset = Puzzle.objects.filter(answer=answer_puzzle)

    # Make sure there are no duplicate puzzles
    if not queryset:
        puzzle = Puzzle(answer=answer_puzzle, masked=masked_puzzle, current=masked_puzzle)
        puzzle.save()
