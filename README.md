Proyecto Full-Stack: Gestion de Actividades - Escuela de Nieve

Este proyecto es una aplicacion full-stack disenada para la gestion de actividades, instructores, estudiantes y usuarios en general en una escuela de nieve. Combina un backend  con un frontend.

Estructura del Proyecto

Backend
El backend implementa la logica de negocio y la conexion con la base de datos para la administracion de la escuela de nieve

Archivos principales
main.py archivo principal del backend
requirements.txt dependencias necesarias para ejecutar el backend
Dockerfile y docker-compose.yaml configuracion para la virtualizacion con Docker

Carpeta SQL
Creacion de Tablas.sql scripts para crear las tablas de la base de datos
Consultas a las tablas.sql ejemplos de consultas SQL
Inserts en tablas.sql datos iniciales para las tablas

Frontend
El frontend esta desarrollado con React.js para ofrecer una interfaz intuitiva y responsiva

Archivos principales
App.jsx componente principal de la aplicacion
main.jsx punto de entrada de la aplicacion
vite.config.js configuracion para el entorno de desarrollo con Vite
Componentes organizados en carpetas por funcionalidad
activityManagement gestion de actividades
instructorManagement gestion de instructores
studentManagement gestion de estudiantes
login gestion de autenticacion
register registro de usuarios

Instrucciones para ejecutar el backend

Este proyecto implementa el backend para la administracion de la escuela de nieve Aqui encontraras los pasos necesarios para configurarlo y ejecutarlo

Requisitos previos
Asegurate de tener instalado en tu maquina
Docker y Docker Compose
Python 39 o superior
Git para clonar el repositorio

Pasos para la configuracion

Clonar el repositorio
Abre tu terminal y clona el repositorio con el siguiente comando

git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>

Configurar el entorno de Docker
El proyecto ya incluye un archivo docker-composeyaml configurado para levantar una instancia de MySQL Asegurate de que Docker este corriendo y luego ejecuta

docker-compose up -d

Esto creara y levantara el contenedor de la base de datos

Crear la base de datos
Con el contenedor de MySQL corriendo crea la base de datos ejecutando el script de inicializacion Conectate al contenedor de la base de datos

docker exec -it escuela_nieve_db bash

Luego accede al cliente de MySQL dentro del contenedor

mysql -u root -p

Ingresa la contrasena configurada en el archivo docker-composeyaml Por defecto es root Luego ejecuta

CREATE DATABASE escuela_nieve;
USE escuela_nieve;
SOURCE /path/to/your/schema.sql;

Asegurate de incluir el archivo SQL para la estructura de la base de datos en el repositorio

Instalar dependencias de Python
Crea un entorno virtual opcional pero recomendado

python3 -m venv venv
source venv/bin/activate  En Windows venv\Scripts\activate

Instala las dependencias necesarias desde el archivo requirementstxt

pip install -r requirements.txt

Configurar variables de entorno
Crea un archivo env en la raiz del proyecto con las variables necesarias Por ejemplo

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=escuela_nieve
SECRET_KEY=tu_llave_secreta

Asegurate de que los valores coincidan con los configurados en docker-composeyaml y en tu base de datos

Iniciar el servidor
Ejecuta el servidor Flask

flask run

Por defecto el backend estara disponible en http1270015000

Troubleshooting
Error de conexion con la base de datos
Asegurate de que el contenedor de MySQL este corriendo
Verifica las credenciales y el host en el archivo env

Docker no levanta correctamente
Asegurate de que ningun otro contenedor este usando el mismo puerto
Usa docker ps para verificar que contenedores estan corriendo

Frontend

Instalacion
Instala las dependencias

npm install

Inicia el servidor de desarrollo

npm run dev

Uso
Accede al frontend en tu navegador en httplocalhost5173
Utiliza las diferentes funcionalidades para gestionar actividades instructores y estudiantes

Contribucion
Crea un fork del proyecto
Clona el repositorio

git clone httpsgithubcomtuusuariorepositoriogit

Crea una rama para tu funcionalidad

git checkout -b mi-funcionalidad

Haz un pull request
