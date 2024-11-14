# Usa una imagen base de Python
FROM python:3.9

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo requirements.txt y lo instala
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia todos los archivos de la aplicación
COPY . .

# Expone el puerto donde correrá Flask
EXPOSE 5000

# Define el comando para correr la aplicación
CMD ["flask", "run", "--host=0.0.0.0"]
