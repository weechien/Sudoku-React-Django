# Sudoku-React-Django 🧩

Play over 500 well designed sudoku puzzles:

http://sudoku-react-django.herokuapp.com/

## Project Description
Sudoku is a logic-filled puzzle game with the objective of filling a 9x9 grid with digits from 1 to 9. Each row, column and 3x3 boxes can contain each number exactly once. As a logic puzzle, sudoku is an excellent brain game.

## Features
* A well crafted puzzle interface and controls made possible with Tailwind CSS.
* Automatically checking and flagging of input errors which do not conform to the sudoku rules.
* Automatic highlighting of cells related to the currently selected cell.
* Highlighting of similar numbers to the currently selected cell.
* Beautiful animation on completion of a row, column, box and the game.
* A timer with play and pause to record your speed in completing the game.
* A responsive interface which looks fluid in both PC and mobile.
* A number input pad.
* An undo and redo function.
* An erase function.
* A note taking function to mark cells with possible numbers.
* A hint function to reveal the correct answer for a cell if the games get too difficult.
* A function to restart the game or start a new game.
* Scripts to solve and generate sudoku puzzles.
* Over 500 puzzles to solve made possible with a sudoku generator.
  * The sudoku generator works by first randomly generating numbers across the board following the sudoku rules.
  * While in a continuous loop, a random cell is emptied.
  * The backtracking algorithm is then used to solve the puzzle.
  * If there is only 1 solution to the puzzle, a next random cell will be emptied.
  * If there is more than 1 solution, a new random cell will be chosen instead and the current cell will be filled back.
  * The loop will continue until no more cells could be emptied and there is only 1 solution to the puzzle.

## Built With

* [React](https://reactjs.org/) - Frontend framework used
* [Django](https://www.djangoproject.com/) - Backend framework used
* [Django REST Framework](https://www.django-rest-framework.org/) - Web API for puzzle requests and serializations
* [PostgreSQL](https://www.postgresql.org/) - Database for storing puzzle arrays
* [Gunicorn](https://gunicorn.org/) - Python WSGI HTTP server
* [Tailwind CSS](https://tailwindcss.com/) - CSS framework used
* [Webpack](https://webpack.js.org/) - Module bundler used
* [Babel](https://babeljs.io/) - JavaScript transcompiler for backwards compatibility
* [PostCSS](https://postcss.org/) - Transform CSS files by adding vendor prefixes and minification
* [React Toastify](https://github.com/fkhadra/react-toastify) - React notification

## Acknowledgments

* Authors of the libraries used in this app
* Heroku as a platform for serving site
