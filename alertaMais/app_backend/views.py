from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
import json
from django.conf import settings
import os


def index(request):
    return render(request, 'index.html')

def ocorrencias(request):
    return render(request, 'ocorrencias.html')

def ferramentas(request):
    return render(request, 'ferramentas.html')

def contato(request):
    return render(request, 'contato.html')

def estatistica(request):
    return render(request, 'estatistica.html')

def suporte(request):
    return render(request, 'suporte.html')

def videos(request):
    return render(request, 'videos.html')

def cursos(request):
    return render(request, 'cursos.html')

def jogos(request):
    return render(request, 'jogos.html')

def quiz(request):
    return render(request, 'quiz.html')
