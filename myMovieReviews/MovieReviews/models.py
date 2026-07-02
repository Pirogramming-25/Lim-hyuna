from django.db import models

class MovieReview(models.Model):
    title = models.CharField(max_length=200)
    year = models.IntegerField()
    director = models.CharField(max_length=100)
    cast = models.CharField(max_length=200)
    genre = models.CharField(max_length=50)
    rating = models.IntegerField()
    running_time = models.IntegerField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title