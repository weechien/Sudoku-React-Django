from django.db import models
from django.contrib.postgres.fields import ArrayField

PUZZLE_CHOICES = list(zip(range(10), range(10)))


class Puzzle(models.Model):
    answer = ArrayField(ArrayField(models.IntegerField(choices=PUZZLE_CHOICES), size=9), size=9)
    masked = ArrayField(ArrayField(models.IntegerField(choices=PUZZLE_CHOICES), size=9), size=9)
    current = ArrayField(ArrayField(models.IntegerField(choices=PUZZLE_CHOICES), size=9), size=9)
