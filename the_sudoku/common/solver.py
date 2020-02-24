import time
import copy
from random import shuffle, randint


# Raised when more than 1 solution is found
class MultipleResultsFound(Exception):
    pass


# Print out the puzzle to the console
def _print_console(_puzzle):
    for row_index, row in enumerate(_puzzle):
        if row_index == 0:
            print('\n- - - - - - - - - - - - -')
        print('| ', end='')

        for item_index, item in enumerate(row):
            if (item_index + 1) % 3 == 0:
                print(item, end=' | ')
            else:
                print(item, end=' ')

        if (row_index + 1) % 3 == 0:
            print('\n- - - - - - - - - - - - -')
        else:
            print()
    print()


# Generate a list of valid sudoku numbers
# Numbers can be shuffled to generate a new sudoku puzzle
def _get_number_list(is_shuffled=False):
    number_list = list(range(1, 10))
    if is_shuffled:
        shuffle(number_list)
    return number_list


# Find the next empty box in the puzzle
def _get_empty_box(_puzzle):
    for _y in range(len(_puzzle)):
        for _x in range(len(_puzzle[_y])):
            if _puzzle[_y][_x] == 0:
                return _x, _y
    return None


# Get the start or end index of a block given the index of a box
def _get_block_index(box_index, is_start):
    block_index = (box_index // 3) * 3
    return block_index if is_start else block_index + 3


# Check if an input number adheres to the sudoku rules
def _is_number_valid(_puzzle, x, y, number):
    # Check each item in the row
    for index, item in enumerate(_puzzle[y]):
        if item == number and index != x:
            return False

    # Check each item in the column
    for i in range(len(_puzzle)):
        if _puzzle[i][x] == number and i != y:
            return False

    # Check each item in the block
    for _y in range(_get_block_index(y, True), _get_block_index(y, False)):
        for _x in range(_get_block_index(x, True), _get_block_index(x, False)):
            if _puzzle[_y][_x] == number and (_x != x or _y != y):
                return False

    return True


# Remove a random non-empty box in the puzzle
# Skip boxes and retry if required
def _remove_random_box(_puzzle, skip_boxes=None):
    # Return None if all items in the list are 0
    if not any([j for i in _puzzle for j in i]):
        return None

    if skip_boxes is None:
        skip_boxes = []

    # Make a copy so as to not mutate the original puzzle
    puzzle_copy = copy.deepcopy(_puzzle)
    _y = randint(0, 8)
    _x = randint(0, 8)

    while puzzle_copy[_y][_x] == 0 or (_x, _y) in skip_boxes:
        _y = randint(0, 8)
        _x = randint(0, 8)

    puzzle_copy[_y][_x] = 0

    return puzzle_copy, _x, _y


# Solve a sudoku puzzle
# Populate a puzzle by passing in an empty puzzle and set shuffle_number to True
# Calculate the number of possible solutions by passing n_solution as a list
def solve_puzzle(_puzzle, shuffle_number=False, n_solution=None):
    number_list = _get_number_list(shuffle_number)
    positions = _get_empty_box(_puzzle)

    # Get the positions of the empty box
    if positions:
        _x, _y = positions
    # Puzzle is solved if no empty position is found
    else:
        # Add to a list since it's mutable
        if type(n_solution) == list:
            n_solution[0] += 1

            # Break out immediately by raising an exception
            if n_solution[0] > 1:
                raise MultipleResultsFound

            return False
        else:
            _print_console(_puzzle)
            return True

    # Test all the possible numbers
    for i in number_list:
        if _is_number_valid(_puzzle, _x, _y, i):
            # Assign number to box if it's valid
            _puzzle[_y][_x] = i

            # Find next empty box to fill
            if solve_puzzle(_puzzle, shuffle_number, n_solution):
                return True

            # Reset number if the next empty box returns False
            _puzzle[_y][_x] = 0

    return False


# Populate a puzzle with random numbers which adheres to the sudoku rules
def generate_answer_puzzle():
    _puzzle = [[0] * 9 for _ in range(9)]
    solve_puzzle(_puzzle, shuffle_number=True)
    return _puzzle


# Mask the boxes of a completed puzzle
def generate_masked_puzzle(_answer_puzzle):
    # Include only non-zero boxes
    boxes_left = len([j for i in _answer_puzzle for j in i if j])
    tested_boxes = []
    n_solution = [0]  # A counter list is used since it's mutable
    _puzzle = _answer_puzzle

    # Try to mask all the available boxes until there is only 1 unique solution
    while len(tested_boxes) != boxes_left:
        # Return a new puzzle with a random box value removed
        popped_puzzle, _x, _y = _remove_random_box(_puzzle, skip_boxes=tested_boxes)

        # Make a dummy puzzle to prevent the original puzzle from being mutated
        temp_puzzle = copy.deepcopy(popped_puzzle)

        try:
            # Shuffled numbers have a higher probability of being solved faster
            # Mutate the count in the list every time the puzzle is solved then raise an exception
            solve_puzzle(temp_puzzle, shuffle_number=True, n_solution=n_solution)

            # Run only if 1 solution is found
            _puzzle = popped_puzzle
            boxes_left -= 1
        # More than 1 solution is found
        except MultipleResultsFound:
            tested_boxes.append((_x, _y))  # Exclude this box from being popped
        finally:
            n_solution = [0]  # Reset count

    return _puzzle


if __name__ == '__main__':
    start_time = time.time()
    answer_puzzle = generate_answer_puzzle()
    print(f'Generated in {(time.time() - start_time):.2f} seconds')

    start_time = time.time()
    mask_puzzle = generate_masked_puzzle(answer_puzzle)
    _print_console(mask_puzzle)
    print(f'Masked in {(time.time() - start_time):.2f} seconds')

    start_time = time.time()
    solve_puzzle(mask_puzzle)
    print(f'Solved in {(time.time() - start_time):.2f} seconds')

