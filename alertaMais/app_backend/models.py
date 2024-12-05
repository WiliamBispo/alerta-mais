from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, unique=True,)
    email = models.CharField(max_length=254,unique=True, )
    senha = models.CharField(max_length=100)
    is_subscriber = models.BooleanField(default=False) 
    
class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Video(models.Model):
    
    course = models.ForeignKey(Course, related_name='videos', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    url = models.URLField()  
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

class Estado(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Municipio(models.Model):
    nome = models.CharField(max_length=100)
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nome}, {self.estado}"  

class Bairro(models.Model):
    nome = models.CharField(max_length=100)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nome}, {self.municipio}"

class RiskLocation(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    risk_level = models.CharField(max_length=10, choices=[('ALTO', 'Alto'), ('MÉDIO', 'Médio'), ('BAIXO', 'Baixo')])
    description = models.TextField()
    
    bairro = models.ForeignKey(Bairro, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name
    
class OcorrenciaChatBot(models.Model):
    name = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, unique=True,)
    estadoOcorrencia = models.CharField(max_length=244)
    cidadeOcorrencia = models.CharField(max_length=244)
    bairroOcorrencia = models.CharField(max_length=244)
    ocorrenciaDescricao = models.TextField()
    

class FormularioFeedback(models.Model):
    name = models.CharField(max_length=255)
    telefone = models.CharField(max_length=15)
    email = models.CharField(max_length=254,unique=True, )
    mensagem = models.TextField()