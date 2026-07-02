from django.shortcuts import render, get_object_or_404, redirect
from .models import MovieReview

def review_list(request):
    reviews = MovieReview.objects.all().order_by('-created_at')
    return render(request, 'movie/review_list.html', {'reviews': reviews})

def review_detail(request, pk):
    review = get_object_or_404(MovieReview, pk=pk)
    return render(request, 'movie/review_detail.html', {'review': review})

def review_new(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        year = request.POST.get('year')
        director = request.POST.get('director')
        cast = request.POST.get('cast')
        genre = request.POST.get('genre')
        rating = request.POST.get('rating')
        running_time = request.POST.get('running_time')
        content = request.POST.get('content')

        MovieReview.objects.create(
            title=title,
            year=year,
            director=director,
            cast=cast, 
            genre=genre, 
            rating=rating, 
            running_time=running_time, 
            content=content,
        )
        return redirect('review_list')
    return render(request, 'movie/review_form.html')

def review_edit(request, pk):
    review = get_object_or_404(MovieReview, pk=pk)
    if request.method == "POST" :
        review.title = request.POST.get('title')
        review.year = request.POST.get('year')
        review.director = request.POST.get('director')
        review.cast = request.POST.get('cast')
        review.genre = request.POST.get('genre')
        review.rating = request.POST.get('rating')
        review.running_time = request.POST.get('running_time')
        review.content = request.POST.get('content')
        review.save()
        return redirect('review_detail', pk=pk)
    return render(request, 'movie/review_form.html', {'review': review})

def review_delete(request, pk):
    review = get_object_or_404(MovieReview, pk=pk)
    if request.method == 'POST':
        review.delete()
        return redirect('review_list')
    return render(request, 'movie/review_delete.html', {'review': review})


        
